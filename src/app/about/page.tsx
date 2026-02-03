'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

// Image URLs
const IMAGES = {
  logo: 'https://iplpf.org/wp-content/uploads/2026/01/HDRP_ロゴマークOL_20260119-768x454.png',
  cambodia2: 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアバンザイ_0258.png',
  myanmar1: 'https://iplpf.org/wp-content/uploads/2026/01/ミャンマー2-768x432.png',
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-white/95 backdrop-blur-xl shadow-sm'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src={IMAGES.logo}
                alt="PLP財団"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-lg">
              PLP財団
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'ホーム', href: '/' },
              { label: '活動内容', href: '/activities' },
              { label: 'お知らせ', href: '/news' },
              { label: 'お問い合わせ', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate">
              <Button
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-lg shadow-amber-500/25"
              >
                寄付する
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 font-semibold text-sm mb-4"
            >
              ABOUT US
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              団体概要
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              国際ピース・ラビング・ピープル財団（IPLPF）について
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <p className="text-amber-600 font-semibold text-sm mb-2">OUR MISSION</p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  私たちの使命
                </h2>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <blockquote className="text-xl md:text-2xl text-stone-700 font-medium leading-relaxed text-center mb-8">
                  「平和を愛する人を増やす」
                </blockquote>
                <p className="text-stone-600 leading-relaxed text-center">
                  国際ピース・ラビング・ピープル財団（International Peace-Loving-People Foundation / IPLPF）は、
                  国連及び国連活動を支援することを通じて、世界平和と人類の発展・福祉に寄与することをめざす
                  国際的なNGO（非政府組織）です。
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <p className="text-amber-600 font-semibold text-sm mb-2">HISTORY</p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  設立の経緯
                </h2>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-8">
                {[
                  {
                    year: '1988年',
                    title: '米国ニューヨークで設立',
                    description: '国連事務総長（当時）のハビエル・ペレス・デ・クエヤル氏から「国連を支援するNGOを創ってほしい」と依頼されたことをきっかけに、米国元国連大使リチャード・ウィルソン・ペトリー氏、国連事務次長明石康氏、衆議院議員渡部一郎氏の3名により創立されました。',
                  },
                  {
                    year: '1996年',
                    title: '国連ECOSOC総合諮問資格を取得',
                    description: '国連のECOSOC（国際連合経済社会理事会）に「総合諮問資格」を有するNGO（旧カテゴリー1）に認定されました。日本国内では4団体のみが持つ資格です。',
                  },
                  {
                    year: '2020年',
                    title: '日本国内で法人格を取得',
                    description: '「一般財団法人国連支援財団」として日本国内での法人格を取得しました。',
                  },
                  {
                    year: '現在',
                    title: '国際ピース・ラビング・ピープル財団へ',
                    description: '「一般財団法人国際ピース・ラビング・ピープル財団（IPLPF）」として、平和推進、国連活動支援、調査研究・提言、支援活動を展開しています。',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm text-center leading-tight">
                          {item.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <p className="text-amber-600 font-semibold text-sm mb-2">OUR VALUES</p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  私たちの価値観
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🕊️',
                    title: 'Peace',
                    subtitle: '平和',
                    description: '世界平和の実現に向けて、対話と相互理解を促進します。',
                  },
                  {
                    icon: '💝',
                    title: 'Love',
                    subtitle: '愛',
                    description: '人類愛に基づき、すべての人々の幸福を願い行動します。',
                  },
                  {
                    icon: '🌱',
                    title: 'Prosperity',
                    subtitle: '繁栄',
                    description: '持続可能な発展と福祉の向上に貢献します。',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <span className="text-5xl mb-4 block">{item.icon}</span>
                    <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                    <p className="text-amber-600 font-medium text-sm mb-3">{item.subtitle}</p>
                    <p className="text-stone-500 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Organization Info */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <p className="text-amber-600 font-semibold text-sm mb-2">ORGANIZATION</p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  組織情報
                </h2>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-[#FFFBF5] rounded-3xl p-8 md:p-10"
              >
                <table className="w-full">
                  <tbody className="divide-y divide-stone-200">
                    {[
                      { label: '名称', value: '一般財団法人 国際ピース・ラビング・ピープル財団' },
                      { label: '英語名称', value: 'International Peace-Loving-People Foundation (IPLPF)' },
                      { label: '設立', value: '1988年11月（米国ニューヨーク）' },
                      { label: '日本法人設立', value: '2020年11月' },
                      { label: '国連認定', value: 'ECOSOC総合諮問資格NGO（1996年認定）' },
                      { label: '活動地域', value: 'カンボジア、フィリピン、ミャンマー他' },
                    ].map((row, i) => (
                      <tr key={i} className="flex flex-col md:table-row">
                        <th className="py-4 text-left font-semibold text-stone-900 md:w-1/3">
                          {row.label}
                        </th>
                        <td className="pb-4 md:py-4 text-stone-600">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <motion.div
            className="max-w-3xl mx-auto px-4 md:px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              一緒に平和な世界を
              <br />
              つくりましょう
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/90 text-lg mb-10"
            >
              あなたのご支援が、世界を変える力になります
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-stone-50 border-0 shadow-xl px-8"
                >
                  寄付する
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 text-white hover:bg-white/30 border-white/30 px-8"
                >
                  お問い合わせ
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative">
                  <Image
                    src={IMAGES.logo}
                    alt="PLP財団"
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="40px"
                  />
                </div>
                <span className="text-lg font-bold text-white">PLP財団</span>
              </div>
              <p className="text-sm text-stone-400">
                平和を愛する人を増やすために
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">活動</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/activities" className="hover:text-white transition-colors">活動内容</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">お知らせ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">寄付</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/donate" className="hover:text-white transition-colors">寄付する</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">情報</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/about" className="hover:text-white transition-colors">団体概要</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} PLP財団. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
