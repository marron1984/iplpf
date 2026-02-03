'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import {
  OFFICIAL_LOGO_URL,
  HEADER_LOGO_URL,
  HERO_URL,
  MISSION_URL,
  SDGS_URL,
  NOTO_URL,
  PARTNER_NISSAN_URL,
} from '@/lib/iplpfAssets';

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

// Stats Counter
function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-3xl md:text-5xl font-bold text-amber-600"
      >
        {value}
      </motion.p>
      <p className="text-xs md:text-sm text-stone-500 mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img
              src={HEADER_LOGO_URL}
              alt="国際P-LP財団 公式ロゴ"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className={cn(
              'font-bold tracking-tight text-sm md:text-lg transition-colors',
              isScrolled ? 'text-stone-900' : 'text-white'
            )}>
              PLP財団
            </span>
          </Link>

          {/* Desktop Nav */}
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
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                )}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-stone-900' : 'text-white'
            )}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-stone-100 px-4 py-4"
          >
            {[
              { label: 'ホーム', href: '/' },
              { label: '活動内容', href: '/activities' },
              { label: 'お知らせ', href: '/news' },
              { label: 'お問い合わせ', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-stone-700 font-medium border-b border-stone-100"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate" className="block mt-4">
              <Button variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                寄付する
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={HERO_URL}
              alt="PLP財団 トップイメージ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-transparent to-transparent" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-stone-700">
                30年以上の活動実績
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
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

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/donate">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-xl shadow-amber-500/30 px-8"
                >
                  寄付する
                </Button>
              </Link>
              <Link href="#activities">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 px-8"
                >
                  活動を見る
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
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

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <StatCounter value="30年+" label="活動実績" />
              <StatCounter value="5カ国" label="支援地域" />
              <StatCounter value="10,000+" label="支援者数" />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12 md:mb-16"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                OUR MISSION
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                めざすもの
              </motion.h2>
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
              <img
                src={MISSION_URL}
                alt="めざすもの - IPLPF ミッション"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12 md:mb-16"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                OUR ACTIVITIES
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                私たちの活動
              </motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                カンボジア、フィリピン、ミャンマーなど世界各地で
                平和構築のための活動を行っています
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: '平和推進', description: '平和教育プログラムの開発と普及を通じて、平和を愛する人を増やします。', icon: '🕊️', image: HERO_URL },
                { title: '国連活動支援', description: '国連機関と連携し、国際的な平和構築活動を支援しています。', icon: '🌍', image: SDGS_URL },
                { title: '調査研究・提言', description: '平和構築に関する調査研究を行い、政策提言を行っています。', icon: '📊', image: MISSION_URL },
                { title: '支援活動', description: '教育支援、給食支援、奨学金プログラムを実施しています。', icon: '🤝', image: NOTO_URL },
              ].map((activity, i) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-stone-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-3xl">{activity.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-stone-900 mb-2">{activity.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{activity.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SDGs Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12 md:mb-16"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                SDGs
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                SDGsへの取り組み
              </motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                持続可能な開発目標（SDGs）の達成に向けて、様々な活動を展開しています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white p-6 md:p-8"
            >
              <img
                src={SDGS_URL}
                alt="SDGs ポスター"
                className="w-full max-w-3xl mx-auto h-auto object-contain"
              />
            </motion.div>
          </div>
        </section>

        {/* Disaster Relief Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12 md:mb-16"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                DISASTER RELIEF
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                災害支援活動
              </motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
                自然災害の被災地支援を通じて、人々の生活再建をサポートしています。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={NOTO_URL}
                  alt="能登半島地震 支援活動"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-stone-900">
                  能登半島地震 支援活動
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  2024年1月に発生した能登半島地震の被災地において、
                  物資支援やボランティア活動を通じて復興支援に取り組んでいます。
                  被災された方々の一日も早い生活再建を願い、継続的な支援を行っています。
                </p>
                <Link href="/activities">
                  <Button
                    variant="primary"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 border-0"
                  >
                    活動詳細を見る
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-12 md:py-16 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h3 className="text-center text-sm font-semibold text-stone-400 uppercase tracking-wider mb-8">
              パートナー
            </h3>
            <div className="flex justify-center items-center">
              <img
                src={PARTNER_NISSAN_URL}
                alt="日産自動車"
                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <motion.div
            className="max-w-3xl mx-auto px-4 md:px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-white/30"
            >
              <img
                src={HERO_URL}
                alt="子どもたちの笑顔"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              あなたの支援が、
              <br />
              世界を変える
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/90 text-lg mb-10 max-w-xl mx-auto"
            >
              私たちの活動は、皆様のご支援によって支えられています。
              一緒に平和な世界をつくりましょう。
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link href="/donate">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-stone-50 border-0 shadow-xl px-12 py-4 text-lg"
                >
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
          {/* Footer Logo */}
          <div className="flex justify-center mb-12">
            <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="国際P-LP財団 公式ロゴ"
                className="h-16 md:h-20 w-auto max-w-[360px] md:max-w-[480px] object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={HEADER_LOGO_URL}
                  alt="国際P-LP財団 公式ロゴ"
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
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
