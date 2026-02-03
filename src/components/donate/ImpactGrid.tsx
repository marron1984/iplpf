'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

const IMPACT_ITEMS = [
  {
    amount: 3000,
    description: '平和教育プログラムの教材1セットを提供',
    image: '/images/impact-1.svg',
    color: 'from-sky-500 to-blue-600',
  },
  {
    amount: 5000,
    description: '国連会議への提言活動1件をサポート',
    image: '/images/impact-2.svg',
    color: 'from-emerald-500 to-green-600',
  },
  {
    amount: 10000,
    description: '被災地への緊急支援キット5セットを提供',
    image: '/images/impact-3.svg',
    color: 'from-amber-500 to-orange-600',
  },
  {
    amount: 30000,
    description: '平和構築に関する調査研究1件を実施',
    image: '/images/impact-4.svg',
    color: 'from-violet-500 to-purple-600',
  },
];

interface ImpactGridProps {
  className?: string;
}

export default function ImpactGrid({ className }: ImpactGridProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            あなたの寄付でできること
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ご支援はすべて、平和な世界の実現に向けた具体的な活動に使われます
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200/60 hover:shadow-lg hover:ring-slate-300/60 transition-all duration-300"
            >
              {/* 画像 */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-10',
                    item.color
                  )}
                />
              </div>
              {/* コンテンツ */}
              <div className="p-5">
                <p
                  className={cn(
                    'text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2',
                    item.color
                  )}
                >
                  ¥{item.amount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
