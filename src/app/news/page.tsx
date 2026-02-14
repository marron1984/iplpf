'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';

const NEWS_ITEMS = [
  {
    date: '2025.04.10',
    category: '緊急支援',
    title: 'ミャンマー地震 緊急支援活動報告（第2報）',
    summary: '現地スタッフによる被災地への義援金・物資の直接手渡しが完了しました。引き続き復興支援を継続します。',
  },
  {
    date: '2025.03.30',
    category: '緊急支援',
    title: 'ミャンマー地震 スタッフが被災地入り',
    summary: '2025年3月に発生したミャンマー大地震を受け、当財団スタッフが直接被災地に赴き緊急支援活動を開始しました。',
  },
  {
    date: '2025.01.15',
    category: '活動報告',
    title: 'カンボジアでの教育支援プログラム成果報告',
    summary: 'カンボジア・プノンペン近郊の学校での教育支援プログラムの成果をご報告します。',
  },
  {
    date: '2024.12.01',
    category: 'お知らせ',
    title: '年末年始の寄付キャンペーンのお知らせ',
    summary: '皆様のご支援に感謝し、年末年始の特別キャンペーンを実施いたします。',
  },
  {
    date: '2024.10.08',
    category: '活動報告',
    title: 'フィリピン奨学金プログラム 2024年度報告',
    summary: 'フィリピンでの奨学金プログラムの活動報告です。今年度も多くの学生を支援しました。',
  },
  {
    date: '2024.09.15',
    category: 'イベント',
    title: '国連総会サイドイベントに参加しました',
    summary: '第79回国連総会にあわせたサイドイベントに参加し、平和教育について発表しました。',
  },
  {
    date: '2024.02.10',
    category: '緊急支援',
    title: '能登半島地震 支援活動の経過報告',
    summary: '能登半島地震の被災地での支援活動の経過をご報告します。',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  '活動報告': 'bg-blue-50 text-blue-700',
  'お知らせ': 'bg-sky-50 text-sky-700',
  'イベント': 'bg-green-50 text-green-700',
  '緊急支援': 'bg-red-50 text-red-700',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteHeader />

      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-[#0052A4] font-semibold text-sm mb-2">NEWS</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">お知らせ</h1>
            </motion.div>

            <div className="space-y-4">
              {NEWS_ITEMS.map((item, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl p-5 ring-1 ring-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <time className="text-xs text-slate-400">{item.date}</time>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[item.category] || 'bg-slate-100 text-slate-600'}`}>
                      {item.category}
                    </span>
                  </div>
                  <h2 className="font-bold text-slate-900 mb-1">{item.title}</h2>
                  <p className="text-sm text-slate-500">{item.summary}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
