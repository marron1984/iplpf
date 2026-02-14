'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import {
  AMOUNT_CHIPS,
  PURPOSE_LABELS,
  FREQUENCY_LABELS,
  FAQ_ITEMS,
  IMPACT_ITEMS,
} from '@/lib/donate/constants';
import { cn } from '@/lib/utils';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import {
  HERO_URL,
  CHILD_PHILIPPINES_BOY,
  CHILD_CAMBODIA_1,
  CHILD_MYANMAR_1,
} from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AmountCard({
  amount,
  selected,
  onClick,
}: {
  amount: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative p-4 md:p-5 rounded-xl text-left transition-all duration-200 border-2',
        selected
          ? 'border-[#0052A4] bg-[#0052A4] text-white shadow-lg shadow-blue-900/20'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
      )}
    >
      <span className={cn('text-lg md:text-xl font-bold', selected ? 'text-white' : 'text-slate-900')}>
        ¥{amount.toLocaleString()}
      </span>
      <span className={cn('block text-xs mt-1', selected ? 'text-white/80' : 'text-slate-500')}>
        {amount === 3000 && '気軽に始める'}
        {amount === 5000 && '一番人気'}
        {amount === 10000 && 'しっかり支援'}
        {amount === 30000 && '大きな力に'}
      </span>
    </button>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <svg
          className={cn('w-5 h-5 text-slate-400 shrink-0 transition-transform', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DonateContent() {
  const searchParams = useSearchParams();
  const [selection, setSelection] = useState<DonationSelection>({
    frequency: (searchParams.get('freq') as DonationFrequency) || 'one_time',
    amount: Number(searchParams.get('amount')) || 5000,
    purpose: (searchParams.get('purpose') as DonationPurpose) || 'none',
  });
  const [customAmount, setCustomAmount] = useState('');

  const isCustom = !AMOUNT_CHIPS.includes(selection.amount as typeof AMOUNT_CHIPS[number]);
  const currentAmount = isCustom ? customAmount : '';

  const handleAmountSelect = (amount: number) => {
    setSelection((s) => ({ ...s, amount }));
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setCustomAmount(value);
    if (!isNaN(num) && num >= 1000) {
      setSelection((s) => ({ ...s, amount: num }));
    }
  };

  const canProceed = selection.amount >= 1000;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_URL} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-[#F8FAFC]" />
          </div>

          <motion.div
            className="relative max-w-3xl mx-auto px-4 text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-[#0052A4] font-semibold text-sm mb-3">DONATE</motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              あなたの想いを届ける
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-600 max-w-xl mx-auto">
              いただいたご寄付は、世界の平和構築と子どもたちの未来のために大切に使わせていただきます。
            </motion.p>
          </motion.div>
        </section>

        {/* Children Photos */}
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[CHILD_PHILIPPINES_BOY, CHILD_CAMBODIA_1, CHILD_MYANMAR_1].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-2xl overflow-hidden aspect-[4/3]"
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-2xl mx-auto px-4">
            {/* Frequency */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">寄付の種類</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['one_time', 'monthly'] as DonationFrequency[]).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setSelection((s) => ({ ...s, frequency: freq }))}
                    className={cn(
                      'py-3 rounded-xl font-medium text-sm transition-all border-2',
                      selection.frequency === freq
                        ? 'border-[#0052A4] bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                    )}
                  >
                    {FREQUENCY_LABELS[freq]}
                    {freq === 'monthly' && (
                      <span className="block text-xs mt-0.5 opacity-70">継続的な支援</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">金額を選ぶ</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {AMOUNT_CHIPS.map((amount) => (
                  <AmountCard
                    key={amount}
                    amount={amount}
                    selected={selection.amount === amount && !isCustom}
                    onClick={() => handleAmountSelect(amount)}
                  />
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">¥</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="その他の金額（1,000円以上）"
                  value={currentAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className={cn(
                    'w-full pl-8 pr-4 py-3 rounded-xl border-2 text-slate-900 placeholder:text-slate-400 transition-colors',
                    isCustom ? 'border-[#0052A4] bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                  )}
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">使途を選ぶ</h2>
              <div className="grid grid-cols-1 gap-2">
                {(Object.entries(PURPOSE_LABELS) as [DonationPurpose, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelection((s) => ({ ...s, purpose: key }))}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border-2',
                      selection.purpose === key
                        ? 'border-[#0052A4] bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        selection.purpose === key ? 'border-[#0052A4]' : 'border-slate-300'
                      )}
                    >
                      {selection.purpose === key && <div className="w-2.5 h-2.5 rounded-full bg-[#0052A4]" />}
                    </div>
                    <span className={cn('text-sm font-medium', selection.purpose === key ? 'text-blue-700' : 'text-slate-700')}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary + Proceed */}
            <div className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-100 p-6 mb-8">
              <h3 className="font-bold text-slate-900 mb-4">寄付内容</h3>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">種類</span>
                  <span className="font-medium text-slate-900">{FREQUENCY_LABELS[selection.frequency]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">金額</span>
                  <span className="font-bold text-[#0052A4] text-lg">¥{selection.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">使途</span>
                  <span className="font-medium text-slate-900">{PURPOSE_LABELS[selection.purpose]}</span>
                </div>
              </div>

              <Link
                href={canProceed ? `/donate/checkout?freq=${selection.frequency}&amount=${selection.amount}&purpose=${selection.purpose}` : '#'}
                className={cn(
                  'block w-full text-center py-4 rounded-xl font-bold text-base transition-all',
                  canProceed
                    ? 'bg-[#0052A4] text-white shadow-lg shadow-blue-900/20 hover:bg-[#003d7a]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                )}
                onClick={(e) => !canProceed && e.preventDefault()}
              >
                この内容で次へ進む
              </Link>
            </div>

            {/* Impact */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-slate-900 mb-4">あなたの寄付でできること</h2>
              <div className="grid grid-cols-2 gap-3">
                {IMPACT_ITEMS.map((item) => (
                  <div key={item.amount} className="bg-white rounded-xl p-4 ring-1 ring-slate-100">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-[#0052A4] font-bold text-sm mb-1">¥{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-slate-900 mb-4">よくある質問</h2>
              <div className="bg-white rounded-2xl ring-1 ring-slate-100 px-5">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <DonateContent />
    </Suspense>
  );
}
