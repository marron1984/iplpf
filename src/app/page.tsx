'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  OFFICIAL_LOGO_URL,
  HEADER_LOGO_URL,
  HERO_URL,
  MISSION_URL,
  SDGS_URL,
  NOTO_URL,
  PARTNER_NISSAN_URL,
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_MYANMAR_1,
} from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const NAV_ITEMS = [
  { label: 'ホーム', href: '/' },
  { label: '活動内容', href: '/activities' },
  { label: 'お知らせ', href: '/news' },
  { label: 'お問い合わせ', href: '/contact' },
];

const ACTIVITIES = [
  {
    title: '平和推進',
    desc: '平和教育プログラムの開発と普及を通じて、平和を愛する人を増やします。',
    image: HERO_URL,
  },
  {
    title: '国連活動支援',
    desc: '国連機関と連携し、国際的な平和構築活動を支援しています。',
    image: SDGS_URL,
  },
  {
    title: '調査研究・提言',
    desc: '平和構築に関する調査研究を行い、政策提言を行っています。',
    image: MISSION_URL,
  },
  {
    title: '支援活動',
    desc: '教育支援、給食支援、奨学金プログラムを実施しています。',
    image: NOTO_URL,
  },
];

const COUNTRIES = [
  { name: 'フィリピン', image: CHILD_PHILIPPINES_BOY, desc: '教育支援・奨学金' },
  { name: 'カンボジア', image: CHILD_CAMBODIA_1, desc: '学校建設・給食支援' },
  { name: 'ミャンマー', image: CHILD_MYANMAR_1, desc: '平和教育・物資支援' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* ===== Header ===== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className={`font-bold text-sm md:text-base transition-colors ${scrolled ? 'text-stone-900' : 'text-white'}`}>
              国際P-LP財団
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="inline-flex items-center h-9 px-5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
            >
              寄付する
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-stone-900' : 'text-white'}`}
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
          <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-stone-700 font-medium border-b border-stone-100"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="block mt-4 text-center py-3 font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 to-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              寄付する
            </Link>
          </div>
        )}
      </header>

      <main>
        {/* ===== Hero ===== */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_URL} alt="PLP財団" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FFFBF5]" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-xs md:text-sm font-medium text-stone-700"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              30年以上の活動実績
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight"
            >
              平和を愛する人を
              <br />
              <span className="text-amber-300">増やす</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow"
            >
              国連活動支援、平和推進、調査研究、支援活動を通じて
              <br className="hidden md:block" />
              世界の平和構築に貢献しています
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center h-14 px-8 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
              >
                寄付する
              </Link>
              <Link
                href="#activities"
                className="inline-flex items-center justify-center h-14 px-8 text-base font-bold text-white rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
              >
                活動を見る
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 rounded-full bg-white/80" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== Stats ===== */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 md:gap-8 text-center">
            {[
              { value: '30年+', label: '活動実績' },
              { value: '5カ国', label: '支援地域' },
              { value: '10,000+', label: '支援者数' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <p className="text-3xl md:text-5xl font-bold text-amber-600">{stat.value}</p>
                <p className="text-xs md:text-sm text-stone-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== Mission ===== */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">OUR MISSION</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">めざすもの</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                私たちは平和を愛する心を育み、共に支え合う社会の実現を目指しています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white"
            >
              <img src={MISSION_URL} alt="めざすもの" className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </section>

        {/* ===== Activities ===== */}
        <section id="activities" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">OUR ACTIVITIES</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">私たちの活動</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                カンボジア、フィリピン、ミャンマーなど世界各地で平和構築のための活動を行っています
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACTIVITIES.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow ring-1 ring-stone-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{a.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Children / Countries ===== */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">SUPPORT REGIONS</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">支援地域の子どもたち</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                あなたの支援が、子どもたちの未来を変えます
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COUNTRIES.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-56 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-stone-900">{c.name}</h3>
                    <p className="text-sm text-stone-500 mt-1">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SDGs ===== */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">SDGs</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">SDGsへの取り組み</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                持続可能な開発目標（SDGs）の達成に向けて、様々な活動を展開しています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white p-6 md:p-8"
            >
              <img src={SDGS_URL} alt="SDGs" className="w-full max-w-3xl mx-auto h-auto object-contain" />
            </motion.div>
          </div>
        </section>

        {/* ===== Disaster Relief ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">DISASTER RELIEF</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">災害支援活動</motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={NOTO_URL} alt="能登半島地震支援" className="w-full h-auto object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-5"
              >
                <h3 className="text-xl md:text-2xl font-bold text-stone-900">能登半島地震 支援活動</h3>
                <p className="text-stone-600 leading-relaxed">
                  2024年1月に発生した能登半島地震の被災地において、
                  物資支援やボランティア活動を通じて復興支援に取り組んでいます。
                  被災された方々の一日も早い生活再建を願い、継続的な支援を行っています。
                </p>
                <Link
                  href="/activities"
                  className="inline-flex items-center h-11 px-6 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  活動詳細を見る
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== Partner ===== */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-6">パートナー</p>
            <img
              src={PARTNER_NISSAN_URL}
              alt="日産自動車"
              className="h-12 md:h-16 w-auto mx-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <motion.div
            className="max-w-3xl mx-auto px-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-white/30"
            >
              <img src={HERO_URL} alt="子どもたちの笑顔" className="w-full h-full object-cover" />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
              あなたの支援が、
              <br />
              世界を変える
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
              私たちの活動は、皆様のご支援によって支えられています。
              一緒に平和な世界をつくりましょう。
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center h-14 px-12 text-lg font-bold text-amber-600 bg-white rounded-2xl shadow-xl hover:bg-stone-50 transition-colors"
              >
                寄付する
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-stone-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-10">
            <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="国際P-LP財団"
                className="h-16 md:h-20 max-w-[360px] md:max-w-[480px] object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <img src={HEADER_LOGO_URL} alt="" className="w-10 h-10 object-contain brightness-0 invert" />
                <span className="text-lg font-bold text-white">P-LP財団</span>
              </div>
              <p className="text-sm text-stone-400">平和を愛する人を増やすために</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">活動</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/activities" className="hover:text-white transition-colors">活動内容</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">お知らせ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">支援</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/donate" className="hover:text-white transition-colors">寄付する</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">情報</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/about" className="hover:text-white transition-colors">団体概要</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center">
            <p className="text-sm text-stone-500">© {new Date().getFullYear()} 国際P-LP財団. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
