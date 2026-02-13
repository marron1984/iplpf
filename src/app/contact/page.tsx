'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HEADER_LOGO_URL } from '@/lib/iplpfAssets';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 object-contain" />
            <span className="font-bold text-sm text-stone-900">国際P-LP財団</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">ホーム</Link>
            <Link
              href="/donate"
              className="hidden md:inline-flex items-center h-9 px-5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            >
              寄付する
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-amber-600 font-semibold text-sm mb-2">CONTACT</p>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">お問い合わせ</h1>
              <p className="text-stone-500">
                ご質問・ご要望がございましたら、お気軽にお問い合わせください。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-stone-100 shadow-sm mb-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">お名前 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">件名</label>
                  <input
                    type="text"
                    placeholder="お問い合わせ内容"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors resize-none"
                  />
                </div>
                <button className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow">
                  送信する
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 ring-1 ring-stone-100 text-center"
            >
              <h3 className="font-bold text-stone-900 mb-3">その他のお問い合わせ方法</h3>
              <p className="text-sm text-stone-500 mb-2">メール: info@iplpf.org</p>
              <p className="text-sm text-stone-500">
                公式サイト:{' '}
                <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">
                  https://iplpf.org/
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} 国際P-LP財団. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
