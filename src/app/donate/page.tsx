'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import { AMOUNT_CHIPS, PURPOSE_LABELS, FREQUENCY_LABELS } from '@/lib/donate/constants';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

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
        'relative p-6 rounded-2xl text-left transition-all duration-300',
        'border-2',
        isSelected
          ? 'border-stone-900 bg-stone-900 text-white shadow-xl'
          : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-lg'
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span className={cn(
        'text-2xl font-semibold tracking-tight',
        isSelected ? 'text-white' : 'text-stone-900'
      )}>
        ¥{amount.toLocaleString()}
      </span>
      {!isCustom && (
        <span className={cn(
          'block text-sm mt-1',
          isSelected ? 'text-white/70' : 'text-stone-500'
        )}>
          {amount === 3000 && '気軽に始める'}
          {amount === 5000 && '一番人気'}
          {amount === 10000 && 'しっかり支援'}
          {amount === 30000 && '大きな力に'}
        </span>
      )}
      {isSelected && (
        <motion.div
          className="absolute top-3 right-3"
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
    <div className="flex p-1 bg-stone-100 rounded-xl">
      {(['one_time', 'monthly'] as const).map((freq) => (
        <motion.button
          key={freq}
          onClick={() => onChange(freq)}
          className={cn(
            'flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-colors relative',
            value === freq ? 'text-white' : 'text-stone-600 hover:text-stone-900'
          )}
          whileTap={{ scale: 0.98 }}
        >
          {value === freq && (
            <motion.div
              layoutId="frequency-bg"
              className="absolute inset-0 bg-stone-900 rounded-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{FREQUENCY_LABELS[freq]}</span>
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
              ? 'border-stone-900 bg-stone-50'
              : 'border-stone-200 hover:border-stone-300 bg-white'
          )}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center justify-between">
            <span className={cn(
              'text-sm font-medium',
              value === purpose ? 'text-stone-900' : 'text-stone-600'
            )}>
              {PURPOSE_LABELS[purpose]}
            </span>
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              value === purpose ? 'border-stone-900 bg-stone-900' : 'border-stone-300'
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
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-subtle border-b border-stone-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">P</span>
            </div>
            <span className="font-semibold text-stone-900 tracking-tight">PLP財団</span>
          </a>
          <Button variant="primary" size="sm" onClick={scrollToForm}>
            寄付する
          </Button>
        </div>
      </motion.header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <motion.div
            className="max-w-3xl mx-auto px-6 text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-caption mb-6"
            >
              Donate to Peace
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-display text-5xl md:text-7xl text-stone-900 mb-8"
            >
              平和を、
              <br />
              <span className="font-semibold">贈る。</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-body text-lg md:text-xl max-w-xl mx-auto mb-12"
            >
              あなたの想いが、世界を変える力になります。
              <br className="hidden md:block" />
              一人ひとりの支援が、平和な未来を創ります。
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-stone-500"
            >
              {['30年以上の活動実績', '50ヶ国以上で展開', '10,000人以上の支援者'].map((text, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Donation Form Section */}
        <section ref={formRef} className="py-12 md:py-24">
          <div className="max-w-xl mx-auto px-6">
            <motion.div
              className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Frequency */}
              <div className="mb-10">
                <label className="text-caption block mb-4">寄付の種類</label>
                <FrequencyToggle
                  value={selection.frequency}
                  onChange={(v) => setSelection((prev) => ({ ...prev, frequency: v }))}
                />
              </div>

              {/* Amount */}
              <div className="mb-10">
                <label className="text-caption block mb-4">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">¥</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="その他の金額"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={cn(
                      'w-full pl-8 pr-4 py-4 rounded-xl border-2 text-lg font-medium',
                      'transition-all duration-200',
                      'placeholder:text-stone-400 placeholder:font-normal',
                      customAmount
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-300'
                    )}
                  />
                </div>
              </div>

              {/* Purpose Toggle */}
              <div className="mb-10">
                <button
                  onClick={() => setShowPurpose(!showPurpose)}
                  className="flex items-center justify-between w-full py-4 text-left"
                >
                  <span className="text-caption">使途を指定する（任意）</span>
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
                      <PurposeSelector
                        value={selection.purpose}
                        onChange={(v) => setSelection((prev) => ({ ...prev, purpose: v }))}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="bg-stone-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">合計</span>
                  <div className="text-right">
                    <span className="text-3xl font-semibold text-stone-900">
                      ¥{selection.amount.toLocaleString()}
                    </span>
                    {selection.frequency === 'monthly' && (
                      <span className="text-stone-500 text-sm ml-1">/月</span>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleProceed}
              >
                次へ進む
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-stone-100">
                {[
                  { icon: '🔒', text: 'SSL暗号化' },
                  { icon: '📄', text: '領収書発行' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{badge.icon}</span>
                    {badge.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 md:py-32 bg-stone-50/50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp} className="text-caption mb-4">
                Our Impact
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-heading text-3xl md:text-4xl text-stone-900">
                あなたの寄付が届ける未来
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
            >
              {[
                {
                  amount: '¥3,000',
                  impact: '教材キット1セット',
                  description: '平和教育プログラムの教材を子どもたちに届けます',
                },
                {
                  amount: '¥10,000',
                  impact: '調査活動1日分',
                  description: '平和構築に関する調査研究活動を支援します',
                },
                {
                  amount: '¥30,000',
                  impact: '国連活動への参加支援',
                  description: '国連での提言活動やイベント参加を支援します',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-indigo-600 font-semibold text-sm">{item.amount}</span>
                  <h3 className="text-heading text-xl text-stone-900 mt-2 mb-3">{item.impact}</h3>
                  <p className="text-body text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.p variants={fadeUp} className="text-caption mb-4">
                FAQ
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-heading text-3xl text-stone-900">
                よくある質問
              </motion.h2>
            </motion.div>

            <motion.div
              className="space-y-4"
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
                  a: '平和推進活動、国連活動支援、調査研究、緊急支援など、設立趣旨に沿った活動に使用されます。使途指定も可能です。',
                },
                {
                  q: 'クレジットカード以外の支払い方法は？',
                  a: '現在はクレジットカードのみ対応しております。銀行振込をご希望の場合はお問い合わせください。',
                },
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 bg-stone-900">
          <motion.div
            className="max-w-2xl mx-auto px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-display text-4xl md:text-5xl text-white mb-6"
            >
              一緒に、平和な
              <br />
              世界を創りましょう
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-400 text-lg mb-10">
              あなたの一歩が、大きな変化の始まりです
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToForm}
                className="bg-white text-stone-900 hover:bg-stone-100"
              >
                今すぐ寄付する
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">P</span>
              </div>
              <span className="text-white/80 font-medium">PLP財団</span>
            </div>
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} PLP財団. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-stone-900 pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-stone-400 text-xl flex-shrink-0"
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
            <div className="px-6 pb-5">
              <p className="text-body text-sm">{answer}</p>
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
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full"
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
