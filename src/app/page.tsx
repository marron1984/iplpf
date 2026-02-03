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

// Hero images for carousel
const HERO_IMAGES = [
  { src: IMAGES.cambodia2, alt: 'カンボジアの子どもたち' },
  { src: IMAGES.philippines, alt: 'フィリピンの男の子' },
  { src: IMAGES.myanmar1, alt: 'ミャンマーでの活動' },
];

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

// Hero Carousel
function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-transparent to-transparent" />

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === current ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/75'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Activity Card
function ActivityCard({
  title,
  description,
  icon,
  image,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: string;
  image: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-4 left-4 text-3xl">{icon}</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-900 mb-2">{title}</h3>
        <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

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
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image
                src={IMAGES.logo}
                alt="PLP財団"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span className={cn(
              'font-bold tracking-tight text-sm md:text-lg transition-colors',
              isScrolled ? 'text-stone-900' : 'text-white'
            )}>
              PLP財団
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['ホーム', '活動内容', 'お知らせ', 'お問い合わせ'].map((item) => (
              <Link
                key={item}
                href="#"
                className={cn(
                  'text-sm font-medium transition-colors',
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                )}
              >
                {item}
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
            {['ホーム', '活動内容', 'お知らせ', 'お問い合わせ'].map((item) => (
              <Link
                key={item}
                href="#"
                className="block py-3 text-stone-700 font-medium border-b border-stone-100"
              >
                {item}
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
          <HeroCarousel />

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

        {/* Activities Section */}
        <section id="activities" className="py-16 md:py-24 bg-[#FFFBF5]">
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
              <ActivityCard
                title="平和推進"
                description="平和教育プログラムの開発と普及を通じて、平和を愛する人を増やします。"
                icon="🕊️"
                image={IMAGES.cambodia2}
                delay={0}
              />
              <ActivityCard
                title="国連活動支援"
                description="国連機関と連携し、国際的な平和構築活動を支援しています。"
                icon="🌍"
                image={IMAGES.myanmar2}
                delay={0.1}
              />
              <ActivityCard
                title="調査研究・提言"
                description="平和構築に関する調査研究を行い、政策提言を行っています。"
                icon="📊"
                image={IMAGES.cambodia3}
                delay={0.2}
              />
              <ActivityCard
                title="支援活動"
                description="教育支援、給食支援、奨学金プログラムを実施しています。"
                icon="🤝"
                image={IMAGES.philippines}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Activities Infographic */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white"
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
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className={cn(
                    'relative rounded-2xl overflow-hidden',
                    i === 0 ? 'col-span-2 md:col-span-1 aspect-[4/3]' : 'aspect-square'
                  )}
                >
                  <Image
                    src={src}
                    alt="活動写真"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
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
              className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8"
            >
              <Image
                src={IMAGES.cambodia2}
                alt="子どもたちの笑顔"
                fill
                className="object-cover rounded-full ring-4 ring-white/30"
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
                <li><Link href="#" className="hover:text-white transition-colors">平和推進</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">国連活動支援</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">調査研究・提言</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">支援活動</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">寄付</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/donate" className="hover:text-white transition-colors">寄付する</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">寄付金取扱規程</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">よくあるご質問</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">情報</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="#" className="hover:text-white transition-colors">団体概要</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link></li>
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
