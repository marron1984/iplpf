'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Image URLs
const IMAGES = {
  hero: 'https://iplpf.org/wp-content/uploads/2026/01/HP_TOP%E7%94%BB%E5%83%8F-3-c-scaled.png',
  mission: 'https://iplpf.org/wp-content/uploads/2026/01/%E3%82%81%E3%81%96%E3%81%99%E3%82%82%E3%81%AE%E5%90%8C%E3%82%B5%E3%82%A4%E3%82%BAOL2.png',
  sdgs: 'https://iplpf.org/wp-content/uploads/2023/06/sdg_poster.png',
  noto: 'https://iplpf.org/wp-content/uploads/2024/02/noto_20240127_5.png',
};

// Hero Section
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="PLP財団 トップイメージ"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            平和を愛する人々を
            <br />
            世界中に
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            国際ピース・ラビング・ピープル財団は、教育、研究、国際協力を通じて
            世界平和の実現に貢献します。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/lplpf/about-us/">
              <button className="bg-white text-orange-700 hover:bg-orange-50 rounded-xl h-12 px-6 font-semibold transition-colors shadow-lg">
                私たちについて
              </button>
            </Link>
            <Link href="/lplpf/one-time-donation/">
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 px-6 font-semibold transition-colors shadow-lg">
                寄付する
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Mission Section
export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            めざすもの
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            私たちは平和を愛する心を育み、共に支え合う社会の実現を目指しています。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200"
        >
          <img
            src={IMAGES.mission}
            alt="めざすもの - IPLPF ミッション"
            className="w-full h-auto object-contain bg-orange-50"
          />
        </motion.div>
      </div>
    </section>
  );
}

// SDGs Section
export function SDGsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            SDGsへの取り組み
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            持続可能な開発目標（SDGs）の達成に向けて、様々な活動を展開しています。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200 bg-white p-6 md:p-8"
        >
          <img
            src={IMAGES.sdgs}
            alt="SDGs ポスター"
            className="w-full max-w-3xl mx-auto h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}

// Disaster Support Section
export function DisasterSupportSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            災害支援活動
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            自然災害の被災地支援を通じて、人々の生活再建をサポートしています。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200">
            <img
              src={IMAGES.noto}
              alt="能登半島地震 支援活動"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              能登半島地震 支援活動
            </h3>
            <p className="text-slate-600 leading-relaxed">
              2024年1月に発生した能登半島地震の被災地において、
              物資支援やボランティア活動を通じて復興支援に取り組んでいます。
            </p>
            <Link href="/lplpf/projects/">
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-11 px-5 font-semibold transition-colors">
                プロジェクト詳細を見る
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Combined Home Sections Component
export default function LplpfHomeSections() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <SDGsSection />
      <DisasterSupportSection />
    </>
  );
}
