import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import pLimit from 'p-limit';

// Configuration
const BASE_URL = 'https://www.iplpf.org';
const CONTENT_DIR = path.join(process.cwd(), 'content/lplpf');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const CONCURRENCY = 3;

// Types
interface PageData {
  sourceUrl: string;
  path: string;
  slug: string;
  title: string;
  html: string;
  updatedAt: string;
}

interface PagesIndex {
  pages: { slug: string; title: string; path: string }[];
  lastSync: string;
}

// State
const visitedUrls = new Set<string>();
const urlQueue: string[] = [];
const pages: PageData[] = [];
const failedUrls: string[] = [];

// Utility functions
function normalizeUrl(url: string, baseUrl?: string): string | null {
  try {
    const parsed = new URL(url, baseUrl || BASE_URL);
    // Normalize domain
    if (parsed.hostname === 'iplpf.org') {
      parsed.hostname = 'www.iplpf.org';
    }
    // Only process iplpf.org URLs
    if (parsed.hostname !== 'www.iplpf.org') {
      return null;
    }
    // Remove hash for deduplication (keep query params for pagination)
    parsed.hash = '';
    // Ensure trailing slash for paths (except files)
    if (!parsed.pathname.endsWith('/') && !parsed.pathname.match(/\.\w+$/)) {
      parsed.pathname += '/';
    }
    return parsed.href;
  } catch {
    return null;
  }
}

function urlToSlug(url: string): string {
  const parsed = new URL(url);
  let pathname = parsed.pathname;
  // Remove leading/trailing slashes
  pathname = pathname.replace(/^\/+|\/+$/g, '');
  // Handle root
  if (!pathname) return 'index';
  // Replace slashes with double underscores for nested paths
  let slug = pathname.replace(/\//g, '__');
  // Add page number if present in query
  const pageMatch = parsed.search.match(/[?&]page=(\d+)/);
  if (pageMatch) {
    slug += `__page-${pageMatch[1]}`;
  }
  return slug;
}

function shouldSkipUrl(url: string): boolean {
  const skipPatterns = [
    /\/wp-admin\//,
    /\/wp-login/,
    /\/wp-json\//,
    /\/feed\//,
    /\?s=/,            // search results
    /\/attachment\//,
    /\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/i,
  ];
  return skipPatterns.some((pattern) => pattern.test(url));
}

// Check if URL should be crawled (for News pagination, categories, archives)
function shouldCrawlUrl(url: string): boolean {
  // Allow pagination pages
  if (url.includes('/page/') || url.includes('?page=')) return true;
  // Allow category pages
  if (url.includes('/category/')) return true;
  // Allow archive pages (year/month)
  if (url.match(/\/\d{4}\/\d{2}\//)) return true;
  // Allow tag pages
  if (url.includes('/tag/')) return true;
  // Default: allow if not skipped
  return !shouldSkipUrl(url);
}

async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.log(`  Retry ${i + 1}/${retries} for ${url}: ${error}`);
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      }
    }
  }
  return null;
}

function extractContent($: cheerio.CheerioAPI): {
  title: string;
  html: string;
} {
  // Get title
  let title = $('title').text().trim();
  if (!title) {
    title = $('h1').first().text().trim() || 'Untitled';
  }
  // Clean title - remove site name suffix
  title = title.replace(/\s*[-|–]\s*IPLPF.*$/i, '').trim();

  // Try to find main content area
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let $content: cheerio.Cheerio<any> | null = null;

  // Priority selectors for content
  const contentSelectors = [
    'main article',
    'article.post',
    '.entry-content',
    '.post-content',
    'main .content',
    'main',
    '#content',
    '.content-area',
    'article',
    '.site-content',
  ];

  for (const selector of contentSelectors) {
    const $el = $(selector);
    if ($el.length > 0 && $el.text().trim().length > 50) {
      $content = $el.first();
      break;
    }
  }

  // Fallback: use body and remove known non-content elements
  if (!$content) {
    $content = $('body').clone();
    $content
      .find(
        'header, footer, nav, .header, .footer, .nav, .sidebar, .menu, script, style, noscript, .widget-area'
      )
      .remove();
  }

  // Clean up the content
  if ($content) {
    // Remove scripts, styles, comments
    $content.find('script, style, noscript').remove();
    // Keep iframes (might be videos)
  }

  const html = $content ? $content.html() || '' : '';
  return { title, html };
}

