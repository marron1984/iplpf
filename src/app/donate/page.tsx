'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import { AMOUNT_CHIPS, PURPOSE_LABELS, FREQUENCY_LABELS } from '@/lib/donate/constants';
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
   Animation variants
   ================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

/* ================================================
   Amount Card
   ================================================ */
function AmountCard({
  amount,
  isSelected,
  onClick,
  isCustom = false,
}: {
  amount: number;
  isSelected: boolean;
  onClick: () => void;
  isCustom?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300',
        'border-2',
        isSelected
          ? 'border-blue-600 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span
        className={cn(
          'text-lg md:text-xl font-bold tracking-tight',
          isSelected ? 'text-white' : 'text-slate-900'
        )}
      >
        ¥{amount.toLocaleString()}
      </span>
      {!isCustom && (
        <span
          className={cn(
            'block text-xs mt-1',
            isSelected ? 'text-white/80' : 'text-slate-500'
          )}
        >
          {amount === 3000 && '気軽に始める'}
          {amount === 5000 && '一番人気'}
          {amount === 10000 && 'しっかり支援'}
          {amount === 30000 && '大きな力に'}
        </span>
      )}
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

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
    <div className="flex p-1 bg-slate-100 rounded-xl">
      {(['one_time', 'monthly'] as const).map((freq) => (
        <motion.button
          key={freq}
          onClick={() => onChange(freq)}
          className={cn(
            'flex-1 py-3 px-3 rounded-lg text-sm font-semibold transition-colors relative',
            value === freq ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          whileTap={{ scale: 0.98 }}
        >
          {value === freq && (
            <motion.div
              layoutId="frequency-bg"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg"
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
    un_support: '🏛️',
    research: '🔬',
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
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300 bg-white'
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
                  value === purpose ? 'text-blue-700' : 'text-slate-600'
                )}
              >
                {PURPOSE_LABELS[purpose]}
              </span>
            </div>
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                value === purpose ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
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
      className="bg-white rounded-3xl shadow-2xl p-5 md:p-7 w-full max-w-md border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center">
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
            className="text-xs text-blue-600 mt-2"
          >
            毎月の継続支援で、安定した活動基盤を支えられます
          </motion.p>
        )}
      </div>

      {/* Amount */}
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {AMOUNT_CHIPS.map((amount) => (
            <AmountCard
              key={amount}
              amount={amount}
              isSelected={selection.amount === amount && !customAmount}
              onClick={() => handleAmountSelect(amount)}
            />
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
            ¥
          </span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="その他の金額"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={cn(
              'w-full pl-7 pr-3 py-3 rounded-xl border-2 text-base font-semibold',
              'transition-all duration-200 bg-white',
              'placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm',
              customAmount
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-slate-200 hover:border-slate-300'
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
          <span className="text-xs font-medium text-slate-500">使途を指定（任意）</span>
          <motion.svg
            className="w-4 h-4 text-slate-400"
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
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-4 mb-4 text-white">
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
        className="w-full bg-slate-900 hover:bg-slate-800 border-0 text-base py-3"
        onClick={onProceed}
      >
        この金額で寄付する
      </Button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
        {[
          { icon: '🔒', text: 'SSL暗号化通信' },
          { icon: '🛡️', text: '安心・安全' },
          { icon: '📄', text: '領収書発行' },
        ].map((badge) => (
          <span key={badge.text} className="flex items-center gap-1 text-xs text-slate-400">
            <span>{badge.icon}</span>
            {badge.text}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ================================================
   Hero Section – Deep blue with globe imagery
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
      {/* Background */}
      <div className="absolute inset-0 gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Globe-like radial gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/20 via-teal-400/10 to-transparent blur-3xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 right-[20%] w-3 h-3 rounded-full bg-teal-400/60"
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-32 left-[15%] w-2 h-2 rounded-full bg-blue-300/60"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-[40%] right-[10%] w-4 h-4 rounded-full bg-amber-400/40"
            animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left – Text Content */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-white/90">
                安心・安全な寄付プラットフォーム
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              世界平和のための
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                国際協力
              </span>
              を
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/80 max-w-md mb-6 leading-relaxed">
              国際P-LP財団は、教育・研究・国際協力を通じて
              SDGsの達成と世界平和の実現に貢献しています。
              あなたの支援が、未来を変える力になります。
            </motion.p>

            {/* Key Values */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              {[
                { label: '安心・安全', icon: '🛡️' },
                { label: '世界協力', icon: '🌍' },
                { label: 'SDGs', icon: '🎯' },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10"
                >
                  <span>{tag.icon}</span>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* Mobile CTA */}
            <motion.div variants={fadeUp} className="md:hidden">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToForm}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 border-0 shadow-xl py-4 text-white"
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
   Trust & Security Section – 安心・安全
   ================================================ */
function TrustSection() {
  const trustItems = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'SSL暗号化通信',
      description: '全ての通信は256bit SSL暗号化により保護されています',
      color: 'blue',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      ),
      title: 'Stripe決済',
      description: '世界最高水準のセキュリティで安全にお支払い',
      color: 'teal',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      title: '領収書発行',
      description: '確定申告にも使用できる正式な領収書を発行',
      color: 'gold',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: '国際機関との連携',
      description: '国連諸機関と協力し透明性の高い運営を実施',
      color: 'blue',
    },
  ];

  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' },
    gold: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"/></svg>
            TRUST & SAFETY
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            安心・安全な寄付体験
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
            最高水準のセキュリティと透明性で、安心してご寄付いただけます
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {trustItems.map((item, i) => {
            const colors = colorMap[item.color as keyof typeof colorMap];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={cn(
                  'flex items-start gap-4 p-5 md:p-6 rounded-2xl border bg-white',
                  'hover:shadow-lg transition-all duration-300',
                  colors.border
                )}
              >
                <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center', colors.bg, colors.text)}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   Projects Section – 世界協力 (Bento Grid)
   ================================================ */
function ProjectsSection() {
  const projects = [
    {
      title: '平和推進プログラム',
      description: '教育や啓発活動を通じて、平和を愛する人々のネットワークを世界中に広げています。対話と相互理解を重視した平和構築に取り組んでいます。',
      image: HERO_URL,
      tag: 'Peace',
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      title: '国連活動支援',
      description: '国連諸機関と連携し、持続可能な開発目標（SDGs）の達成に向けた政策提言や活動を支援しています。',
      image: MISSION_URL,
      tag: 'UN Partnership',
      gradient: 'from-teal-500 to-blue-600',
    },
    {
      title: '調査研究・政策提言',
      description: '平和構築、国際協力、持続可能な開発に関する調査研究を実施し、政策立案に貢献する提言を行っています。',
      image: CHILD_CAMBODIA_1,
      tag: 'Research',
      gradient: 'from-indigo-600 to-purple-600',
    },
    {
      title: '支援活動・災害復興',
      description: '自然災害の被災地支援や開発途上国における教育・生活支援を通じて、人々の生活再建をサポートしています。',
      image: NOTO_URL,
      tag: 'Relief',
      gradient: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 mesh-gradient">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 text-xs font-semibold mb-4">
            🌍 GLOBAL COOPERATION
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            世界協力プロジェクト
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
            国際社会と連携し、平和で持続可能な世界の実現に向けて活動しています
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={cn(
                'group relative rounded-3xl overflow-hidden cursor-pointer',
                i === 0 ? 'md:row-span-2 min-h-[320px] md:min-h-[500px]' : 'min-h-[240px]'
              )}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={cn('absolute inset-0 bg-gradient-to-t', project.gradient, 'opacity-70 group-hover:opacity-80 transition-opacity duration-300')} />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-3 border border-white/10">
                  {project.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   SDGs Section
   ================================================ */
function SDGsSection() {
  const sdgGoals = [
    { num: 1, label: '貧困をなくそう', color: '#E5243B' },
    { num: 4, label: '質の高い教育をみんなに', color: '#C5192D' },
    { num: 10, label: '人や国の不平等をなくそう', color: '#DD1367' },
    { num: 16, label: '平和と公正をすべての人に', color: '#00689D' },
    { num: 17, label: 'パートナーシップで目標を達成しよう', color: '#19486A' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-50 to-transparent rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-blue-50 text-teal-600 text-xs font-semibold mb-4">
            🎯 SUSTAINABLE DEVELOPMENT GOALS
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            SDGsへの取り組み
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
            持続可能な開発目標の達成に向けて、多角的なアプローチで活動しています
          </motion.p>
        </motion.div>

        {/* SDGs Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14 rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-white p-6 md:p-8"
        >
          <img src={SDGS_URL} alt="SDGs ポスター" className="w-full max-w-3xl mx-auto h-auto object-contain" />
        </motion.div>

        {/* Focus SDG Goals */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {sdgGoals.map((goal) => (
            <motion.div
              key={goal.num}
              variants={fadeUp}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: goal.color }}
              >
                {goal.num}
              </div>
              <span className="text-xs font-medium text-slate-700 leading-tight">{goal.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   Impact Section with Children Photos
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
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold mb-4">
            YOUR IMPACT
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            あなたの寄付でできること
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
            一つ一つの支援が、子どもたちの未来を大きく変えます
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.country}の子どもたち`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white/90 text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                    {item.country}
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <span className="text-blue-600 font-bold text-sm">{item.amount}で</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{item.impact}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
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
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            OUR ACTIVITIES
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
            世界各地の活動
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-500 max-w-lg mx-auto">
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
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
   Stats Section
   ================================================ */
function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: '30年+', label: '活動実績' },
            { value: '5カ国', label: '支援地域' },
            { value: '10,000+', label: '支援者数' },
            { value: '17目標', label: 'SDGs貢献' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
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
    <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-slate-900 pr-4 text-sm md:text-base">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-blue-500 text-xl flex-shrink-0 font-bold"
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
              <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            FAQ
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-slate-900">
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
          {[
            {
              q: '領収書は発行されますか？',
              a: 'はい、ご希望の方には領収書を発行いたします。寄付完了後にお送りするメールの案内に従ってお申し込みください。確定申告等で必要な場合もご利用いただけます。',
            },
            {
              q: '毎月の寄付はいつでも解約できますか？',
              a: 'はい、いつでも解約可能です。マイページまたはお問い合わせフォームからお手続きいただけます。次回引き落とし日の5営業日前までにご連絡ください。',
            },
            {
              q: '寄付金の使い道は？',
              a: '平和推進、国連活動支援、調査研究・政策提言、支援活動・災害復興の4分野に使用されます。使途を指定することも、財団にお任せいただくことも可能です。',
            },
            {
              q: 'クレジットカード以外の支払い方法は？',
              a: '現在はクレジットカード（Visa, Mastercard, American Express, JCB）に対応しております。銀行振込をご希望の場合はお問い合わせください。',
            },
            {
              q: '法人として寄付できますか？',
              a: 'はい、法人様からのご寄付も承っております。寄付フォームで「法人」を選択し、法人名をご記入ください。法人様向けの領収書も発行可能です。',
            },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================
   Final CTA Section
   ================================================ */
function FinalCTASection({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <section className="py-20 md:py-32 gradient-cta relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div
        className="max-w-2xl mx-auto px-4 md:px-6 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {/* Icon cluster */}
        <motion.div variants={fadeUp} className="flex justify-center gap-3 mb-8">
          {['🛡️', '🌍', '🎯'].map((emoji, i) => (
            <motion.span
              key={emoji}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight"
        >
          一緒に、
          <br />
          未来を変えましょう
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
          あなたの一歩が、世界中の人々の安心と希望につながります。
          <br className="hidden md:block" />
          安全で透明な寄付を通じて、SDGsの達成に貢献しませんか。
        </motion.p>
        <motion.div variants={fadeUp}>
          <Button
            variant="secondary"
            size="lg"
            onClick={onScrollToForm}
            className="bg-white text-blue-700 hover:bg-slate-50 border-0 shadow-xl text-base md:text-lg px-8 md:px-12 py-4"
          >
            今すぐ寄付する
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================
   Photo Strip – Scrolling children photos
   ================================================ */
function PhotoStrip() {
  const photos = [
    { src: CHILD_PHILIPPINES_BOY, alt: 'フィリピンの男の子' },
    { src: CHILD_CAMBODIA_1, alt: 'カンボジアの子どもたち' },
    { src: CHILD_MYANMAR_1, alt: 'ミャンマーの子どもたち' },
    { src: CHILD_CAMBODIA_2, alt: 'カンボジアの子どもたち' },
    { src: CHILD_MYANMAR_2, alt: 'ミャンマーの子どもたち' },
    { src: CHILD_CAMBODIA_3, alt: 'カンボジアの子どもたち' },
  ];

  return (
    <section className="py-6 bg-white overflow-hidden">
      <motion.div
        className="flex gap-4 px-4"
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...photos, ...photos].map((photo, i) => (
          <div key={i} className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 md:gap-3">
            <img
              src={HEADER_LOGO_URL}
              alt="国際P-LP財団 公式ロゴ"
              className="h-8 md:h-10 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="font-bold text-slate-900 tracking-tight text-sm md:text-base">PLP財団</span>
          </a>
          <Button
            variant="primary"
            size="sm"
            onClick={scrollToForm}
            className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-sm px-4 py-2 text-white"
          >
            寄付する
          </Button>
        </div>
      </motion.header>

      <main className="pt-14 md:pt-16">
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

        {/* Photo Strip */}
        <PhotoStrip />

        {/* Mobile Donation Form */}
        <section className="md:hidden py-8 px-4 bg-slate-50" ref={formRef}>
          <DonateCard
            selection={selection}
            setSelection={setSelection}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            onProceed={handleProceed}
          />
        </section>

        {/* Trust & Safety */}
        <TrustSection />

        {/* Stats */}
        <StatsSection />

        {/* Projects – Global Cooperation */}
        <ProjectsSection />

        {/* SDGs */}
        <SDGsSection />

        {/* Impact */}
        <ImpactSection />

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* FAQ */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTASection onScrollToForm={scrollToForm} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Footer Logo */}
          <div className="flex justify-center mb-8">
            <a href="/" className="inline-flex items-center">
              <img
                src={OFFICIAL_LOGO_URL}
                alt="国際P-LP財団 公式ロゴ"
                className="h-12 md:h-16 w-auto max-w-[360px] object-contain"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
            <a href="/" className="hover:text-white transition-colors">トップページ</a>
            <a href="/about" className="hover:text-white transition-colors">私たちについて</a>
            <a href="/activities" className="hover:text-white transition-colors">活動内容</a>
            <a href="/contact" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-3">
              <img
                src={HEADER_LOGO_URL}
                alt="国際P-LP財団 公式ロゴ"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="text-white/80 font-medium">PLP財団</span>
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} 一般財団法人 国際P-LP財団. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed CTA */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-slate-500">寄付金額</p>
            <p className="text-lg font-bold text-slate-900">
              ¥{selection.amount.toLocaleString()}
              {selection.frequency === 'monthly' && (
                <span className="text-sm font-normal text-slate-500">/月</span>
              )}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleProceed}
            className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 px-6 py-3 text-white"
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
        <div className="min-h-screen bg-white flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-3 border-blue-200 border-t-blue-500 rounded-full"
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
