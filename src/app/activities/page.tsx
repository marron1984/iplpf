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
  activities: 'https://iplpf.org/wp-content/uploads/2026/01/P-LPIの主な活動内容-1536x1143.png',
  cambodia1: 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアIMG_0269.jpg',
  cambodia2: 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアバンザイ_0258.png',
  cambodia3: 'https://iplpf.org/wp-content/uploads/2025/10/カンボジアIMG_0267.jpg',
  cambodia4: 'https://iplpf.org/wp-content/uploads/2025/10/IMG-2962-768x576.jpg',
  philippines: 'https://iplpf.org/wp-content/uploads/2026/01/フィリピン男の子-768x576.png',
  myanmar1: 'https://iplpf.org/wp-content/uploads/2026/01/ミャンマー2-768x432.png',
  myanmar2: 'https://iplpf.org/wp-content/uploads/2026/01/ミャンマー3-768x432.png',
  myanmar3: 'https://iplpf.org/wp-content/uploads/2026/01/ミャンマー5-768x557.png',
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

export default function ActivitiesPage() {
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
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image src={IMAGES.logo} alt="PLP財団" fill className="object-contain" sizes="48px" />
            </div>
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-lg">PLP財団</span>
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
                className={cn(
                  'text-sm font-medium transition-colors',
                  item.href === '/activities' ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate">
              <Button variant="primary" size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
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
              OUR ACTIVITIES
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              活動内容
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              世界平和の実現に向けた私たちの取り組み
            </motion.p>
          </div>
        </section>

        {/* Activities Overview */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white mb-16"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={IMAGES.activities}
                  alt="P-LPIの主な活動内容"
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 768px) 100vw, 1000px"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Activity 1: Peace Promotion */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              >
                <Image src={IMAGES.cambodia2} alt="平和推進活動" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-5xl mb-4 block">🕊️</span>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">平和推進</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  平和教育プログラムの開発と普及を通じて、平和を愛する人を増やす活動を行っています。
                  学校や地域コミュニティと連携し、次世代への平和の心の継承に取り組んでいます。
                </p>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    平和教育プログラムの開発・実施
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    平和講演会・セミナーの開催
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    国際交流プログラムの実施
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activity 2: UN Support */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <span className="text-5xl mb-4 block">🌍</span>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">国連活動支援</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  1996年に国連ECOSOC総合諮問資格を取得。国連機関と連携し、国際的な平和構築活動を支援しています。
                  SDGsの普及啓発や国連情報の発信も行っています。
                </p>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    国連ECOSOC総合諮問資格NGO
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    SDGsの普及啓発活動
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    国連情報の発信・アドボカシー
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden order-1 md:order-2"
              >
                <Image src={IMAGES.myanmar2} alt="国連活動支援" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activity 3: Research */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden"
              >
                <Image src={IMAGES.cambodia3} alt="調査研究" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-5xl mb-4 block">📊</span>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">調査研究・提言</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  平和構築に関する調査研究を行い、政策提言を行っています。
                  ヨハン・ガルトゥング博士をはじめとする世界的な平和研究者との連携も行っています。
                </p>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    平和構築に関する調査研究
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    政策提言・レポート発行
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    国際的な研究者との連携
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activity 4: Support */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <span className="text-5xl mb-4 block">🤝</span>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">支援活動・災害復興</h2>
                <p className="text-stone-600 leading-relaxed mb-6">
                  カンボジア、フィリピン、ミャンマーなど開発途上国での教育支援、給食支援、奨学金プログラムを実施。
                  被災地への緊急支援や復興支援活動も行っています。
                </p>
                <ul className="space-y-3 text-stone-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    教育支援・奨学金プログラム
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    給食支援・栄養改善
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                    緊急支援・災害復興支援
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden order-1 md:order-2"
              >
                <Image src={IMAGES.philippines} alt="支援活動" fill className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activity Regions */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                ACTIVITY REGIONS
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900">
                活動地域
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { country: 'カンボジア', image: IMAGES.cambodia1, description: '教育支援、給食支援を中心に活動' },
                { country: 'フィリピン', image: IMAGES.philippines, description: '子どもたちへの教育・生活支援' },
                { country: 'ミャンマー', image: IMAGES.myanmar1, description: '平和教育、人道支援活動' },
              ].map((region, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-[#FFFBF5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    <Image src={region.image} alt={region.country} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{region.country}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-stone-600 text-sm">{region.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                GALLERY
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900">
                活動の様子
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                IMAGES.cambodia1,
                IMAGES.philippines,
                IMAGES.myanmar1,
                IMAGES.cambodia3,
                IMAGES.myanmar3,
                IMAGES.cambodia4,
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-square rounded-2xl overflow-hidden"
                >
                  <Image src={src} alt="活動写真" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                </motion.div>
              ))}
            </div>
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              活動を支援してください
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/90 text-lg mb-10">
              皆様のご支援が、世界中の子どもたちの笑顔につながります
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/donate">
                <Button variant="secondary" size="lg" className="bg-white text-amber-600 hover:bg-stone-50 border-0 shadow-xl px-12">
                  寄付する
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
                  <Image src={IMAGES.logo} alt="PLP財団" fill className="object-contain brightness-0 invert" sizes="40px" />
                </div>
                <span className="text-lg font-bold text-white">PLP財団</span>
              </div>
              <p className="text-sm text-stone-400">平和を愛する人を増やすために</p>
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
            <p className="text-sm text-stone-500">© {new Date().getFullYear()} PLP財団. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
