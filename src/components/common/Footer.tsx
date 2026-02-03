'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="text-xl font-bold">PLP財団</span>
            </div>
            <p className="text-sm text-gray-400">
              平和を愛する人を増やすために
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">活動</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
            <h4 className="font-bold mb-4">寄付</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
            <h4 className="font-bold mb-4">情報</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PLP財団. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
