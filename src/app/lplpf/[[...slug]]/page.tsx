import { notFound } from 'next/navigation';
import * as fs from 'fs';
import * as path from 'path';
import Link from 'next/link';

// Types
interface PageData {
  sourceUrl: string;
  path: string;
  slug: string;
  title: string;
  html: string;
  updatedAt: string;
}

// Get content directory path
const CONTENT_DIR = path.join(process.cwd(), 'content/lplpf');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');

// Sample content for when JSON files don't exist yet
const SAMPLE_CONTENT: Record<string, PageData> = {
  index: {
    sourceUrl: 'https://www.iplpf.org/',
    path: '/',
    slug: 'index',
    title: 'IPLPF - 国際ピース・ラビング・ピープル財団',
    html: `
      <div class="space-y-12">
        <section class="text-center py-12">
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            平和を愛する人を<span class="text-orange-600">増やす</span>
          </h1>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            国際ピース・ラビング・ピープル財団（IPLPF）は、教育、研究、国際協力を通じて
            平和の推進と持続可能な開発に取り組む国際NGOです。
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/lplpf/about-us/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              詳しく見る
            </a>
            <a href="/donate" class="inline-block bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 rounded-xl px-6 py-3 font-semibold transition-colors">
              寄付で応援する
            </a>
          </div>
        </section>

        <section class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">平和教育</h3>
            <p class="text-slate-600">世界中で平和教育プログラムを開発・普及し、理解と調和を育みます。</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">国連活動支援</h3>
            <p class="text-slate-600">国連機関と連携し、国際的な平和構築活動と持続可能な開発目標（SDGs）の推進を支援しています。</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">調査研究・提言</h3>
            <p class="text-slate-600">平和構築に関する調査研究を行い、政府や国際機関に政策提言を行っています。</p>
          </div>
        </section>

        <section class="bg-orange-50 rounded-3xl p-8 md:p-12">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">私たちの実績</h2>
            <p class="text-slate-600 mb-8">
              30年以上にわたり、教育、研究、国際協力を通じて
              より平和な世界の構築に取り組んできました。
            </p>
            <div class="grid grid-cols-3 gap-8">
              <div>
                <p class="text-3xl font-bold text-orange-600">30年+</p>
                <p class="text-sm text-slate-600">活動実績</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-orange-600">5カ国</p>
                <p class="text-sm text-slate-600">支援地域</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-orange-600">10,000+</p>
                <p class="text-sm text-slate-600">支援者数</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'about-us': {
    sourceUrl: 'https://www.iplpf.org/about-us/',
    path: '/about-us/',
    slug: 'about-us',
    title: '私たちについて - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">IPLPFについて</h1>
          <p class="text-lg text-slate-600 leading-relaxed mb-6">
            国際ピース・ラビング・ピープル財団（IPLPF）は、平和の推進、国際協力、
            持続可能な開発に取り組む国際非政府組織（NGO）です。
            1988年にニューヨークで設立され、30年以上にわたり、
            より平和で調和のとれた世界の構築に取り組んできました。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">私たちのミッション</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            私たちのミッションは、教育、研究、国際協力を通じて、
            世界中で平和を愛する人を増やすことです。
            あらゆる背景を持つ人々が、理解と調和への共通のコミットメントを持って
            集まることでのみ、持続的な平和が実現できると信じています。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">沿革</h2>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">1988年</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">米国ニューヨークで設立</h3>
                <p class="text-slate-600">IPLPFは国際平和団体として設立されました。</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">1996年</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">国連ECOSOC総合諮問資格を取得</h3>
                <p class="text-slate-600">国連経済社会理事会の総合諮問資格を取得しました。</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="w-24 flex-shrink-0">
                <span class="text-orange-600 font-semibold">2020年</span>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">日本国内で法人格を取得</h3>
                <p class="text-slate-600">アジアでの活動を拡大するため、日本で法人を設立しました。</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">私たちの価値観</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">平和</h3>
              <p class="text-slate-600">紛争の平和的解決を推進し、平和の文化を構築します。</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">教育</h3>
              <p class="text-slate-600">知識と理解を通じて人々をエンパワーメントします。</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">協力</h3>
              <p class="text-slate-600">協働を通じて国家や文化間の架け橋を築きます。</p>
            </div>
            <div class="bg-white rounded-xl p-6 ring-1 ring-slate-200">
              <h3 class="font-semibold text-orange-600 mb-2">持続可能性</h3>
              <p class="text-slate-600">将来の世代のための持続可能な開発に取り組みます。</p>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'what-we-do': {
    sourceUrl: 'https://www.iplpf.org/what-we-do/',
    path: '/what-we-do/',
    slug: 'what-we-do',
    title: '活動内容 - IPLPF',
    html: `
      <div class="space-y-12">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">活動内容</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            IPLPFは、世界中で平和と持続可能な開発を推進するため、
            4つの主要分野で活動しています。
            平和を愛する人を増やし、より調和のとれた世界を築くという
            コミットメントに基づいて活動を行っています。
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🕊️</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">平和推進</h2>
            <p class="text-slate-600 leading-relaxed">
              平和教育プログラムの開発・実施、平和セミナーやワークショップの開催、
              異なるコミュニティや国家間の対話を促進しています。
              平和と非暴力の文化を育むことが私たちの目標です。
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🌍</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">国連活動支援</h2>
            <p class="text-slate-600 leading-relaxed">
              国連ECOSOCの総合諮問資格を持つNGOとして、
              国連会議に積極的に参加し、国際的な平和構築活動を支援しています。
              持続可能な開発目標（SDGs）の推進に取り組んでいます。
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">📊</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">調査研究・提言</h2>
            <p class="text-slate-600 leading-relaxed">
              平和構築、紛争解決、持続可能な開発に関する調査研究を実施しています。
              その結果に基づき、政府、国際機関、市民社会に
              政策提言を行っています。
            </p>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <span class="text-2xl">🤝</span>
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">支援活動</h2>
            <p class="text-slate-600 leading-relaxed">
              発展途上国で教育支援、給食プログラム、奨学金制度を実施しています。
              コミュニティのレジリエンス構築と持続可能な開発を
              支援しています。
            </p>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'projects': {
    sourceUrl: 'https://www.iplpf.org/projects/',
    path: '/projects/',
    slug: 'projects',
    title: 'プロジェクト - IPLPF',
    html: `
      <div class="space-y-12">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">プロジェクト</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            アジアを中心に複数の国で、教育、人道支援、
            コミュニティ開発に焦点を当てたプロジェクトを実施しています。
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-slate-900 mb-6">地域別活動</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇰🇭</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">カンボジア</h3>
                <p class="text-slate-600 text-sm">
                  農村部の子どもたちや家族を支援する給食プログラム、
                  教育支援、コミュニティ開発事業を実施しています。
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇵🇭</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">フィリピン</h3>
                <p class="text-slate-600 text-sm">
                  恵まれない子どもたちが質の高い教育を受けられるよう、
                  教育奨学金や支援プログラムを実施しています。
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
              <div class="aspect-video bg-orange-100 flex items-center justify-center">
                <span class="text-4xl">🇲🇲</span>
              </div>
              <div class="p-6">
                <h3 class="text-lg font-bold text-slate-900 mb-2">ミャンマー</h3>
                <p class="text-slate-600 text-sm">
                  紛争や経済的困難の影響を受けたコミュニティへの
                  人道支援と教育支援を行っています。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'blog-list': {
    sourceUrl: 'https://www.iplpf.org/blog-list/',
    path: '/blog-list/',
    slug: 'blog-list',
    title: 'お知らせ - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">お知らせ</h1>
          <p class="text-lg text-slate-600">
            最新の活動報告、イベント情報、お知らせをご覧ください。
          </p>
        </section>

        <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">2026年1月</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                年次平和会議2026
              </h3>
              <p class="text-slate-600 text-sm">
                平和構築と持続可能な開発をテーマにした年次会議を開催します。
              </p>
            </div>
          </article>

          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">2025年12月</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                カンボジア学校支援報告
              </h3>
              <p class="text-slate-600 text-sm">
                カンボジアでの給食プログラムと教育支援活動の報告です。
              </p>
            </div>
          </article>

          <article class="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200">
            <div class="aspect-video bg-slate-100"></div>
            <div class="p-6">
              <time class="text-sm text-orange-600">2025年11月</time>
              <h3 class="text-lg font-semibold text-slate-900 mt-2 mb-2">
                国連パートナーシップ発表
              </h3>
              <p class="text-slate-600 text-sm">
                平和教育プログラム拡大のための国連機関との新たな連携を発表します。
              </p>
            </div>
          </article>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'contact': {
    sourceUrl: 'https://www.iplpf.org/contact/',
    path: '/contact/',
    slug: 'contact',
    title: 'お問い合わせ - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">お問い合わせ</h1>
          <p class="text-lg text-slate-600">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-12">
          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-4">連絡先</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold text-slate-900">メールアドレス</h3>
                <p class="text-slate-600">info@iplpf.org</p>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">事務局</h3>
                <p class="text-slate-600">
                  国際ピース・ラビング・ピープル財団<br />
                  東京都
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-xl font-bold text-slate-900 mb-4">メッセージを送る</h2>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">お名前</label>
                <input type="text" class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">メールアドレス</label>
                <input type="email" class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">メッセージ</label>
                <textarea rows={4} class="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
              <button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-6 font-semibold transition-colors">
                送信する
              </button>
            </form>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'supporter': {
    sourceUrl: 'https://www.iplpf.org/supporter/',
    path: '/supporter/',
    slug: 'supporter',
    title: 'サポーターになる - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">サポーターになる</h1>
          <p class="text-lg text-slate-600 leading-relaxed">
            皆様のご支援が、教育、研究、国際協力を通じた平和構築の
            ミッションを支えています。
            平和を愛する人々のコミュニティにぜひご参加ください。
          </p>
        </section>

        <section class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-xl font-bold text-slate-900 mb-4">都度寄付</h2>
            <p class="text-slate-600 mb-6">
              活動やプログラムを支援するための一回限りのご寄付です。
            </p>
            <a href="/lplpf/one-time-donation/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              寄付する
            </a>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
            <h2 class="text-xl font-bold text-slate-900 mb-4">継続寄付</h2>
            <p class="text-slate-600 mb-6">
              毎月のご支援で、長期的なインパクトを実現できます。
            </p>
            <a href="/lplpf/monthly-donation/" class="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors">
              継続寄付を始める
            </a>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'publication': {
    sourceUrl: 'https://www.iplpf.org/publication/',
    path: '/publication/',
    slug: 'publication',
    title: '出版物 - IPLPF',
    html: `
      <div class="space-y-8">
        <section>
          <h1 class="text-4xl font-bold text-slate-900 mb-6">出版物</h1>
          <p class="text-lg text-slate-600">
            平和構築と持続可能な開発に関する研究論文、報告書、教育資料です。
          </p>
        </section>

        <section>
          <div class="space-y-6">
            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">年次報告書2025</h3>
              <p class="text-slate-600 text-sm mb-4">
                2025年の活動、成果、財務報告の包括的な概要です。
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF文書</span>
            </article>

            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">平和教育ハンドブック</h3>
              <p class="text-slate-600 text-sm mb-4">
                学校で平和教育プログラムを実施するための教育者向けガイドです。
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF文書</span>
            </article>

            <article class="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">SDGs進捗報告書</h3>
              <p class="text-slate-600 text-sm mb-4">
                国連の持続可能な開発目標への私たちの貢献についての報告書です。
              </p>
              <span class="text-orange-600 text-sm font-medium">PDF文書</span>
            </article>
          </div>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'one-time-donation': {
    sourceUrl: 'https://www.iplpf.org/one-time-donation/',
    path: '/one-time-donation/',
    slug: 'one-time-donation',
    title: '都度寄付 - IPLPF',
    html: `
      <div class="space-y-8 max-w-2xl mx-auto">
        <section class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-6">ご寄付のお願い</h1>
          <p class="text-lg text-slate-600">
            皆様のご寄付が、世界中での平和構築活動を支えています。
          </p>
        </section>

        <section class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
          <div class="text-center mb-8">
            <p class="text-slate-600 mb-4">金額を選択するか、任意の金額を入力してください</p>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥1,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥3,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥5,000
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥10,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥30,000
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥50,000
              </button>
            </div>
          </div>
          <a href="/donate" class="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center rounded-xl py-4 font-semibold transition-colors">
            寄付手続きへ進む
          </a>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
  'monthly-donation': {
    sourceUrl: 'https://www.iplpf.org/monthly-donation/',
    path: '/monthly-donation/',
    slug: 'monthly-donation',
    title: '継続寄付 - IPLPF',
    html: `
      <div class="space-y-8 max-w-2xl mx-auto">
        <section class="text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-6">継続寄付サポーター</h1>
          <p class="text-lg text-slate-600">
            毎月のご支援が、長期的なインパクトと持続可能なプログラムを実現します。
          </p>
        </section>

        <section class="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-200">
          <div class="text-center mb-8">
            <p class="text-slate-600 mb-4">毎月の寄付額を選択してください</p>
            <div class="grid grid-cols-3 gap-4 mb-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥500/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥1,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥3,000/月
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥5,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                ¥10,000/月
              </button>
              <button class="border-2 border-orange-600 text-orange-600 rounded-xl py-3 font-semibold hover:bg-orange-50">
                その他
              </button>
            </div>
          </div>
          <a href="/donate" class="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center rounded-xl py-4 font-semibold transition-colors">
            継続寄付を始める
          </a>
        </section>
      </div>
    `,
    updatedAt: new Date().toISOString(),
  },
};

// Helper function to get page data
function getPageData(slug: string): PageData | null {
  // First, try to read from JSON file
  try {
    const filePath = path.join(PAGES_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch {
    // File doesn't exist or is invalid
  }

  // Fall back to sample content
  return SAMPLE_CONTENT[slug] || null;
}

// Generate static params for known pages
export function generateStaticParams() {
  const slugs = Object.keys(SAMPLE_CONTENT);

  // Add pages from JSON files if they exist
  try {
    if (fs.existsSync(PAGES_DIR)) {
      const files = fs.readdirSync(PAGES_DIR);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const slug = file.replace('.json', '');
          if (!slugs.includes(slug)) {
            slugs.push(slug);
          }
        }
      });
    }
  } catch {
    // Directory doesn't exist
  }

  return [
    { slug: undefined }, // Root path /lplpf/
    ...slugs.map(slug => ({ slug: [slug] })),
  ];
}

// Page component
export default async function LplpfPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join('__') || 'index';

  const pageData = getPageData(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      {slug !== 'index' && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/80">
                <li>
                  <Link href="/lplpf/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white font-medium">{pageData.title.replace(' - IPLPF', '')}</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {pageData.title.replace(' - IPLPF', '')}
            </h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <article
          className="prose prose-slate max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-orange-700 prose-a:underline-offset-4 hover:prose-a:text-orange-800 prose-img:rounded-2xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: pageData.html }}
        />
      </div>
    </div>
  );
}
