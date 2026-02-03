'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DonateCard from '@/components/donate/DonateCard';
import ImpactGrid from '@/components/donate/ImpactGrid';
import FeaturedTopic from '@/components/donate/FeaturedTopic';
import FAQAccordion from '@/components/donate/FAQAccordion';
import TrustBlock from '@/components/donate/TrustBlock';
import StickyBottomCTA from '@/components/common/StickyBottomCTA';
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

  const scrollToDonateCard = () => {
    donateCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showDonateButton={false} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Copy */}
              <div className="lg:pt-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  平和を愛する人を
                  <br />
                  増やすために
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  国連活動支援、平和推進、調査研究、支援活動を継続するための寄付を受け付けています。
                  あなたのご支援が、世界の平和構築に貢献します。
                </p>
                <div className="flex flex-wrap gap-4 mb-8 lg:hidden">
                  <button
                    type="button"
                    onClick={scrollToDonateCard}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    寄付する
                  </button>
                </div>
                {/* 実績バッジ */}
                <div className="flex flex-wrap gap-6 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      30+
                    </p>
                    <p className="text-sm text-gray-500">年の活動実績</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      50+
                    </p>
                    <p className="text-sm text-gray-500">国での活動</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      10,000+
                    </p>
                    <p className="text-sm text-gray-500">支援者</p>
                  </div>
                </div>
              </div>

              {/* Right: Donate Card */}
              <div ref={donateCardRef} className="lg:sticky lg:top-24">
                <DonateCard
                  className="max-w-md mx-auto lg:mx-0 lg:ml-auto"
                  initialSelection={initialSelection}
                />
              </div>
            </div>
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
        <TrustBlock />

        {/* Final CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              一緒に平和な世界をつくりましょう
            </h2>
            <p className="text-blue-100 mb-8">
              毎月のご支援で、継続的な活動を支えてください
            </p>
            <button
              type="button"
              onClick={scrollToDonateCard}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              今すぐ寄付する
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyBottomCTA onClick={scrollToDonateCard} />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 md:hidden" />
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <DonatePageContent />
    </Suspense>
  );
}
