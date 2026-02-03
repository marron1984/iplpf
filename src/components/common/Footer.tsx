'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                P
              </div>
              <span className="text-xl font-bold text-white">PLP財団</span>
            </div>
            <p className="text-sm text-white/50">
              平和を愛する人を増やすために
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-5">活動</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  平和推進
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  国連活動支援
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  調査研究・提言
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  支援活動・災害復興
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-5">寄付</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link
                  href="/donate"
                  className="hover:text-white transition-colors"
                >
                  寄付する
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  寄付金取扱規程
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  よくあるご質問
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-5">情報</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  団体概要
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} PLP財団. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
