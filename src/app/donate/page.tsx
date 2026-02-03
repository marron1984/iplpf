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
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_CAMBODIA_2,
  CHILD_CAMBODIA_3,
  CHILD_MYANMAR_1,
  CHILD_MYANMAR_2,
  CHILDREN_PHOTOS,
} from '@/lib/iplpfAssets';

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
        'relative p-4 md:p-5 rounded-xl text-left transition-all duration-300',
        'border-2',
        isSelected
          ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/25'
          : 'border-stone-200 bg-white hover:border-orange-300 hover:shadow-md'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className={cn(
        'text-lg md:text-xl font-bold tracking-tight',
        isSelected ? 'text-white' : 'text-stone-900'
      )}>
        ¥{amount.toLocaleString()}
      </span>
      {!isCustom && (
        <span className={cn(
          'block text-xs mt-1',
          isSelected ? 'text-white/80' : 'text-stone-500'
        )}>
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
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">
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
            'w-full p-3 rounded-lg text-left transition-all duration-200',
            'border',
            value === purpose
              ? 'border-orange-500 bg-orange-50'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          )}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between">
            <span className={cn(
              'text-sm font-medium',
              value === purpose ? 'text-orange-700' : 'text-stone-600'
            )}>
              {PURPOSE_LABELS[purpose]}
            </span>
            <div className={cn(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
              value === purpose ? 'border-orange-500 bg-orange-500' : 'border-stone-300'
            )}>
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

// Donation Card Component (Compact form for hero)
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
      className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 w-full max-w-md"
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
            className="text-xs text-orange-600 mt-2"
          >
            毎月の継続支援で、安定した教育環境を届けられます
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

        {/* Custom Amount */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">¥</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="その他の金額"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={cn(
              'w-full pl-7 pr-3 py-3 rounded-lg border-2 text-base font-semibold',
              'transition-all duration-200 bg-white',
              'placeholder:text-stone-400 placeholder:font-normal placeholder:text-sm',
              customAmount
                ? 'border-orange-500 ring-2 ring-orange-500/20'
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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-4 text-white">
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
      <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-stone-100">
        {[
          { icon: '🔒', text: 'SSL暗号化' },
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

// Photo Strip Component - Horizontal scrolling strip of children photos
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
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Duplicate photos for seamless loop */}
        {[...photos, ...photos].map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// Impact Cards with Children Photos
function ImpactSection() {
  const impacts = [
    {
      amount: '¥3,000',
      impact: '教材キット1セット',
      description: '子どもたちに学習教材を届けます',
      image: CHILD_CAMBODIA_1,
      country: 'カンボジア',
    },
    {
      amount: '¥10,000',
      impact: '1ヶ月の給食支援',
      description: '栄養ある食事で健康な成長を',
      image: CHILD_MYANMAR_1,
      country: 'ミャンマー',
    },
    {
      amount: '¥30,000',
      impact: '奨学金1ヶ月分',
      description: '高等教育への道を開きます',
      image: CHILD_PHILIPPINES_BOY,
      country: 'フィリピン',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-orange-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-8 md:mb-12"
        >
          <motion.p variants={fadeUp} className="text-orange-600 font-semibold text-sm mb-2">
            YOUR IMPACT
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-stone-900">
            あなたの寄付でできること
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Child Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.country}の子どもたち`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white/90 text-xs font-medium">{item.country}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <span className="text-orange-600 font-bold text-sm">{item.amount}で</span>
                <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2">{item.impact}</h3>
                <p className="text-stone-500 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Children Photo Gallery
function PhotoGallery() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-8 md:mb-12"
        >
          <motion.p variants={fadeUp} className="text-orange-600 font-semibold text-sm mb-2">
            OUR ACTIVITIES
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold text-stone-900">
            世界各地の子どもたち
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 mt-3 max-w-lg mx-auto">
            カンボジア・フィリピン・ミャンマーで教育支援活動を展開しています
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CHILDREN_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className={cn(
                'relative rounded-xl overflow-hidden group cursor-pointer',
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

// Stats Section
function StatsSection() {
  return (
    <section className="py-10 md:py-14 bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-8"
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
              <p className="text-3xl md:text-5xl font-bold text-orange-400">{stat.value}</p>
              <p className="text-sm md:text-base text-stone-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  return (
    <section className="py-12 md:py-20 bg-orange-50">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-8 md:mb-12"
        >
          <motion.p variants={fadeUp} className="text-orange-600 font-semibold text-sm mb-2">
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
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white rounded-xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-stone-900 pr-4 text-sm md:text-base">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-orange-500 text-xl flex-shrink-0 font-bold"
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

// Final CTA Section
function FinalCTASection({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-rose-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <motion.div
        className="max-w-2xl mx-auto px-4 md:px-6 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {/* Child photo circle */}
        <motion.div
          variants={fadeUp}
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl"
        >
          <img
            src={CHILD_PHILIPPINES_BOY}
            alt="フィリピンの男の子"
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
            onClick={onScrollToForm}
            className="bg-white text-orange-600 hover:bg-stone-50 border-0 shadow-xl text-base md:text-lg px-8 md:px-12 py-4"
          >
            今すぐ寄付する
          </Button>
        </motion.div>
      </motion.div>
    </section>
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
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100"
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
          <Button
            variant="primary"
            size="sm"
            onClick={scrollToForm}
            className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-sm px-4 py-2"
          >
            寄付する
          </Button>
        </div>
      </motion.header>

      <main className="pt-14 md:pt-16">
        {/* Hero Section - Child Photo Background + Donation Card */}
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
          {/* Background - Child Photo */}
          <div className="absolute inset-0">
            <img
              src={CHILD_PHILIPPINES_BOY}
              alt="フィリピンの男の子"
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 py-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Text Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs md:text-sm font-medium text-white">現在 847 名の方が支援中</span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  子どもたちの
                  <br />
                  <span className="text-orange-300">笑顔</span>のために
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-base md:text-lg text-white/90 max-w-md mb-8"
                >
                  あなたの支援が、アジアの子どもたちに教育と希望を届けます。
                  カンボジア、フィリピン、ミャンマーで活動しています。
                </motion.p>

                {/* Mobile CTA (hidden on desktop) */}
                <motion.div variants={fadeUp} className="md:hidden">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={scrollToForm}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 border-0 shadow-xl py-4"
                  >
                    今すぐ寄付する
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right - Donation Card (desktop) */}
              <div ref={formRef} className="hidden md:block">
                <DonateCard
                  selection={selection}
                  setSelection={setSelection}
                  customAmount={customAmount}
                  setCustomAmount={setCustomAmount}
                  onProceed={handleProceed}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Photo Strip */}
        <PhotoStrip />

        {/* Mobile Donation Form */}
        <section className="md:hidden py-8 px-4 bg-stone-50">
          <DonateCard
            selection={selection}
            setSelection={setSelection}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
            onProceed={handleProceed}
          />
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Impact Section with Children Photos */}
        <ImpactSection />

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA */}
        <FinalCTASection onScrollToForm={scrollToForm} />
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
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-stone-500">寄付金額</p>
            <p className="text-lg font-bold text-stone-900">
              ¥{selection.amount.toLocaleString()}
              {selection.frequency === 'monthly' && <span className="text-sm font-normal text-stone-500">/月</span>}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleProceed}
            className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 px-6 py-3"
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
            className="w-10 h-10 border-3 border-orange-200 border-t-orange-500 rounded-full"
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
