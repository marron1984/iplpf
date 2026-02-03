'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

const IMPACT_ITEMS = [
  {
    amount: 3000,
    description: '平和教育プログラムの教材1セットを提供',
    image: '/images/impact-1.svg',
    color: 'from-blue-500 to-cyan-400',
    glowColor: 'shadow-blue-500/20',
  },
  {
    amount: 5000,
    description: '国連会議への提言活動1件をサポート',
    image: '/images/impact-2.svg',
    color: 'from-emerald-500 to-green-400',
    glowColor: 'shadow-emerald-500/20',
  },
  {
    amount: 10000,
    description: '被災地への緊急支援キット5セットを提供',
    image: '/images/impact-3.svg',
    color: 'from-amber-500 to-orange-400',
    glowColor: 'shadow-amber-500/20',
  },
  {
    amount: 30000,
    description: '平和構築に関する調査研究1件を実施',
    image: '/images/impact-4.svg',
    color: 'from-purple-500 to-pink-400',
    glowColor: 'shadow-purple-500/20',
  },
];

interface ImpactGridProps {
  className?: string;
}

export default function ImpactGrid({ className }: ImpactGridProps) {
  return (
    <div className={cn(className)}>
      {/* ヘッダー */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center px-4 py-2 rounded-full glass mb-6">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
          <span className="text-sm text-white/80">インパクト</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          あなたの寄付で
          <span className="gradient-text">できること</span>
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          ご支援はすべて、平和な世界の実現に向けた具体的な活動に使われます
        </p>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {IMPACT_ITEMS.map((item, index) => (
          <div
            key={index}
            className={cn(
              'group relative rounded-2xl overflow-hidden',
              'bg-white/5 backdrop-blur-xl border border-white/10',
              'hover:bg-white/10 hover:border-white/20',
              'hover:shadow-2xl transition-all duration-500',
              item.glowColor
            )}
          >
            {/* 画像 */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={item.image}
                alt={item.description}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-40',
                  item.color
                )}
              />
              {/* オーバーレイグラデーション */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
            </div>

            {/* コンテンツ */}
            <div className="p-5 relative">
              {/* 金額 */}
              <p
                className={cn(
                  'text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-3',
                  item.color
                )}
              >
                ¥{item.amount.toLocaleString()}
              </p>
              {/* 説明 */}
              <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                {item.description}
              </p>
            </div>

            {/* ホバー時のグロー効果 */}
            <div
              className={cn(
                'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                'bg-gradient-to-br pointer-events-none',
                item.color,
                'blur-xl -z-10'
              )}
              style={{ transform: 'scale(0.8)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
