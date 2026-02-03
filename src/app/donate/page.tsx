'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
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

  // URLクエリから初期値を取得
  const initialSelection: Partial<DonationSelection> = {
    frequency:
      (searchParams.get('frequency') as DonationFrequency) ?? undefined,
    amount: searchParams.get('amount')
      ? parseInt(searchParams.get('amount')!, 10)
      : undefined,
    purpose: (searchParams.get('purpose') as DonationPurpose) ?? undefined,
  };

  // 選択状態をトラック（モバイルCTA用）
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
    <div className="min-h-screen bg-white">
      <Header showDonateButton={false} />

      <main>
        {/* Hero Section with Image */}
        <section className="relative bg-gradient-to-br from-sky-50 via-white to-slate-50 overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-100 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-3 py-1.5 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2 animate-pulse" />
                  寄付受付中
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight mb-6">
                  平和を愛する人を
                  <br />
                  <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    増やすために
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                  国連活動支援、平和推進、調査研究、支援活動を継続するための寄付を受け付けています。
                </p>

                {/* Trust Chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 ring-1 ring-slate-200">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    寄付金取扱規程あり
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 ring-1 ring-slate-200">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    個人情報保護
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 ring-1 ring-slate-200">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    領収書発行可
                  </span>
                </div>

                {/* 実績バッジ */}
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      30+
                    </p>
                    <p className="text-sm text-slate-500">年の活動実績</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      50+
                    </p>
                    <p className="text-sm text-slate-500">国での活動</p>
                  </div>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      10,000+
                    </p>
                    <p className="text-sm text-slate-500">支援者</p>
                  </div>
                </div>

                {/* モバイル向けCTAボタン */}
                <div className="mt-8 lg:hidden">
                  <Button
                    variant="primary"
                    size="xl"
                    onClick={scrollToDonateCard}
                    className="w-full sm:w-auto"
                  >
                    今すぐ寄付する
                  </Button>
                </div>
              </div>

              {/* Right: Donate Card */}
              <div ref={donateCardRef} className="order-1 lg:order-2 lg:sticky lg:top-24">
                <DonateCard
                  className="max-w-md mx-auto lg:mx-0 lg:ml-auto"
                  initialSelection={initialSelection}
                  onSelectionChange={handleSelectionChange}
                />
              </div>
            </div>
          </div>

          {/* Hero Image (背景) */}
          <div className="absolute inset-0 -z-10 opacity-5">
            <Image
              src="/images/hero.svg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Impact Section */}
        <div className="max-w-6xl mx-auto px-4">
          <ImpactGrid />
        </div>

        {/* Featured Topic Section */}
        <FeaturedTopic />

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto px-4">
          <FAQAccordion />
        </div>

        {/* Trust Block Section */}
        <div className="max-w-6xl mx-auto px-4">
          <TrustBlock />
        </div>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-sky-600 to-blue-700 relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
              一緒に平和な世界をつくりましょう
            </h2>
            <p className="text-sky-100 text-lg mb-10">
              毎月のご支援で、継続的な活動を支えてください
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={scrollToDonateCard}
              className="bg-white text-sky-600 hover:bg-sky-50"
            >
              今すぐ寄付する
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyBottomCTA
        onClick={scrollToDonateCard}
        amount={currentSelection.amount}
        frequency={currentSelection.frequency}
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-24 md:hidden" />
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-600 border-t-transparent" />
            <p className="text-sm text-slate-500">読み込み中...</p>
          </div>
        </div>
      }
    >
      <DonatePageContent />
    </Suspense>
  );
}
