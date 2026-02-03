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
    <section className={cn('relative py-32 overflow-hidden', className)}>
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full glass mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse" />
            <span className="text-sm text-white/80">注力テーマ</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h2>
        </div>

        {/* カード */}
        <div
          className={cn(
            'relative rounded-3xl overflow-hidden',
            'bg-white/5 backdrop-blur-xl border border-white/10',
            'hover:border-white/20 transition-all duration-500',
            'shadow-2xl shadow-black/20'
          )}
        >
          <div className="md:flex">
            {/* 画像 */}
            <div className="md:w-1/2 relative min-h-[280px] md:min-h-[400px]">
              <Image
                src={imageUrl}
                alt="今月の注力テーマ"
                fill
                className="object-cover"
              />
              {/* グラデーションオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030712]/80 md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent md:hidden" />
              {/* カラーオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/20 mix-blend-overlay" />
            </div>

            {/* コンテンツ */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              {/* バッジ */}
              <span className="inline-flex items-center self-start px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                <span className="text-xs font-semibold text-blue-400">国連活動支援</span>
              </span>

              {/* タイトル */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight">
                国連総会に向けた
                <br />
                <span className="gradient-text">政策提言活動</span>
              </h3>

              {/* 説明 */}
              <p className="text-white/60 mb-8 leading-relaxed text-lg">
                {description}
              </p>

              {/* リンク */}
              <a
                href={linkUrl}
                className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
              >
                詳しく見る
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