function processHtml(
  html: string,
  pageUrl: string
): { title: string; html: string; discoveredUrls: string[] } {
  const $ = cheerio.load(html);
  const discoveredUrls: string[] = [];

  // Collect internal links for crawling
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      const normalized = normalizeUrl(href, pageUrl);
      if (normalized && shouldCrawlUrl(normalized)) {
        if (!visitedUrls.has(normalized) && !discoveredUrls.includes(normalized)) {
          discoveredUrls.push(normalized);
        }
      }
    }
  });

  // Extract content first
  const { title, html: contentHtml } = extractContent($);

  // Now process the extracted HTML to transform links and images
  const $content = cheerio.load(contentHtml);

  // Transform internal links to /lplpf/ paths
  $content('a[href]').each((_, el) => {
    const href = $content(el).attr('href');
    if (href) {
      try {
        const parsed = new URL(href, pageUrl);
        // Only transform iplpf.org links
        if (
          parsed.hostname === 'www.iplpf.org' ||
          parsed.hostname === 'iplpf.org'
        ) {
          // Skip file downloads (PDF, etc) - keep original URL
          if (parsed.pathname.match(/\.(pdf|doc|docx|xls|xlsx)$/i)) {
            $content(el).attr('href', parsed.href);
          } else {
            const newHref = '/lplpf' + parsed.pathname;
            $content(el).attr('href', newHref);
          }
        }
      } catch {
        // Keep original href if parsing fails
      }
    }
  });

  // Process images - convert relative to absolute URLs (NO DOWNLOAD)
  $content('img[src]').each((_, img) => {
    const src = $content(img).attr('src');
    if (src) {
      try {
        // Convert to absolute URL
        const absoluteUrl = new URL(src, pageUrl).href;
        $content(img).attr('src', absoluteUrl);
      } catch {
        // Keep original src if parsing fails
      }
    }
    // Also handle srcset
    const srcset = $content(img).attr('srcset');
    if (srcset) {
      const newSrcset = srcset
        .split(',')
        .map((part) => {
          const [url, descriptor] = part.trim().split(/\s+/);
          try {
            const absoluteUrl = new URL(url, pageUrl).href;
            return descriptor ? `${absoluteUrl} ${descriptor}` : absoluteUrl;
          } catch {
            return part;
          }
        })
        .join(', ');
      $content(img).attr('srcset', newSrcset);
    }
  });

  // Process background images in style attributes
  $content('[style*="background"]').each((_, el) => {
    const style = $content(el).attr('style');
    if (style) {
      const newStyle = style.replace(
        /url\(['"]?([^'")\s]+)['"]?\)/g,
        (match, url) => {
          try {
            const absoluteUrl = new URL(url, pageUrl).href;
            return `url('${absoluteUrl}')`;
          } catch {
            return match;
          }
        }
      );
      $content(el).attr('style', newStyle);
    }
  });

  return { title, html: $content.html() || '', discoveredUrls };
}

