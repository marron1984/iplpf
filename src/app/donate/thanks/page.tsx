'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { HEADER_LOGO_URL, HERO_URL } from '@/lib/iplpfAssets';

function ThanksContent() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 object-contain" />
            <span className="font-bold text-sm text-slate-900">International Peace-Loving People Foundation</span>
          </Link>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#0052A4] flex items-center justify-center shadow-lg shadow-blue-900/20"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
          >
            ありがとうございます
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 mb-8 leading-relaxed"
          >
            ご寄付の手続きが完了しました。
            <br />
            いただいたご支援は、世界の平和構築と子どもたちの未来のために大切に使わせていただきます。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden mb-8 shadow-lg"
          >
            <img src={HERO_URL} alt="平和活動" className="w-full h-48 object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-5 ring-1 ring-slate-100 text-left mb-8"
          >
            <h3 className="font-bold text-slate-900 mb-3">今後の流れ</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-[#0052A4] font-bold shrink-0">1.</span>
                確認メールをお送りしました
              </li>
              <li className="flex gap-2">
                <span className="text-[#0052A4] font-bold shrink-0">2.</span>
                領収書が必要な場合はお問い合わせください
              </li>
              <li className="flex gap-2">
                <span className="text-[#0052A4] font-bold shrink-0">3.</span>
                活動報告はお知らせページで公開しています
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-bold text-white rounded-xl bg-[#0052A4] hover:bg-[#003d7a]"
            >
              トップページへ
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-bold text-slate-700 rounded-xl bg-white ring-1 ring-slate-200 hover:bg-slate-50 transition-colors"
            >
              活動報告を見る
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="bg-[#0F172A] py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} International Peace-Loving People Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <ThanksContent />
    </Suspense>
  );
}
