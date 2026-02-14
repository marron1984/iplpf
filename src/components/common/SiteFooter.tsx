import Link from 'next/link';
import { OFFICIAL_LOGO_URL, HEADER_LOGO_URL } from '@/lib/iplpfAssets';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0F172A] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-10">
          <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="国際P-LP財団"
              className="h-14 md:h-18 max-w-[360px] md:max-w-[480px] object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img src={HEADER_LOGO_URL} alt="" className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="text-lg font-bold text-white">P-LP財団</span>
            </div>
            <p className="text-sm text-slate-400">International Peace-Loving People Foundation</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">活動</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/activities" className="hover:text-white transition-colors">活動内容</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">お知らせ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">支援</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/donate" className="hover:text-white transition-colors">寄付する</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">情報</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">団体概要</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              <li><a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">公式サイト</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} International Peace-Loving People Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
