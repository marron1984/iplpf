'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import { AMOUNT_CHIPS, PURPOSE_LABELS, FREQUENCY_LABELS, FAQ_ITEMS, IMPACT_ITEMS } from '@/lib/donate/constants';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  OFFICIAL_LOGO_URL,
  HEADER_LOGO_URL,
  HERO_URL,
  MISSION_URL,
  SDGS_URL,
  NOTO_URL,
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_CAMBODIA_2,
  CHILD_CAMBODIA_3,
  CHILD_MYANMAR_1,
  CHILD_MYANMAR_2,
  CHILDREN_PHOTOS,
} from '@/lib/iplpfAssets';

/* ================================================
   Animation variants (same as top page)
   ================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ================================================
   Frequency Toggle
   ================================================ */
function FrequencyToggle({
  value,
  onChange,
}: {
  value: DonationFrequency;
  onChange: (v: DonationFrequency) => void;
}) {
  return (
    <div className="flex p-1 bg-stone-100 rounded-xl">
      {(['one_time', 'monthly'] as const).map((freq) => (
        <motion.button
          key={freq}
          onClick={() => onChange(freq)}
          className={cn(
            'flex-1 py-3 px-3 rounded-lg text-sm font-semibold transition-colors relative',
            value === freq ? 'text-white' : 'text-stone-600 hover:text-stone-900'
          )}
          whileTap={{ scale: 0.98 }}
        >
          {value === freq && (
            <motion.div
              layoutId="frequency-bg"
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{FREQUENCY_LABELS[freq]}</span>
        </motion.button>
      ))}
    </div>
  );
}

/* ================================================
   Purpose Selector
   ================================================ */
function PurposeSelector({
  value,
  onChange,
}: {
  value: DonationPurpose;
  onChange: (v: DonationPurpose) => void;
}) {
  const purposes: DonationPurpose[] = ['none', 'peace', 'un_support', 'research', 'relief'];
  const purposeIcons: Record<DonationPurpose, string> = {
    none: '🌐',
    peace: '🕊️',
    un_support: '🌍',
    research: '📊',
    relief: '🤝',
  };

  return (
    <div className="space-y-2">
      {purposes.map((purpose) => (
        <motion.button
          key={purpose}
          onClick={() => onChange(purpose)}
          className={cn(
            'w-full p-3 rounded-xl text-left transition-all duration-200',
            'border',
            value === purpose
              ? 'border-amber-400 bg-amber-50'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          )}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{purposeIcons[purpose]}</span>
              <span
                className={cn(
                  'text-sm font-medium',
                  value === purpose ? 'text-amber-700' : 'text-stone-600'
                )}
              >
                {PURPOSE_LABELS[purpose]}
              </span>
            </div>
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                value === purpose ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
              )}
            >
              {value === purpose && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

/* ================================================
   Donate Card (Compact form)
   ================================================ */
function DonateCard({
  selection,
  setSelection,
  customAmount,
  setCustomAmount,
  onProceed,
}: {
  selection: DonationSelection;
  setSelection: React.Dispatch<React.SetStateAction<DonationSelection>>;
  customAmount: string;
  setCustomAmount: (v: string) => void;
  onProceed: () => void;
}) {
  const [showPurpose, setShowPurpose] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelection((prev) => ({ ...prev, amount }));
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const num = parseInt(value.replace(/,/g, ''), 10);
    if (!isNaN(num) && num > 0) {
      setSelection((prev) => ({ ...prev, amount: num }));
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl p-5 md:p-7 w-full max-w-md ring-1 ring-stone-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-lg md:text-xl font-bold text-stone-900 mb-4 text-center">
        寄付金額を選ぶ
      </h2>

      {/* Frequency */}
      <div className="mb-5">
        <FrequencyToggle
          value={selection.frequency}
          onChange={(v) => setSelection((prev) => ({ ...prev, frequency: v }))}
        />
        {selection.frequency === 'monthly' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-amber-600 mt-2"
          >
            毎月の継続支援で、安定した活動基盤を支えられます
          </motion.p>
        )}
      </div>

      {/* Amount */}
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {AMOUNT_CHIPS.map((amount) => (
            <motion.button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={cn(
                'relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300',
                'border-2',
                selection.amount === amount && !customAmount
                  ? 'border-amber-500 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-md'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span
                className={cn(
                  'text-lg md:text-xl font-bold tracking-tight',
                  selection.amount === amount && !customAmount ? 'text-white' : 'text-stone-900'
                )}
              >
                ¥{amount.toLocaleString()}
              </span>
              <span
                className={cn(
                  'block text-xs mt-1',
                  selection.amount === amount && !customAmount ? 'text-white/80' : 'text-stone-500'
                )}
              >
                {amount === 3000 && '気軽に始める'}
                {amount === 5000 && '一番人気'}
                {amount === 10000 && 'しっかり支援'}
                {amount === 30000 && '大きな力に'}
              </span>
              {selection.amount === amount && !customAmount && (
                <motion.div
                  className="absolute top-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">¥</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="その他の金額"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={cn(
              'w-full pl-7 pr-3 py-3 rounded-xl border-2 text-base font-semibold',
              'transition-all duration-200 bg-white',
              'placeholder:text-stone-400 placeholder:font-normal placeholder:text-sm',
              customAmount
                ? 'border-amber-500 ring-2 ring-amber-500/20'
                : 'border-stone-200 hover:border-stone-300'
            )}
          />
        </div>
      </div>

      {/* Purpose Toggle */}
      <div className="mb-5">
        <button
          onClick={() => setShowPurpose(!showPurpose)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-xs font-medium text-stone-500">使途を指定（任意）</span>
          <motion.svg
            className="w-4 h-4 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: showPurpose ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        <AnimatePresence>
          {showPurpose && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <PurposeSelector
                  value={selection.purpose}
                  onChange={(v) => setSelection((prev) => ({ ...prev, purpose: v }))}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 mb-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">寄付金額</span>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-bold">
              ¥{selection.amount.toLocaleString()}
            </span>
            {selection.frequency === 'monthly' && (
              <span className="text-white/80 text-sm ml-1">/月</span>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="primary"
        size="lg"
        className="w-full bg-stone-900 hover:bg-stone-800 border-0 text-base py-3"
        onClick={onProceed}
      >
        この金額で寄付する
      </Button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-stone-100">
        {[
          { icon: '🔒', text: 'SSL暗号化' },
          { icon: '🛡️', text: '安心・安全' },
          { icon: '📄', text: '領収書発行' },
        ].map((badge) => (
          <span key={badge.text} className="flex items-center gap-1 text-xs text-stone-400">
            <span>{badge.icon}</span>
            {badge.text}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ================================================
   Hero Section – Full-screen image like top page
   ================================================ */
function HeroSection({
  selection,
  setSelection,
  customAmount,
  setCustomAmount,
  onProceed,
  formRef,
  scrollToForm,
}: {
  selection: DonationSelection;
  setSelection: React.Dispatch<React.SetStateAction<DonationSelection>>;
  customAmount: string;
  setCustomAmount: (v: string) => void;
  onProceed: () => void;
  formRef: React.RefObject<HTMLDivElement | null>;
  scrollToForm: () => void;
}) {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image (same pattern as top page) */}
      <div className="absolute inset-0">
        <img
          src={CHILD_PHILIPPINES_BOY}
          alt="フィリピンの子どもたち"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left – Text Content */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-stone-700">
                安心・安全な寄付プラットフォーム
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
            >
              あなたの支援が
              <br />
              <span className="text-amber-300">世界を変える</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-xl text-white/90 max-w-md mb-8 leading-relaxed drop-shadow">
              国際P-LP財団は、教育・研究・国際協力を通じて
              SDGsの達成と世界平和の実現に貢献しています。
            </motion.p>

            {/* Mobile CTA */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 md:hidden">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToForm}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-xl shadow-amber-500/30 px-8"
              >
                今すぐ寄付する
              </Button>
            </motion.div>
          </motion.div>

          {/* Right – Donation Card (desktop) */}
          <div ref={formRef} className="hidden md:block">
            <DonateCard
              selection={selection}
              setSelection={setSelection}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              onProceed={onProceed}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================
   Stats Section (same as top page)
   ================================================ */
function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {[
            { value: '30年+', label: '活動実績' },
            { value: '5カ国', label: '支援地域' },
            { value: '10,000+', label: '支援者数' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-3xl md:text-5xl font-bold text-amber-600"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs md:text-sm text-stone-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================
   Impact Section (with children photos)
   ================================================ */
function ImpactSection() {
  const impacts = [
    {
      amount: '¥3,000',
      impact: '教材キット1セット',
      description: '平和教育プログラムの教材を子どもたちに届けます',
      image: CHILD_CAMBODIA_1,
      country: 'カンボジア',
    },
    {
      amount: '¥10,000',
      impact: '1ヶ月の給食支援',
      description: '栄養ある食事で、子どもたちの健やかな成長を支えます',
      image: CHILD_MYANMAR_1,
      country: 'ミャンマー',
    },
    {
      amount: '¥30,000',
      impact: '奨学金1ヶ月分',
      description: '高等教育の機会を提供し、未来のリーダーを育てます',
      image: CHILD_PHILIPPINES_BOY,
      country: 'フィリピン',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
            YOUR IMPACT
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            あなたの寄付でできること
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
            一つ一つの支援が、子どもたちの未来を大きく変えます
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-stone-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.country}の子どもたち`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white/90 text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                  {item.country}
                </span>
              </div>
              <div className="p-5">
                <span className="text-amber-600 font-bold text-sm">{item.amount}で</span>
                <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2">{item.impact}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================
   Activities Section (same card style as top page)
   ================================================ */
function ActivitiesSection() {
  const activities = [
    { title: '平和推進', description: '平和教育プログラムの開発と普及を通じて、平和を愛する人を増やします。', icon: '🕊️', image: HERO_URL },
    { title: '国連活動支援', description: '国連機関と連携し、国際的な平和構築活動を支援しています。', icon: '🌍', image: MISSION_URL },
    { title: '調査研究・提言', description: '平和構築に関する調査研究を行い、政策提言を行っています。', icon: '📊', image: CHILD_CAMBODIA_2 },
    { title: '支援活動', description: '教育支援、給食支援、奨学金プログラムを実施しています。', icon: '🤝', image: NOTO_URL },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFFBF5]">
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
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-stone-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-3xl">{activity.icon}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-stone-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================
   SDGs Section (same as top page)
   ================================================ */
function SDGsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
            SDGs
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            SDGsへの取り組み
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
            持続可能な開発目標（SDGs）の達成に向けて、様々な活動を展開しています。
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-xl bg-white p-6 md:p-8"
        >
          <img
            src={SDGS_URL}
            alt="SDGs ポスター"
            className="w-full max-w-3xl mx-auto h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   Photo Gallery – Children around the world
   ================================================ */
function PhotoGallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
            ACTIVITIES AROUND THE WORLD
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            世界各地の活動
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 max-w-2xl mx-auto">
            カンボジア・フィリピン・ミャンマーをはじめ、世界各地で教育支援活動を展開しています
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CHILDREN_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className={cn(
                'relative rounded-2xl overflow-hidden group cursor-pointer',
                i === 0 ? 'col-span-2 md:col-span-1 aspect-[4/3]' : 'aspect-square'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm">{photo.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================
   FAQ Section
   ================================================ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-stone-900 pr-4 text-sm md:text-base">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-amber-500 text-xl flex-shrink-0 font-bold"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <p className="text-stone-600 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FFFBF5]">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            よくある質問
          </motion.h2>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {FAQ_ITEMS.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   CTA Section (same gradient as top page)
   ================================================ */
function CTASection({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
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
          className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-white/30"
        >
          <img
            src={CHILD_CAMBODIA_1}
            alt="カンボジアの子どもたち"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          一緒に、
          <br />
          未来を変えましょう
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-white/90 text-lg mb-10 max-w-xl mx-auto"
        >
          あなたの一歩が、世界中の人々の安心と希望につながります。
          私たちの活動は、皆様のご支援によって支えられています。
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button
            variant="secondary"
            size="lg"
            onClick={onScrollToForm}
            className="bg-white text-amber-600 hover:bg-stone-50 border-0 shadow-xl px-12 py-4 text-lg"
          >
            今すぐ寄付する
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================
   Main Page Content
   ================================================ */
function DonatePageContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initialSelection: Partial<DonationSelection> = {
    frequency: (searchParams.get('frequency') as DonationFrequency) ?? undefined,
    amount: searchParams.get('amount') ? parseInt(searchParams.get('amount')!, 10) : undefined,
    purpose: (searchParams.get('purpose') as DonationPurpose) ?? undefined,
  };

  const [selection, setSelection] = useState<DonationSelection>({
    frequency: initialSelection.frequency ?? 'one_time',
    amount: initialSelection.amount ?? 5000,
    purpose: initialSelection.purpose ?? 'none',
  });

  const [customAmount, setCustomAmount] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleProceed = () => {
    const params = new URLSearchParams({
      frequency: selection.frequency,
      amount: selection.amount.toString(),
      purpose: selection.purpose,
    });
    window.location.href = `/donate/checkout?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header (same as top page) */}
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
            <img
              src={HEADER_LOGO_URL}
              alt="国際P-LP財団 公式ロゴ"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className={cn(
              'font-bold tracking-tight text-sm md:text-lg transition-colors',
              isScrolled ? 'text-stone-900' : 'text-white'
            )}>
              PLP財団
            </span>
          </Link>

          {/* Desktop Nav */}
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
                  isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-white/80 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={scrollToForm}
              className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-lg shadow-amber-500/25"
            >
              寄付する
            </Button>
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
            {[
              { label: 'ホーム', href: '/' },
              { label: '活動内容', href: '/activities' },
              { label: 'お知らせ', href: '/news' },
              { label: 'お問い合わせ', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-stone-700 font-medium border-b border-stone-100"
              >
                {item.label}
              </Link>
            ))}
            <button onClick={() => { setMobileMenuOpen(false); scrollToForm(); }} className="block mt-4 w-full">
              <Button variant="primary" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                寄付する
              </Button>
            </button>
          </motion.div>
        )}
      </motion.header>

      <main>
        {/* Hero */}
        <HeroSection
          selection={selection}
          setSelection={setSelection}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          onProceed={handleProceed}
          formRef={formRef}
          scrollToForm={scrollToForm}
        />

        {/* Stats */}
        <StatsSection />

        {/* Mobile Donation Form */}
        <section className="md:hidden py-8 px-4 bg-[#FFFBF5]" ref={formRef}>
          <DonateCard
            selection={selection}
            setSelection={setSelection}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            onProceed={handleProceed}
          />
        </section>

        {/* Impact */}
        <ImpactSection />

        {/* Activities */}
        <ActivitiesSection />

        {/* SDGs */}
        <SDGsSection />

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <CTASection onScrollToForm={scrollToForm} />
      </main>

      {/* Footer (same as top page) */}
      <footer className="bg-stone-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Footer Logo */}
          <div className="flex justify-center mb-12">
            <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="国際P-LP財団 公式ロゴ"
                className="h-16 md:h-20 w-auto max-w-[360px] md:max-w-[480px] object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={HEADER_LOGO_URL}
                  alt="国際P-LP財団 公式ロゴ"
                  className="w-10 h-10 object-contain brightness-0 invert"
                />
                <span className="text-lg font-bold text-white">PLP財団</span>
              </div>
              <p className="text-sm text-stone-400">
                平和を愛する人を増やすために
              </p>
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
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} PLP財団. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed CTA */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-stone-200 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-stone-500">寄付金額</p>
            <p className="text-lg font-bold text-stone-900">
              ¥{selection.amount.toLocaleString()}
              {selection.frequency === 'monthly' && (
                <span className="text-sm font-normal text-stone-500">/月</span>
              )}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleProceed}
            className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 px-6 py-3 shadow-lg shadow-amber-500/25"
          >
            寄付する
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-3 border-amber-200 border-t-amber-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      }
    >
      <DonatePageContent />
    </Suspense>
  );
}
