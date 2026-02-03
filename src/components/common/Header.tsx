'use client';

import Link from 'next/link';

interface HeaderProps {
  showDonateButton?: boolean;
}

export default function Header({ showDonateButton = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <span className="text-xl font-bold text-gray-900">PLP財団</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            活動内容
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            お知らせ
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            お問い合わせ
          </Link>
          {showDonateButton && (
            <Link
              href="/donate"
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              寄付する
            </Link>
          )}
        </nav>
        <button
          type="button"
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
