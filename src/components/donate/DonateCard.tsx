'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import {
  AMOUNT_CHIPS,
  FREQUENCY_LABELS,
  MIN_AMOUNT,
  MAX_AMOUNT,
  ANALYTICS_EVENTS,
} from '@/lib/donate/constants';
import { trackEvent } from '@/lib/analytics';
import Button from '@/components/ui/Button';

const PURPOSE_OPTIONS = [
  { value: 'none' as const, label: '指定なし', icon: '💝' },
  { value: 'peace' as const, label: '平和推進', icon: '🕊️' },
  { value: 'un_support' as const, label: '国連支援', icon: '🌍' },
  { value: 'research' as const, label: '調査研究', icon: '📊' },
  { value: 'relief' as const, label: '支援活動', icon: '🤝' },
];

interface DonateCardProps {
  className?: string;
  initialSelection?: Partial<DonationSelection>;
  onSelectionChange?: (selection: DonationSelection) => void;
}

export default function DonateCard({
  className = '',
  initialSelection,
  onSelectionChange,
}: DonateCardProps) {
  const router = useRouter();
  const [frequency, setFrequency] = useState<DonationFrequency>(
    initialSelection?.frequency ?? 'one_time'
  );
  const [amount, setAmount] = useState<number>(
    initialSelection?.amount ?? 5000
  );
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [purpose, setPurpose] = useState<DonationPurpose>(
    initialSelection?.purpose ?? 'none'
  );

  const notifySelectionChange = useCallback(
    (newSelection: Partial<DonationSelection>) => {
      const selection: DonationSelection = {
        frequency: newSelection.frequency ?? frequency,
        amount: newSelection.amount ?? amount,
        purpose: newSelection.purpose ?? purpose,
      };
      onSelectionChange?.(selection);
    },
    [frequency, amount, purpose, onSelectionChange]
  );

  const handleFrequencyChange = useCallback(
    (newFrequency: DonationFrequency) => {
      setFrequency(newFrequency);
      trackEvent(ANALYTICS_EVENTS.SELECT_FREQUENCY, { frequency: newFrequency });
      notifySelectionChange({ frequency: newFrequency });
    },
    [notifySelectionChange]
  );

  const handleAmountSelect = useCallback(
    (newAmount: number) => {
      setAmount(newAmount);
      setIsCustomAmount(false);
      setCustomAmount('');
      trackEvent(ANALYTICS_EVENTS.SELECT_AMOUNT, { amount: newAmount });
      notifySelectionChange({ amount: newAmount });
    },
    [notifySelectionChange]
  );

  const handleCustomAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      setCustomAmount(value);
      setIsCustomAmount(true);
      if (value) {
        const numValue = parseInt(value, 10);
        setAmount(numValue);
        trackEvent(ANALYTICS_EVENTS.SELECT_AMOUNT, {
          amount: numValue,
          custom: true,
        });
        notifySelectionChange({ amount: numValue });
      }
    },
    [notifySelectionChange]
  );

  const handlePurposeChange = useCallback(
    (newPurpose: DonationPurpose) => {
      setPurpose(newPurpose);
      trackEvent(ANALYTICS_EVENTS.SELECT_PURPOSE, { purpose: newPurpose });
      notifySelectionChange({ purpose: newPurpose });
    },
    [notifySelectionChange]
  );

  const handleSubmit = useCallback(() => {
    const finalAmount = isCustomAmount ? parseInt(customAmount, 10) : amount;

    if (!finalAmount || finalAmount < MIN_AMOUNT || finalAmount > MAX_AMOUNT) {
      alert(
        `金額は${MIN_AMOUNT.toLocaleString()}円以上、${MAX_AMOUNT.toLocaleString()}円以下で入力してください`
      );
      return;
    }

    trackEvent(ANALYTICS_EVENTS.START_CHECKOUT, {
      frequency,
      amount: finalAmount,
      purpose,
    });

    const params = new URLSearchParams({
      frequency,
      amount: finalAmount.toString(),
      purpose,
    });

    router.push(`/donate/checkout?${params.toString()}`);
  }, [frequency, amount, purpose, customAmount, isCustomAmount, router]);

  const displayAmount = isCustomAmount
    ? customAmount
      ? parseInt(customAmount, 10)
      : 0
    : amount;

  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 md:p-8 overflow-hidden',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        'shadow-2xl shadow-black/20',
        className
      )}
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <div className="relative">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            寄付する
          </h3>
          <p className="text-sm text-white/50 mt-2">
            あなたの支援が平和を作ります
          </p>
        </div>

        {/* 寄付タイプ選択 */}
        <div className="mb-6">
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
            {(['one_time', 'monthly'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleFrequencyChange(key)}
                className={cn(
                  'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300',
                  frequency === key
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {FREQUENCY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* 金額選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            金額を選択
          </label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {AMOUNT_CHIPS.map((chipAmount) => (
              <button
                key={chipAmount}
                type="button"
                onClick={() => handleAmountSelect(chipAmount)}
                className={cn(
                  'py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 border',
                  !isCustomAmount && amount === chipAmount
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                )}
              >
                ¥{chipAmount.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="その他の金額を入力"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={() => setIsCustomAmount(true)}
              className={cn(
                'w-full h-12 px-4 rounded-xl border text-sm transition-all duration-300',
                'bg-white/5 text-white placeholder-white/30',
                'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                isCustomAmount && customAmount
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/10 hover:border-white/20'
              )}
            />
            {customAmount && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                円
              </span>
            )}
          </div>
        </div>

        {/* 使途選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            使い道を選択
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PURPOSE_OPTIONS.slice(0, 3).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePurposeChange(option.value)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 border min-h-[72px]',
                  purpose === option.value
                    ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                )}
              >
                <span className="text-xl mb-1">{option.icon}</span>
                <span className={cn(
                  'text-xs font-medium text-center leading-tight',
                  purpose === option.value ? 'text-blue-400' : 'text-white/60'
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {PURPOSE_OPTIONS.slice(3).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePurposeChange(option.value)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 border min-h-[72px]',
                  purpose === option.value
                    ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                )}
              >
                <span className="text-xl mb-1">{option.icon}</span>
                <span className={cn(
                  'text-xs font-medium text-center leading-tight',
                  purpose === option.value ? 'text-blue-400' : 'text-white/60'
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 確認表示 */}
        {displayAmount > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">
                {FREQUENCY_LABELS[frequency]}
              </span>
              <span className="text-2xl font-bold text-white">
                ¥{displayAmount.toLocaleString()}
                {frequency === 'monthly' && (
                  <span className="text-sm font-normal text-white/50">/月</span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <Button
          variant="glow"
          size="xl"
          onClick={handleSubmit}
          disabled={displayAmount < MIN_AMOUNT}
          className="w-full"
        >
          今すぐ寄付する
        </Button>

        <p className="mt-4 text-xs text-white/30 text-center">
          次のページで詳細を入力いただきます
        </p>
      </div>
    </div>
  );
}
