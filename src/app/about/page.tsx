'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HEADER_LOGO_URL, OFFICIAL_LOGO_URL, MISSION_URL } from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
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
          <div className="max-w-3xl mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm mb-2">ABOUT US</motion.p>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">団体概要</motion.h1>

              <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-lg mb-10">
                <img src={MISSION_URL} alt="IPLPF" className="w-full h-auto object-contain" />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  国際P-LP財団（International P-LP Foundation）は、「平和を愛する人を増やす」という理念のもと、
                  30年以上にわたって国際的な平和構築活動を行ってきました。
                </p>
                <p>
                  国連活動支援、平和推進、調査研究・提言、支援活動・災害復興の4つの柱を中心に、
                  カンボジア、フィリピン、ミャンマーなど世界各地で活動を展開しています。
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 bg-white rounded-2xl ring-1 ring-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['団体名', '一般財団法人 国際P-LP財団'],
                      ['英名', 'International P-LP Foundation (IPLPF)'],
                      ['設立', '1990年代'],
                      ['所在地', '日本'],
                      ['活動地域', 'カンボジア、フィリピン、ミャンマー 他'],
                      ['公式サイト', 'https://iplpf.org/'],
                    ].map(([label, value], i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0">
                        <td className="px-5 py-4 font-bold text-slate-900 bg-slate-50 w-1/3">{label}</td>
                        <td className="px-5 py-4 text-slate-600">
                          {label === '公式サイト' ? (
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#0052A4] hover:underline">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
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
