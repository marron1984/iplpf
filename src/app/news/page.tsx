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
  cambodia1: 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアIMG_0269.jpg',
  cambodia2: 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアバンザイ_0258.png',
  myanmar1: 'https://iplpf.org/wp-content/uploads/2026/01/ミャンマー2-768x432.png',
  philippines: 'https://iplpf.org/wp-content/uploads/2026/01/フィリピン男の子-768x576.png',
};

// Sample news data
const NEWS_ITEMS = [
  {
    id: 1,
    date: '2026年1月20日',
    category: 'お知らせ',
    title: 'ホームページをリニューアルしました',
    excerpt: '当財団のホームページをリニューアルいたしました。より見やすく、活動内容をお伝えできるようになりました。',
    image: IMAGES.cambodia2,
  },
  {
    id: 2,
    date: '2026年1月15日',
    category: '活動報告',
    title: 'カンボジア教育支援プロジェクト報告',
    excerpt: 'カンボジアにおける教育支援プロジェクトの活動報告をお届けします。多くの子どもたちに学習教材を届けることができました。',
    image: IMAGES.cambodia1,
  },
  {
    id: 3,
    date: '2026年1月10日',
    category: 'イベント',
    title: '平和講演会を開催しました',
    excerpt: '「世界平和と私たちにできること」をテーマに平和講演会を開催しました。多くの方にご参加いただきありがとうございました。',
    image: IMAGES.myanmar1,
  },
  {
    id: 4,
    date: '2025年12月20日',
    category: '活動報告',
    title: 'フィリピン給食支援活動報告',
    excerpt: 'フィリピンでの給食支援活動について報告いたします。子どもたちの笑顔が何よりの励みになっています。',
    image: IMAGES.philippines,
  },
  {
    id: 5,
    date: '2025年12月15日',
    category: 'お知らせ',
    title: '年末年始の休業のお知らせ',
    excerpt: '誠に勝手ながら、2025年12月28日〜2026年1月4日まで年末年始休業とさせていただきます。',
    image: null,
  },
  {
    id: 6,
    date: '2025年12月1日',
    category: 'お知らせ',
    title: '寄付金受領証明書の発行について',
    excerpt: '年末調整・確定申告に必要な寄付金受領証明書の発行についてご案内いたします。',
    image: null,
  },
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

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['すべて', 'お知らせ', '活動報告', 'イベント'];

  const filteredNews = selectedCategory && selectedCategory !== 'すべて'
    ? NEWS_ITEMS.filter(item => item.category === selectedCategory)
    : NEWS_ITEMS;

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
                  item.href === '/news' ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900'
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
              NEWS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              お知らせ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              財団からの最新情報をお届けします
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-stone-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'すべて' ? null : category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    (category === 'すべて' && !selectedCategory) || selectedCategory === category
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6"
            >
              {filteredNews.map((item, i) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.image && (
                      <div className="md:w-64 h-48 md:h-auto relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 256px"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs text-stone-400">{item.date}</span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-stone-900 mb-2 hover:text-amber-600 transition-colors cursor-pointer">
                        {item.title}
                      </h2>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filteredNews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-stone-500">該当するお知らせはありません</p>
              </div>
            )}
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