async function crawlPage(url: string): Promise<PageData | null> {
  console.log(`Fetching: ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) {
    console.log(`  Failed to fetch: ${url}`);
    failedUrls.push(url);
    return null;
  }

  const { title, html: processedHtml, discoveredUrls } = processHtml(html, url);

  // Add discovered URLs to queue
  for (const discovered of discoveredUrls) {
    if (!visitedUrls.has(discovered) && !urlQueue.includes(discovered)) {
      urlQueue.push(discovered);
    }
  }

  const parsed = new URL(url);

  return {
    sourceUrl: url,
    path: parsed.pathname + parsed.search,
    slug: urlToSlug(url),
    title,
    html: processedHtml,
    updatedAt: new Date().toISOString(),
  };
}

async function collectUrlsFromSitemap(): Promise<void> {
  console.log('Fetching sitemap page...');
  const sitemapUrl = `${BASE_URL}/site-map/`;
  const html = await fetchWithRetry(sitemapUrl);

  if (html) {
    const $ = cheerio.load(html);
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const normalized = normalizeUrl(href);
        if (normalized && shouldCrawlUrl(normalized)) {
          if (!urlQueue.includes(normalized)) {
            urlQueue.push(normalized);
          }
        }
      }
    });
  }

  // Also add known important pages
  const knownPages = [
    '/',
    '/about-us/',
    '/what-we-do/',
    '/projects/',
    '/publication/',
    '/news/',
    '/blog-list/',
    '/contact/',
    '/supporter/',
    '/one-time-donation/',
    '/monthly-donation/',
    '/privacy-policy/',
    '/site-map/',
  ];

  for (const page of knownPages) {
    const url = `${BASE_URL}${page}`;
    if (!urlQueue.includes(url)) {
      urlQueue.push(url);
    }
  }

  console.log(`Collected ${urlQueue.length} URLs from sitemap`);
}

async function collectUrlsFromBlogList(): Promise<void> {
  console.log('Fetching blog list and pagination...');

  // Fetch main blog list and multiple pagination pages
  const blogPages = [
    `${BASE_URL}/blog-list/`,
    `${BASE_URL}/blog-list/page/2/`,
    `${BASE_URL}/blog-list/page/3/`,
    `${BASE_URL}/blog-list/page/4/`,
    `${BASE_URL}/blog-list/page/5/`,
  ];

  for (const blogUrl of blogPages) {
    const html = await fetchWithRetry(blogUrl);
    if (html) {
      const $ = cheerio.load(html);
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
          const normalized = normalizeUrl(href);
          if (
            normalized &&
            shouldCrawlUrl(normalized) &&
            !urlQueue.includes(normalized)
          ) {
            urlQueue.push(normalized);
          }
        }
      });
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`Total URLs after blog list: ${urlQueue.length}`);
}

async function collectUrlsFromCategories(): Promise<void> {
  console.log('Fetching category pages...');

  // Common WordPress category slugs
  const categoryPaths = [
    '/category/news/',
    '/category/event/',
    '/category/report/',
    '/category/uncategorized/',
  ];

  for (const catPath of categoryPaths) {
    const catUrl = `${BASE_URL}${catPath}`;
    const html = await fetchWithRetry(catUrl);
    if (html) {
      const $ = cheerio.load(html);
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) {
          const normalized = normalizeUrl(href);
          if (
            normalized &&
            shouldCrawlUrl(normalized) &&
            !urlQueue.includes(normalized)
          ) {
            urlQueue.push(normalized);
          }
        }
      });
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`Total URLs after categories: ${urlQueue.length}`);
}

function savePageData(page: PageData): void {
  const filePath = path.join(PAGES_DIR, `${page.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(page, null, 2));
}

function savePagesIndex(): void {
  const index: PagesIndex = {
    pages: pages.map((p) => ({
      slug: p.slug,
      title: p.title,
      path: p.path,
    })),
    lastSync: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(CONTENT_DIR, 'pages.json'),
    JSON.stringify(index, null, 2)
  );
}

async function main(): Promise<void> {
  console.log('='.repeat(50));
  console.log('IPLPF Content Sync (No Image Download)');
  console.log('='.repeat(50));

  // Ensure directories exist
  fs.mkdirSync(PAGES_DIR, { recursive: true });

  // Collect URLs from various sources
  await collectUrlsFromSitemap();
  await collectUrlsFromBlogList();
  await collectUrlsFromCategories();

  // Deduplicate
  const uniqueUrls = [...new Set(urlQueue)];
  console.log(`\nStarting crawl of ${uniqueUrls.length} unique URLs...\n`);

  // Create rate limiter
  const limit = pLimit(CONCURRENCY);

  // Process initial URLs
  let processed = 0;
  const tasks = uniqueUrls.map((url) =>
    limit(async () => {
      if (visitedUrls.has(url)) return;
      visitedUrls.add(url);

      const pageData = await crawlPage(url);
      if (pageData && pageData.html.trim().length > 0) {
        pages.push(pageData);
        savePageData(pageData);
      }

      processed++;
      if (processed % 10 === 0) {
        console.log(`\nProgress: ${processed}/${uniqueUrls.length} pages\n`);
      }

      // Small delay between requests
      await new Promise((r) => setTimeout(r, 500));
    })
  );

  await Promise.all(tasks);

  // Process any newly discovered URLs (from crawled pages)
  let additionalProcessed = 0;
  while (urlQueue.length > 0 && additionalProcessed < 200) {
    const url = urlQueue.shift()!;
    if (visitedUrls.has(url)) continue;
    visitedUrls.add(url);

    const pageData = await crawlPage(url);
    if (pageData && pageData.html.trim().length > 0) {
      pages.push(pageData);
      savePageData(pageData);
    }

    additionalProcessed++;
    await new Promise((r) => setTimeout(r, 500));
  }

  // Save index
  savePagesIndex();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Sync Complete!');
  console.log('='.repeat(50));
  console.log(`Pages crawled: ${pages.length}`);
  console.log(`Failed URLs: ${failedUrls.length}`);
  if (failedUrls.length > 0) {
    console.log('Failed URLs:');
    failedUrls.slice(0, 20).forEach((url) => console.log(`  - ${url}`));
    if (failedUrls.length > 20) {
      console.log(`  ... and ${failedUrls.length - 20} more`);
    }
  }
  console.log(`\nPages saved to: ${PAGES_DIR}`);
  console.log(`Index saved to: ${CONTENT_DIR}/pages.json`);
}

main().catch(console.error);
