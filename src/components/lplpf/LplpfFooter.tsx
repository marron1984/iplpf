import Link from 'next/link';

// Image URLs
const IMAGES = {
  nissanLogo: 'https://iplpf.org/wp-content/uploads/2023/06/nissan-2.png',
  footerLogo: 'https://iplpf.org/wp-content/uploads/2026/01/%E3%83%95%E3%83%83%E3%82%BF%E3%83%BC%E3%83%AD%E3%82%B4-768x222.png',
};

// Footer links
const FOOTER_LINKS = {
  about: [
    { label: '私たちについて', href: '/lplpf/about-us/' },
    { label: '活動内容', href: '/lplpf/what-we-do/' },
    { label: 'プロジェクト', href: '/lplpf/projects/' },
  ],
  resources: [
    { label: '出版物', href: '/lplpf/publication/' },
    { label: 'お知らせ', href: '/lplpf/blog-list/' },
    { label: 'サポーター', href: '/lplpf/supporter/' },
  ],
  support: [
    { label: '都度寄付', href: '/lplpf/one-time-donation/' },
    { label: '継続寄付', href: '/lplpf/monthly-donation/' },
    { label: 'お問い合わせ', href: '/lplpf/contact/' },
  ],
};

export default function LplpfFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Partner Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            パートナー
          </h3>
          <div className="flex justify-center items-center">
            <img
              src={IMAGES.nissanLogo}
              alt="日産自動車"
              className="h-10 md:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/lplpf/" className="flex items-center gap-3 mb-4">
              <span className="text-lg font-bold">IPLPF</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              国際ピース・ラビング・ピープル財団
              <br />
              教育、研究、国際協力を通じて平和を構築
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">私たちについて</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">リソース</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">ご支援</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Logo - Links to iplpf.org */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex justify-center">
            <a
              href="https://iplpf.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src={IMAGES.footerLogo}
                alt="IPLPF ロゴ"
                className="h-16 md:h-20 w-auto max-w-[360px] md:max-w-[480px] object-contain"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} IPLPF. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/lplpf/privacy-policy/"
              className="text-sm text-slate-500 hover:text-orange-400 transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/lplpf/terms/"
              className="text-sm text-slate-500 hover:text-orange-400 transition-colors"
            >
              利用規約
            </Link>
            <a
              href="https://iplpf.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-orange-400 transition-colors"
            >
              本家サイト
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
