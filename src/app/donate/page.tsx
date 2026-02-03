'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState, useEffect } from 'react';
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
} from '@/lib/iplpfAssets';

// Activity images for carousel/gallery
const IMAGES = {
  activities: MISSION_URL,
  hero: HERO_URL,
  sdgs: SDGS_URL,
  noto: NOTO_URL,
};

// Gallery images for display (using official images)
const GALLERY_IMAGES = [
  { src: HERO_URL, alt: 'PLP財団活動' },
  { src: MISSION_URL, alt: 'めざすもの' },
  { src: SDGS_URL, alt: 'SDGs取り組み' },
  { src: NOTO_URL, alt: '能登支援活動' },
  { src: HERO_URL, alt: '平和活動' },
  { src: MISSION_URL, alt: 'ミッション' },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Amount Card Component
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
        'relative p-5 md:p-6 rounded-2xl text-left transition-all duration-300',
        'border-2',
        isSelected
          ? 'border-amber-500 bg-amber-500 text-white shadow-xl shadow-amber-500/25'
          : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-lg'
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className={cn(
        'text-xl md:text-2xl font-bold tracking-tight',
        isSelected ? 'text-white' : 'text-stone-900'
      )}>
        ¥{amount.toLocaleString()}
      </span>
      {!isCustom && (
        <span className={cn(
          'block text-xs md:text-sm mt-1',
          isSelected ? 'text-white/80' : 'text-stone-500'
        )}>
          {amount === 3000 && '気軽に始める'}
          {amount === 5000 && '一番人気 ⭐'}
          {amount === 10000 && 'しっかり支援'}
          {amount === 30000 && '大きな力に'}
        </span>
      )}
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 md:top-3 md:right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

// Frequency Toggle
function FrequencyToggle({
  value,
  onChange,
}: {
  value: DonationFrequency;
  onChange: (v: DonationFrequency) => void;
}) {
  return (
    <div className="flex p-1.5 bg-stone-100 rounded-2xl">
      {(['one_time', 'monthly'] as const).map((freq) => (
        <motion.button
          key={freq}
          onClick={() => onChange(freq)}
          className={cn(
            'flex-1 py-3.5 px-4 rounded-xl text-sm font-semibold transition-colors relative',
            value === freq ? 'text-white' : 'text-stone-600 hover:text-stone-900'
          )}
          whileTap={{ scale: 0.98 }}
        >
          {value === freq && (
            <motion.div
              layoutId="frequency-bg"
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {freq === 'monthly' && <span className="text-xs">💝</span>}
            {FREQUENCY_LABELS[freq]}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Purpose Selector
function PurposeSelector({
  value,
  onChange,
}: {
  value: DonationPurpose;
  onChange: (v: DonationPurpose) => void;
}) {
  const purposes: DonationPurpose[] = ['none', 'peace', 'un_support', 'research', 'relief'];

  return (
    <div className="space-y-2">
      {purposes.map((purpose) => (
        <motion.button
          key={purpose}
          onClick={() => onChange(purpose)}
          className={cn(
            'w-full p-4 rounded-xl text-left transition-all duration-200',
            'border',
            value === purpose
              ? 'border-amber-500 bg-amber-50'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          )}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between">
            <span className={cn(
              'text-sm font-medium',
              value === purpose ? 'text-amber-700' : 'text-stone-600'
            )}>
              {PURPOSE_LABELS[purpose]}
            </span>
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              value === purpose ? 'border-amber-500 bg-amber-500' : 'border-stone-300'
            )}>
              {value === purpose && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

// Hero Background (single image)
function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <img
        src={HERO_URL}
        alt="PLP財団 トップイメージ"
        className="w-full h-full object-cover"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-transparent to-transparent" />
    </div>
  );
}

// Photo Grid Section
function PhotoGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {GALLERY_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          className={cn(
            'relative rounded-2xl overflow-hidden',
            i === 0 ? 'col-span-2 md:col-span-1 aspect-[4/3]' : 'aspect-square',
            i === 1 && 'md:row-span-2 md:aspect-auto'
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
}

// Main Page Content
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100"
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
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-base">PLP財団</span>
          </a>
          <Button variant="primary" size="sm" onClick={scrollToForm} className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-sm px-4 py-2">
            寄付する
          </Button>
        </div>
      </motion.header>

      <main className="pt-14 md:pt-16">
        {/* Hero Section with Image Carousel */}
        <section className="relative h-[85vh] md:h-[90vh] flex items-center overflow-hidden">
          <HeroBackground />

          <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 md:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-stone-700">現在 847 名の方が支援中</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 drop-shadow-lg"
            >
              子どもたちの
              <br />
              <span className="text-amber-300">笑顔</span>のために
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-base md:text-xl text-white/90 max-w-xl mx-auto mb-8 md:mb-12 drop-shadow"
            >
              あなたの支援が、アジアの子どもたちに
              <br className="hidden md:block" />
              教育と希望を届けます
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-xl shadow-amber-500/30 text-base md:text-lg px-8 md:px-12 py-4"
              >
                今すぐ寄付する
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust Stats */}
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                { value: '30年+', label: '活動実績' },
                { value: '5カ国', label: '支援地域' },
                { value: '10,000+', label: '支援者数' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-4xl font-bold text-amber-600">{stat.value}</p>
                  <p className="text-xs md:text-sm text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-12 md:py-20 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-8 md:mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                OUR ACTIVITIES
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-stone-900">
                世界各地での活動
              </motion.h2>
            </motion.div>

            <PhotoGrid />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-stone-500 text-sm mt-6"
            >
              カンボジア・フィリピン・ミャンマーなどで教育支援活動を展開
            </motion.p>
          </div>
        </section>

        {/* Donation Form Section */}
        <section ref={formRef} className="py-12 md:py-20 bg-white" id="donate-form">
          <div className="max-w-lg mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                寄付金額を選ぶ
              </h2>
              <p className="text-stone-500 text-sm">
                すべての寄付が子どもたちの未来を支えます
              </p>
            </motion.div>

            <motion.div
              className="bg-[#FFFBF5] rounded-3xl shadow-xl shadow-amber-100/50 p-6 md:p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Frequency */}
              <div className="mb-8">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">寄付の種類</label>
                <FrequencyToggle
                  value={selection.frequency}
                  onChange={(v) => setSelection((prev) => ({ ...prev, frequency: v }))}
                />
                {selection.frequency === 'monthly' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-amber-600 mt-3 flex items-center gap-1"
                  >
                    <span>💝</span> 毎月の継続支援で、安定した教育環境を届けられます
                  </motion.p>
                )}
              </div>

              {/* Amount */}
              <div className="mb-8">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">
                  金額を選択{selection.frequency === 'monthly' && ' (月額)'}
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {AMOUNT_CHIPS.map((amount) => (
                    <AmountCard
                      key={amount}
                      amount={amount}
                      isSelected={selection.amount === amount && !customAmount}
                      onClick={() => handleAmountSelect(amount)}
                    />
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium">¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="その他の金額を入力"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={cn(
                      'w-full pl-8 pr-4 py-4 rounded-xl border-2 text-lg font-semibold',
                      'transition-all duration-200 bg-white',
                      'placeholder:text-stone-400 placeholder:font-normal placeholder:text-base',
                      customAmount
                        ? 'border-amber-500 ring-4 ring-amber-500/10'
                        : 'border-stone-200 hover:border-stone-300'
                    )}
                  />
                </div>
              </div>

              {/* Purpose Toggle */}
              <div className="mb-8">
                <button
                  onClick={() => setShowPurpose(!showPurpose)}
                  className="flex items-center justify-between w-full py-3 text-left"
                >
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">使途を指定する（任意）</span>
                  <motion.svg
                    className="w-5 h-5 text-stone-400"
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
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">寄付金額</span>
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-bold">
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
                className="w-full bg-stone-900 hover:bg-stone-800 border-0 text-base py-4"
                onClick={handleProceed}
              >
                この金額で寄付する →
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-stone-200">
                {[
                  { icon: '🔒', text: 'SSL暗号化' },
                  { icon: '📄', text: '領収書発行' },
                  { icon: '💳', text: 'Stripe決済' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span>{badge.icon}</span>
                    {badge.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Section with Activities Image */}
        <section className="py-12 md:py-20 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-8 md:mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                YOUR IMPACT
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-stone-900">
                あなたの寄付でできること
              </motion.h2>
            </motion.div>

            {/* Activities Infographic */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-16 rounded-3xl overflow-hidden shadow-xl bg-white"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img
                  src={IMAGES.activities}
                  alt="P-LPIの主な活動内容"
                  className="w-full h-full object-contain bg-white p-4"
                />
              </div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  amount: '¥3,000',
                  impact: '教材キット1セット',
                  description: '子どもたちに学習教材を届けます',
                  emoji: '📚',
                },
                {
                  amount: '¥10,000',
                  impact: '1ヶ月の給食支援',
                  description: '栄養ある食事で健康な成長を',
                  emoji: '🍱',
                },
                {
                  amount: '¥30,000',
                  impact: '奨学金1ヶ月分',
                  description: '高等教育への道を開きます',
                  emoji: '🎓',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <span className="text-amber-600 font-bold text-sm">{item.amount}で</span>
                  <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2">{item.impact}</h3>
                  <p className="text-stone-500 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-8 md:mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                FAQ
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-stone-900">
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
                  a: 'はい、ご希望の方には領収書を発行いたします。寄付完了後にお送りするメールの案内に従ってお申し込みください。',
                },
                {
                  q: '毎月の寄付はいつでも解約できますか？',
                  a: 'はい、いつでも解約可能です。マイページまたはお問い合わせフォームからお手続きいただけます。',
                },
                {
                  q: '寄付金の使い道は？',
                  a: 'カンボジア、フィリピン、ミャンマーでの教育支援、給食支援、奨学金プログラムなどに使用されます。',
                },
                {
                  q: 'クレジットカード以外の支払い方法は？',
                  a: '現在はクレジットカードのみ対応しております。銀行振込をご希望の場合はお問い合わせください。',
                },
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <motion.div
            className="max-w-2xl mx-auto px-4 md:px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/30"
            >
              <img
                src={HERO_URL}
                alt="子どもたちの笑顔"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6"
            >
              一緒に、
              <br />
              未来を変えましょう
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/90 text-base md:text-lg mb-8 md:mb-10">
              あなたの一歩が、子どもたちの未来を照らします
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToForm}
                className="bg-white text-amber-600 hover:bg-stone-50 border-0 shadow-xl text-base md:text-lg px-8 md:px-12 py-4"
              >
                今すぐ寄付する
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 py-10 md:py-12">
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 border-t border-stone-800 pt-6">
            <div className="flex items-center gap-3">
              <img
                src={HEADER_LOGO_URL}
                alt="国際P-LP財団 公式ロゴ"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="text-white/80 font-medium">PLP財団</span>
            </div>
            <p className="text-stone-500 text-sm">
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
        <Button
          variant="primary"
          size="lg"
          onClick={scrollToForm}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-0 py-4"
        >
          今すぐ寄付する
        </Button>
      </motion.div>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-[#FFFBF5] rounded-2xl overflow-hidden"
    >
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
