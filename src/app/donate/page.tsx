'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState, useCallback } from 'react';
import DonateCard from '@/components/donate/DonateCard';
import ImpactGrid from '@/components/donate/ImpactGrid';
import FeaturedTopic from '@/components/donate/FeaturedTopic';
import FAQAccordion from '@/components/donate/FAQAccordion';
import TrustBlock from '@/components/donate/TrustBlock';
import StickyBottomCTA from '@/components/common/StickyBottomCTA';
import Button from '@/components/ui/Button';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';

function DonatePageContent() {
  const searchParams = useSearchParams();
  const donateCardRef = useRef<HTMLDivElement>(null);

  const initialSelection: Partial<DonationSelection> = {
    frequency:
      (searchParams.get('frequency') as DonationFrequency) ?? undefined,
    amount: searchParams.get('amount')
      ? parseInt(searchParams.get('amount')!, 10)
      : undefined,
    purpose: (searchParams.get('purpose') as DonationPurpose) ?? undefined,
  };

  const [currentSelection, setCurrentSelection] = useState<DonationSelection>({
    frequency: initialSelection.frequency ?? 'one_time',
    amount: initialSelection.amount ?? 5000,
    purpose: initialSelection.purpose ?? 'none',
  });

  const handleSelectionChange = useCallback((selection: DonationSelection) => {
    setCurrentSelection(selection);
  }, []);

  const scrollToDonateCard = () => {
    donateCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/25">
              P
            </div>
            <span className="text-xl font-bold">PLP財団</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#impact" className="text-sm text-white/70 hover:text-white transition-colors">活動内容</a>
            <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</a>
            <Button variant="primary" size="sm" onClick={scrollToDonateCard}>
              寄付する
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          {/* 背景エフェクト */}
          <div className="absolute inset-0">
            {/* グラデーションオーブ */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* グリッドライン */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* 左: コピー */}
              <div className="animate-fadeIn">
                {/* バッジ */}
                <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
                  <span className="text-sm text-white/80">寄付受付中</span>
                </div>

                {/* 見出し */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
                  平和を愛する
                  <br />
                  <span className="gradient-text">人を増やす</span>
                </h1>

                {/* 説明 */}
                <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
                  国連活動支援、平和推進、調査研究を継続するために。
                  あなたの支援が、世界を変える力になります。
                </p>

                {/* 信頼バッジ */}
                <div className="flex flex-wrap gap-4 mb-10">
                  {['寄付金取扱規程', '個人情報保護', '領収書発行'].map((text) => (
                    <span key={text} className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70">
                      <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {text}
                    </span>
                  ))}
                </div>

                {/* 実績 */}
                <div className="flex gap-12">
                  {[
                    { value: '30+', label: '年の活動' },
                    { value: '50+', label: '国で展開' },
                    { value: '10K+', label: '支援者' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-4xl font-bold gradient-text-blue">{stat.value}</p>
                      <p className="text-sm text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* モバイルCTA */}
                <div className="mt-10 lg:hidden">
                  <Button variant="glow" size="xl" onClick={scrollToDonateCard} className="w-full">
                    今すぐ寄付する
                  </Button>
                </div>
              </div>

              {/* 右: 寄付カード */}
              <div ref={donateCardRef} className="lg:sticky lg:top-32 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <DonateCard
                  className="max-w-md mx-auto"
                  initialSelection={initialSelection}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            </div>
          </div>

          {/* スクロールインジケーター */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-white/40">Scroll</span>
            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="relative py-32">
          <div className="max-w-6xl mx-auto px-4">
            <ImpactGrid />
          </div>
        </section>

        {/* Featured Topic */}
        <FeaturedTopic />

        {/* FAQ Section */}
        <section id="faq" className="relative py-32">
          <div className="max-w-6xl mx-auto px-4">
            <FAQAccordion />
          </div>
        </section>

        {/* Trust Block */}
        <section className="relative py-32">
          <div className="max-w-6xl mx-auto px-4">
            <TrustBlock />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 overflow-hidden">
          {/* 背景 */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              一緒に
              <span className="gradient-text">平和な世界</span>
              を
            </h2>
            <p className="text-xl text-white/60 mb-12">
              毎月のご支援で、継続的な活動を支えてください
            </p>
            <Button variant="glow" size="xl" onClick={scrollToDonateCard}>
              今すぐ寄付する
            </Button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                P
              </div>
              <span className="font-semibold">PLP財団</span>
            </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} PLP財団. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <StickyBottomCTA
        onClick={scrollToDonateCard}
        amount={currentSelection.amount}
        frequency={currentSelection.frequency}
      />

      <div className="h-24 md:hidden" />
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
            <p className="text-sm text-white/40">読み込み中...</p>
          </div>
        </div>
      }
    >
      <DonatePageContent />
    </Suspense>
  );
}
