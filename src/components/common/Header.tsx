'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface HeaderProps {
  showDonateButton?: boolean;
}

export default function Header({ showDonateButton = true }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/25">
            P
          </div>
          <span className="text-xl font-bold text-white">PLP財団</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            ホーム
          </Link>
          <Link
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            活動内容
          </Link>
          <Link
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            お知らせ
          </Link>
          <Link
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            お問い合わせ
          </Link>
          {showDonateButton && (
            <Link
              href="/donate"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25 transition-all duration-300"
            >
              寄付する
            </Link>
          )}
        </nav>
        <button
          type="button"
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
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
