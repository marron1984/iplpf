'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Logo URL from iplpf.org
const LOGO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/HDRP_ロゴマークOL_20260119-768x454.png';

// Navigation items
const NAV_ITEMS = [
  { label: 'ホーム', href: '/lplpf/' },
  { label: '私たちについて', href: '/lplpf/about-us/' },
  { label: '活動内容', href: '/lplpf/what-we-do/' },
  { label: 'プロジェクト', href: '/lplpf/projects/' },
  { label: 'お知らせ', href: '/lplpf/blog-list/' },
  { label: 'お問い合わせ', href: '/lplpf/contact/' },
];

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

export default function LplpfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50">
      {/* Header */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/lplpf/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src={LOGO_URL}
                alt="IPLPF"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span
              className={cn(
                'font-bold tracking-tight text-lg transition-colors',
                isScrolled ? 'text-slate-900' : 'text-slate-800'
              )}
            >
              IPLPF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-orange-600',
                  isScrolled ? 'text-slate-700' : 'text-slate-700'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate">
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-5 text-sm font-semibold shadow-sm transition-all hover:shadow-md">
                寄付する
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-slate-700 font-medium rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block mt-4"
                >
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-5 text-sm font-semibold">
                    寄付する
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/lplpf/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative">
                  <Image
                    src={LOGO_URL}
                    alt="IPLPF"
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="40px"
                  />
                </div>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
