import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import pLimit from 'p-limit';

// Configuration
const BASE_URL = 'https://www.iplpf.org';
const CONTENT_DIR = path.join(process.cwd(), 'content/lplpf');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const ASSETS_DIR = path.join(process.cwd(), 'public/assets/lplpf');
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
const assetCache = new Map<string, string>(); // original URL -> local path
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
    // Remove query params and hash for deduplication
    parsed.search = '';
    parsed.hash = '';
    // Ensure trailing slash for paths
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
  // Replace slashes with dashes for nested paths
  return pathname.replace(/\//g, '__');
}

function shouldSkipUrl(url: string): boolean {
  const skipPatterns = [
    /\/wp-admin\//,
    /\/wp-login/,
    /\/wp-json\//,
    /\/feed\//,
    /\?s=/,
    /\?p=/,
    /\/tag\//,
    /\/category\//,
    /\/author\//,
    /\/page\/\d+/,
    /\/attachment\//,
    /\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/i,
  ];
  return skipPatterns.some((pattern) => pattern.test(url));
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
            'Mozilla/5.0 (compatible; IPLPFSync/1.0; +https://iplpf.vercel.app)',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
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

async function downloadAsset(url: string): Promise<string | null> {
  // Check cache
  if (assetCache.has(url)) {
    return assetCache.get(url)!;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; IPLPFSync/1.0; +https://iplpf.vercel.app)',
      },
    });

    if (!response.ok) {
      console.log(`  Failed to download asset: ${url} (${response.status})`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const ext = path.extname(new URL(url).pathname) || '.bin';
    const hash = crypto
      .createHash('md5')
      .update(url)
      .digest('hex')
      .slice(0, 8);
    const filename = `${hash}${ext}`;
    const localPath = path.join(ASSETS_DIR, filename);

    fs.writeFileSync(localPath, Buffer.from(buffer));
    const webPath = `/assets/lplpf/${filename}`;
    assetCache.set(url, webPath);
    console.log(`  Downloaded: ${filename}`);
    return webPath;
  } catch (error) {
    console.log(`  Error downloading ${url}: ${error}`);
    return null;
  }
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
  ];

  for (const selector of contentSelectors) {
    const $el = $(selector);
    if ($el.length > 0 && $el.text().trim().length > 100) {
      $content = $el.first();
      break;
    }
  }

  // Fallback: use body and remove known non-content elements
  if (!$content) {
    $content = $('body').clone();
    $content
      .find(
        'header, footer, nav, .header, .footer, .nav, .sidebar, .menu, script, style, noscript'
      )
      .remove();
  }

  // Clean up the content
  if ($content) {
    // Remove scripts, styles, comments
    $content.find('script, style, noscript, iframe').remove();
    // Remove empty elements
    $content
      .find('p, div, span')
      .filter(function () {
        return $(this).text().trim() === '' && $(this).find('img').length === 0;
      })
      .remove();
  }

  const html = $content ? $content.html() || '' : '';
  return { title, html };
}

async function processHtml(
  html: string,
  pageUrl: string
): Promise<{ title: string; html: string }> {
  const $ = cheerio.load(html);

  // Collect internal links for crawling
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      const normalized = normalizeUrl(href, pageUrl);
      if (
        normalized &&
        !visitedUrls.has(normalized) &&
        !shouldSkipUrl(normalized)
      ) {
        if (!urlQueue.includes(normalized)) {
          urlQueue.push(normalized);
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
      const normalized = normalizeUrl(href, pageUrl);
      if (normalized) {
        const parsed = new URL(normalized);
        const newHref = '/lplpf' + parsed.pathname;
        $content(el).attr('href', newHref);
      }
    }
  });

  // Process images - download and update src
  const images = $content('img[src]').toArray();
  for (const img of images) {
    const src = $content(img).attr('src');
    if (src) {
      let fullUrl: string;
      try {
        fullUrl = new URL(src, pageUrl).href;
      } catch {
        continue;
      }

      // Only download images from iplpf.org
      if (fullUrl.includes('iplpf.org')) {
        const localPath = await downloadAsset(fullUrl);
        if (localPath) {
          $content(img).attr('src', localPath);
        }
      }
    }
  }

  return { title, html: $content.html() || '' };
}

async function crawlPage(url: string): Promise<PageData | null> {
  console.log(`Fetching: ${url}`);
  const html = await fetchWithRetry(url);
  if (!html) {
    console.log(`  Failed to fetch: ${url}`);
    failedUrls.push(url);
    return null;
  }

  const { title, html: processedHtml } = await processHtml(html, url);
  const parsed = new URL(url);

  return {
    sourceUrl: url,
    path: parsed.pathname,
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
        if (normalized && !shouldSkipUrl(normalized)) {
          urlQueue.push(normalized);
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
  console.log('Fetching blog list...');
  const blogUrl = `${BASE_URL}/blog-list/`;
  const html = await fetchWithRetry(blogUrl);

  if (html) {
    const $ = cheerio.load(html);
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const normalized = normalizeUrl(href);
        if (
          normalized &&
          !shouldSkipUrl(normalized) &&
          !urlQueue.includes(normalized)
        ) {
          urlQueue.push(normalized);
        }
      }
    });
  }

  console.log(`Total URLs after blog list: ${urlQueue.length}`);
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
  fs.writeFileSync(path.join(CONTENT_DIR, 'pages.json'), JSON.stringify(index, null, 2));
}

async function main(): Promise<void> {
  console.log('='.repeat(50));
  console.log('IPLPF Content Sync');
  console.log('='.repeat(50));

  // Ensure directories exist
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  // Collect URLs
  await collectUrlsFromSitemap();
  await collectUrlsFromBlogList();

  // Deduplicate
  const uniqueUrls = [...new Set(urlQueue)];
  console.log(`\nStarting crawl of ${uniqueUrls.length} unique URLs...\n`);

  // Create rate limiter
  const limit = pLimit(CONCURRENCY);

  // Process URLs
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

  // Process any newly discovered URLs
  while (urlQueue.length > 0) {
    const url = urlQueue.shift()!;
    if (visitedUrls.has(url)) continue;
    visitedUrls.add(url);

    const pageData = await crawlPage(url);
    if (pageData && pageData.html.trim().length > 0) {
      pages.push(pageData);
      savePageData(pageData);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  // Save index
  savePagesIndex();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Sync Complete!');
  console.log('='.repeat(50));
  console.log(`Pages crawled: ${pages.length}`);
  console.log(`Assets downloaded: ${assetCache.size}`);
  console.log(`Failed URLs: ${failedUrls.length}`);
  if (failedUrls.length > 0) {
    console.log('Failed URLs:');
    failedUrls.forEach((url) => console.log(`  - ${url}`));
  }
}

main().catch(console.error);
