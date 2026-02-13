'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HEADER_LOGO_URL } from '@/lib/iplpfAssets';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 object-contain" />
            <span className="font-bold text-sm text-slate-900">International Peace-Loving People Foundation</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">ホーム</Link>
            <Link
              href="/donate"
              className="hidden md:inline-flex items-center h-9 px-5 text-sm font-bold text-white rounded-full bg-[#0052A4] hover:bg-[#003d7a]"
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
              <p className="text-[#0052A4] font-semibold text-sm mb-2">CONTACT</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">お問い合わせ</h1>
              <p className="text-slate-500">
                ご質問・ご要望がございましたら、お気軽にお問い合わせください。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-100 shadow-sm mb-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">お名前 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">件名</label>
                  <input
                    type="text"
                    placeholder="お問い合わせ内容"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors resize-none"
                  />
                </div>
                <button className="w-full py-4 rounded-xl font-bold text-base bg-[#0052A4] text-white shadow-lg shadow-blue-900/20 hover:bg-[#003d7a] transition-all">
                  送信する
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 ring-1 ring-slate-100 text-center"
            >
              <h3 className="font-bold text-slate-900 mb-3">その他のお問い合わせ方法</h3>
              <p className="text-sm text-slate-500 mb-2">メール: info@iplpf.org</p>
              <p className="text-sm text-slate-500">
                公式サイト:{' '}
                <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer" className="text-[#0052A4] hover:underline">
                  https://iplpf.org/
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} International Peace-Loving People Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
