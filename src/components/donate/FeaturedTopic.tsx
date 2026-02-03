'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FeaturedTopicProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  className?: string;
}

export default function FeaturedTopic({
  title = '今月の注力テーマ',
  description = '現在、国連総会に向けた政策提言活動に注力しています。平和構築に関する調査研究をもとに、実効性のある提言を行うための準備を進めています。皆様のご支援が、世界の平和構築に直接貢献します。',
  imageUrl = '/images/feature.svg',
  linkUrl = '#',
  className,
}: FeaturedTopicProps) {
  return (
    <section className={cn('py-16 md:py-24 bg-slate-50', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-slate-200/60 hover:shadow-lg transition-shadow duration-300">
          <div className="md:flex">
            {/* 画像 */}
            <div className="md:w-1/2 relative min-h-[240px] md:min-h-[320px]">
              <Image
                src={imageUrl}
                alt="今月の注力テーマ"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-transparent" />
            </div>
            {/* コンテンツ */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center self-start px-3 py-1.5 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2" />
                国連活動支援
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                国連総会に向けた政策提言活動
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {description}
              </p>
              <a
                href={linkUrl}
                className="inline-flex items-center text-sky-600 font-semibold hover:text-sky-700 transition-colors group"
              >
                詳しく見る
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
