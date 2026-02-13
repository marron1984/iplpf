'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HEADER_LOGO_URL,
  HERO_URL,
  SDGS_URL,
  MISSION_URL,
  NOTO_URL,
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_MYANMAR_1,
} from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const ACTIVITIES = [
  {
    title: '平和推進',
    desc: '平和教育プログラムの開発と普及を通じて、世界各地で平和を愛する心を育んでいます。学校教育への導入やワークショップの開催など、多角的なアプローチで活動しています。',
    image: HERO_URL,
  },
  {
    title: '国連活動支援',
    desc: '国連機関と連携し、国際会議への参加や提言活動を通じて、グローバルな平和構築に貢献しています。',
    image: SDGS_URL,
  },
  {
    title: '調査研究・提言',
    desc: '平和構築に関する調査研究を行い、エビデンスに基づいた政策提言を行っています。',
    image: MISSION_URL,
  },
  {
    title: '支援活動・災害復興',
    desc: '被災地への緊急支援や復興活動、また発展途上国での教育支援・給食支援を実施しています。能登半島地震をはじめ、国内外の災害支援にも迅速に対応しています。',
    image: NOTO_URL,
  },
];

const REGIONS = [
  { name: 'フィリピン', desc: '教育支援・奨学金プログラムを実施', image: CHILD_PHILIPPINES_BOY },
  { name: 'カンボジア', desc: '学校建設・給食支援プログラムを展開', image: CHILD_CAMBODIA_1 },
  { name: 'ミャンマー', desc: '平和教育・物資支援を推進', image: CHILD_MYANMAR_1 },
];

export default function ActivitiesPage() {
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
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-12">
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">OUR ACTIVITIES</motion.p>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">活動内容</motion.h1>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                4つの柱を中心に、世界各地で平和構築のための活動を行っています
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Activities */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 space-y-10">
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={a.image} alt={a.title} className="w-full h-64 object-cover" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-3">{a.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regions */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-amber-600 font-semibold text-sm mb-2">SUPPORT REGIONS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">支援地域</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REGIONS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-md ring-1 ring-stone-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-900 mb-1">{r.name}</h3>
                    <p className="text-sm text-stone-500">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">活動を支援する</h2>
            <p className="text-white/90 mb-8">あなたのご支援が、世界の平和構築に繋がります。</p>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-bold text-amber-600 bg-white rounded-xl shadow-lg"
            >
              寄付する
            </Link>
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
