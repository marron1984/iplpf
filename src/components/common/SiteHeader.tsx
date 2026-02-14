'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HEADER_LOGO_URL } from '@/lib/iplpfAssets';

const NAV_ITEMS = [
  { label: '活動内容', href: '/activities' },
  { label: 'お知らせ', href: '/news' },
  { label: '団体概要', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
];

interface SiteHeaderProps {
  transparent?: boolean;
}

export default function SiteHeader({ transparent = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  const isTransparent = transparent && !scrolled;

  return (
    <header
      className={`${transparent ? 'fixed' : 'sticky'} top-0 inset-x-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <span className={`font-bold text-sm md:text-base transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
            国際P-LP財団
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[#0052A4]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="inline-flex items-center h-9 px-5 text-sm font-bold text-white rounded-full bg-[#0052A4] shadow-lg shadow-blue-900/20 hover:bg-[#003d7a] transition-colors"
          >
            寄付する
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 ${isTransparent ? 'text-white' : 'text-slate-900'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3 text-slate-700 font-medium border-b border-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="block mt-4 text-center py-3 font-bold text-white rounded-xl bg-[#0052A4]"
            onClick={() => setMenuOpen(false)}
          >
            寄付する
          </Link>
        </div>
      )}
    </header>
  );
}
