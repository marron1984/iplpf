'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import {
  HERO_URL,
  MISSION_URL,
  SDGS_URL,
  NOTO_URL,
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_CAMBODIA_2,
  CHILD_MYANMAR_1,
  PROJECT_UN_FLAG_CAMP,
  PROJECT_STAFF_BRIDGE,
  PROJECT_MYANMAR_QUAKE_SCHOOL,
  PROJECT_MYANMAR_GIRL_SMILE,
  PROJECT_MYANMAR_FAMILY_WELL,
  PROJECT_MYANMAR_CHILDREN_FOOD,
  PROJECT_HANDOVER,
} from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const PILLARS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: '国連活動支援',
    desc: '国連諸機関との連携を通じ、国際社会の平和と安全保障に貢献する活動を支援しています。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
    title: '平和推進',
    desc: '平和を愛する人を増やすための教育プログラム開発・普及に取り組んでいます。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: '調査研究・提言',
    desc: '平和構築に関するエビデンスに基づいた調査研究を行い、政策提言を発信しています。',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: '支援活動・災害復興',
    desc: '教育支援、給食支援、災害緊急支援など、現地に根ざした支援活動を展開しています。',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteHeader transparent />

      <main>
        {/* ===== Hero ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_URL} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0052A4]/70 via-[#1E3A5F]/50 to-[#F8FAFC]" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <img
                src="/projects/logo-blue-small.png"
                alt="International Peace-Loving People Foundation"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-lg brightness-0 invert"
              />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight tracking-tight"
            >
              平和を愛する人を
              <br />
              <span className="text-blue-200">世界に増やす</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow"
            >
              国連との連携・国際協力・SDGsへの貢献を通じて
              <br className="hidden md:block" />
              世界の平和構築に取り組んでいます
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center h-14 px-8 text-base font-bold text-white rounded-2xl bg-[#0052A4] shadow-xl shadow-blue-900/30 hover:bg-[#003d7a] transition-colors"
              >
                寄付で支援する
              </Link>
              <Link
                href="#pillars"
                className="inline-flex items-center justify-center h-14 px-8 text-base font-bold text-white rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 transition-colors"
              >
                活動を知る
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-28 left-1/2 -translate-x-1/2"
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

        {/* ===== Trust Badges ===== */}
        <section className="py-12 md:py-16 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { value: '30年+', label: '活動実績', sub: 'Since 1990s' },
                { value: '5カ国+', label: '支援地域', sub: 'アジア太平洋' },
                { value: '国連', label: '連携機関', sub: 'UN Partnership' },
                { value: 'SDGs', label: '目標達成', sub: '持続可能な開発' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-2xl md:text-4xl font-bold text-[#0052A4]">{stat.value}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-slate-400">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Mission ===== */}
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">OUR MISSION</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">めざすもの</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                「平和を愛する人を増やす」ー私たちは国際社会と連携し、
                信頼に基づく持続可能な平和構築を推進しています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white ring-1 ring-slate-200"
            >
              <img src={MISSION_URL} alt="めざすもの" className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </section>

        {/* ===== 4 Pillars ===== */}
        <section id="pillars" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">FOUR PILLARS</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">4つの活動の柱</motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow ring-1 ring-slate-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0052A4]/10 text-[#0052A4] flex items-center justify-center mb-4">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Field Activities - Photo Grid ===== */}
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">FIELD ACTIVITIES</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">現地での活動</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                カンボジア、フィリピン、ミャンマーの現地スタッフと連携し、子どもたちの支援活動を行っています
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { src: PROJECT_MYANMAR_GIRL_SMILE, alt: 'ミャンマーの少女', span: '' },
                { src: CHILD_CAMBODIA_1, alt: 'カンボジアの子どもたち', span: '' },
                { src: PROJECT_UN_FLAG_CAMP, alt: '国連旗を掲げた支援活動', span: 'md:row-span-2' },
                { src: CHILD_PHILIPPINES_BOY, alt: 'フィリピンの男の子', span: '' },
                { src: PROJECT_MYANMAR_FAMILY_WELL, alt: '井戸の前の家族', span: '' },
                { src: PROJECT_MYANMAR_CHILDREN_FOOD, alt: '子どもたちへの給食支援', span: '' },
                { src: PROJECT_HANDOVER, alt: '現地への支援物資の引き渡し', span: '' },
                { src: PROJECT_STAFF_BRIDGE, alt: '被災地を視察するスタッフ', span: '' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl overflow-hidden aspect-[4/3] ${photo.span}`}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Myanmar Earthquake Relief ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-red-600 font-semibold text-sm tracking-widest mb-2">EMERGENCY RELIEF</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ミャンマー地震 緊急支援</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                2025年3月に発生したミャンマー地震の被災地へ、スタッフが直接現地入りし、緊急支援活動を行いました。
                寺院や学校が倒壊する甚大な被害の中、避難所での物資配布や義援金の直接手渡しを実施しています。
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img src={PROJECT_MYANMAR_QUAKE_SCHOOL} alt="被災した学校" className="w-full h-64 md:h-80 object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-5 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-2 w-fit text-sm font-semibold text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  緊急支援活動中
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                  現地スタッフが直接被災地へ
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  国際P-LP財団のスタッフが国連のロゴ入りユニフォームを着用し、ミャンマーの被災地域に直接赴き支援活動を展開。
                  崩壊した寺院や橋梁の被害状況を調査し、避難所のテントで暮らす被災者へ義援金と物資を届けました。
                </p>
                <Link
                  href="/activities"
                  className="inline-flex items-center h-11 px-6 w-fit text-sm font-bold text-white rounded-xl bg-[#0052A4] hover:bg-[#003d7a] transition-colors"
                >
                  活動詳細を見る
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: PROJECT_STAFF_BRIDGE, alt: '被災した橋を視察' },
                { src: PROJECT_UN_FLAG_CAMP, alt: '避難所での支援' },
                { src: PROJECT_HANDOVER, alt: '義援金の手渡し' },
                { src: NOTO_URL, alt: '能登半島地震支援' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl overflow-hidden aspect-[4/3]"
                >
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SDGs ===== */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">SUSTAINABLE DEVELOPMENT GOALS</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">SDGsへの取り組み</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                国連が掲げる持続可能な開発目標（SDGs）の達成に向けて、
                教育、平和、パートナーシップなど複数の目標に貢献する活動を展開しています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white p-6 md:p-10 ring-1 ring-slate-200"
            >
              <img src={SDGS_URL} alt="SDGs" className="w-full max-w-3xl mx-auto h-auto object-contain" />
            </motion.div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#0052A4] via-[#1E3A5F] to-[#0F172A]">
          <motion.div
            className="max-w-3xl mx-auto px-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <img
                src="/projects/logo-blue-small.png"
                alt="IPLPF"
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert opacity-80"
              />
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
              あなたの支援が、
              <br />
              世界を変える力になる
            </motion.h2>

            <motion.p variants={fadeUp} className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
              国際社会の平和構築と子どもたちの未来のために、
              あなたの力を貸してください。
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center h-14 px-12 text-lg font-bold text-[#0052A4] bg-white rounded-2xl shadow-xl hover:bg-blue-50 transition-colors"
              >
                寄付する
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-14 px-12 text-lg font-bold text-white rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-colors"
              >
                お問い合わせ
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
