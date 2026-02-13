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
  PROJECT_MYANMAR_GIRL_SMILE,
  PROJECT_MYANMAR_GIRL_WATER,
  PROJECT_MYANMAR_FAMILY_WELL,
  PROJECT_MYANMAR_CHILDREN_FOOD,
  PROJECT_MYANMAR_QUAKE_SCHOOL,
  PROJECT_MYANMAR_QUAKE_BRIDGE,
  PROJECT_MYANMAR_QUAKE_PAGODA,
  PROJECT_MYANMAR_QUAKE_TEMPLE,
  PROJECT_STAFF_SCHOOL,
  PROJECT_STAFF_BRIDGE,
  PROJECT_STAFF_TEMPLE,
  PROJECT_UN_FLAG_CAMP,
  PROJECT_HANDOVER,
} from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 object-contain" />
            <span className="font-bold text-sm text-slate-900">国際P-LP財団</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-[#0052A4] transition-colors">ホーム</Link>
            <Link
              href="/donate"
              className="hidden md:inline-flex items-center h-9 px-5 text-sm font-bold text-white rounded-full bg-[#0052A4]"
            >
              寄付する
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0052A4]/5 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-12">
              <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">OUR PROJECTS</motion.p>
              <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">活動内容</motion.h1>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                国連との連携を基盤に、カンボジア・フィリピン・ミャンマーなど世界各地で
                平和構築と人道支援に取り組んでいます
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* 4 Pillars */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 space-y-16">

            {/* 1. 国連活動支援 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={SDGS_URL} alt="国連活動支援" className="w-full h-64 object-cover" />
              </div>
              <div>
                <span className="inline-block text-xs font-bold text-[#0052A4] bg-blue-50 px-3 py-1 rounded-full mb-3">PILLAR 01</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">国連活動支援</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  国連諸機関との連携を通じ、国際社会の平和と安全保障に貢献する活動を支援しています。
                  国連総会サイドイベントへの参加、国連機関への政策提言活動、SDGs達成に向けたパートナーシップの構築など、
                  グローバルな枠組みの中で平和構築に取り組んでいます。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  スタッフは国連のロゴ入りユニフォームを着用し、国際的な枠組みの中で信頼と責任をもって活動しています。
                </p>
              </div>
            </motion.div>

            {/* 2. 平和推進 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="md:order-2 rounded-2xl overflow-hidden shadow-lg">
                <img src={HERO_URL} alt="平和推進" className="w-full h-64 object-cover" />
              </div>
              <div className="md:order-1">
                <span className="inline-block text-xs font-bold text-[#0052A4] bg-blue-50 px-3 py-1 rounded-full mb-3">PILLAR 02</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">平和推進</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  「平和を愛する人を増やす」というミッションのもと、平和教育プログラムの開発・普及に取り組んでいます。
                  学校教育への平和学習の導入支援、ワークショップの開催、
                  地域コミュニティでの対話促進など、多角的なアプローチで平和文化の醸成に努めています。
                </p>
              </div>
            </motion.div>

            {/* 3. 調査研究・提言 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={MISSION_URL} alt="調査研究・提言" className="w-full h-64 object-contain bg-white" />
              </div>
              <div>
                <span className="inline-block text-xs font-bold text-[#0052A4] bg-blue-50 px-3 py-1 rounded-full mb-3">PILLAR 03</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">調査研究・提言</h3>
                <p className="text-slate-600 leading-relaxed">
                  紛争地域の実態調査、平和構築プロセスの分析、開発途上国の社会課題に関するフィールドリサーチなど、
                  エビデンスに基づいた調査研究を行い、その成果を政策提言として国内外の関係機関に発信しています。
                  現場の声を国際社会に届ける「架け橋」としての役割を担っています。
                </p>
              </div>
            </motion.div>

            {/* 4. 支援活動・災害復興 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="md:order-2 rounded-2xl overflow-hidden shadow-lg">
                <img src={PROJECT_UN_FLAG_CAMP} alt="支援活動" className="w-full h-64 object-cover" />
              </div>
              <div className="md:order-1">
                <span className="inline-block text-xs font-bold text-[#0052A4] bg-blue-50 px-3 py-1 rounded-full mb-3">PILLAR 04</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">支援活動・災害復興</h3>
                <p className="text-slate-600 leading-relaxed">
                  教育支援、給食支援、奨学金プログラム、井戸建設など現地に根ざした生活支援を展開するとともに、
                  地震などの自然災害発生時には、スタッフが直接被災地に入り、義援金や物資の提供を行う緊急支援活動も実施しています。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Myanmar Earthquake 2025 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-2 mb-4 text-sm font-semibold text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                緊急支援
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ミャンマー地震 緊急支援活動</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 max-w-2xl mx-auto">
                2025年3月にミャンマーで発生した大規模地震を受け、当財団スタッフが直接被災地に赴き、
                被害状況の調査と緊急支援活動を実施しました。
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
              {[
                { src: PROJECT_MYANMAR_QUAKE_SCHOOL, alt: '被災した学校の建物', caption: '倒壊した学校校舎' },
                { src: PROJECT_STAFF_SCHOOL, alt: '被災した学校を調査するスタッフ', caption: '被害状況を調査するスタッフ' },
                { src: PROJECT_STAFF_BRIDGE, alt: '崩壊した橋を視察', caption: '崩落した橋梁の視察' },
                { src: PROJECT_MYANMAR_QUAKE_BRIDGE, alt: '崩壊した橋の全景', caption: '崩壊した橋の全景' },
                { src: PROJECT_MYANMAR_QUAKE_PAGODA, alt: '損壊した寺院', caption: '損壊した仏塔' },
                { src: PROJECT_STAFF_TEMPLE, alt: '寺院の被害を調査', caption: '寺院の被害状況を記録' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-500">{photo.caption}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { src: PROJECT_UN_FLAG_CAMP, alt: '国連旗を掲げて支援', caption: '避難所で国連旗を掲げて支援物資を配布' },
                { src: PROJECT_HANDOVER, alt: '義援金の手渡し', caption: '被災地域の指導者へ義援金を直接手渡し' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{photo.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Children Support */}
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#0052A4] font-semibold text-sm tracking-widest mb-2">CHILDREN SUPPORT</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">子ども支援プロジェクト</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                教育支援、給食支援、井戸建設など、子どもたちの生活基盤を整える活動を行っています
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {[
                { src: PROJECT_MYANMAR_GIRL_SMILE, alt: 'ミャンマーの少女', caption: 'ミャンマー' },
                { src: PROJECT_MYANMAR_GIRL_WATER, alt: '水汲みをする少女', caption: '生活用水の確保' },
                { src: PROJECT_MYANMAR_CHILDREN_FOOD, alt: '給食支援', caption: '給食支援' },
                { src: PROJECT_MYANMAR_FAMILY_WELL, alt: '井戸の前の家族', caption: '井戸建設' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="rounded-xl overflow-hidden aspect-[4/3] mb-2">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-500 text-center">{photo.caption}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'フィリピン', desc: '教育支援・奨学金プログラム', image: CHILD_PHILIPPINES_BOY },
                { name: 'カンボジア', desc: '学校建設・給食支援プログラム', image: CHILD_CAMBODIA_1 },
                { name: 'ミャンマー', desc: '平和教育・物資支援・井戸建設', image: CHILD_MYANMAR_1 },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-md ring-1 ring-slate-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1">{r.name}</h3>
                    <p className="text-sm text-slate-500">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-[#0052A4] to-[#1E3A5F]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">活動を支援する</h2>
            <p className="text-blue-100 mb-8">あなたのご支援が、世界の子どもたちの未来を変えます。</p>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-bold text-[#0052A4] bg-white rounded-xl shadow-lg"
            >
              寄付する
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F172A] py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} International Peace-Loving People Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
