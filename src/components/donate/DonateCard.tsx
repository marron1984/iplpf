'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  DonationFrequency,
  DonationPurpose,
  DonationSelection,
} from '@/lib/donate/types';
import {
  AMOUNT_CHIPS,
  FREQUENCY_LABELS,
  PURPOSE_LABELS,
  MIN_AMOUNT,
  MAX_AMOUNT,
  ANALYTICS_EVENTS,
} from '@/lib/donate/constants';
import { trackEvent } from '@/lib/analytics';

interface DonateCardProps {
  className?: string;
  initialSelection?: Partial<DonationSelection>;
}

export default function DonateCard({
  className = '',
  initialSelection,
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

  const handleFrequencyChange = useCallback((newFrequency: DonationFrequency) => {
    setFrequency(newFrequency);
    trackEvent(ANALYTICS_EVENTS.SELECT_FREQUENCY, { frequency: newFrequency });
  }, []);

  const handleAmountSelect = useCallback((newAmount: number) => {
    setAmount(newAmount);
    setIsCustomAmount(false);
    setCustomAmount('');
    trackEvent(ANALYTICS_EVENTS.SELECT_AMOUNT, { amount: newAmount });
  }, []);

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
      }
    },
    []
  );

  const handlePurposeChange = useCallback((newPurpose: DonationPurpose) => {
    setPurpose(newPurpose);
    trackEvent(ANALYTICS_EVENTS.SELECT_PURPOSE, { purpose: newPurpose });
  }, []);

  const handleSubmit = useCallback(() => {
    const finalAmount = isCustomAmount ? parseInt(customAmount, 10) : amount;

    if (!finalAmount || finalAmount < MIN_AMOUNT || finalAmount > MAX_AMOUNT) {
      alert(`金額は${MIN_AMOUNT.toLocaleString()}円以上、${MAX_AMOUNT.toLocaleString()}円以下で入力してください`);
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
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">寄付する</h3>

      {/* 寄付タイプ選択 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          寄付タイプ
        </label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(Object.keys(FREQUENCY_LABELS) as DonationFrequency[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleFrequencyChange(key)}
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                frequency === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {FREQUENCY_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* 金額選択 */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          金額
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {AMOUNT_CHIPS.map((chipAmount) => (
            <button
              key={chipAmount}
              type="button"
              onClick={() => handleAmountSelect(chipAmount)}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-colors border ${
                !isCustomAmount && amount === chipAmount
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {chipAmount.toLocaleString()}円
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="その他の金額"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onFocus={() => setIsCustomAmount(true)}
            className={`w-full py-2.5 px-4 rounded-lg border text-sm transition-colors ${
              isCustomAmount && customAmount
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {customAmount && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              円
            </span>
          )}
        </div>
      </div>

      {/* 使途選択 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          使い道
        </label>
        <div className="space-y-2">
          {(Object.keys(PURPOSE_LABELS) as DonationPurpose[]).map((key) => (
            <label
              key={key}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                purpose === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="purpose"
                value={key}
                checked={purpose === key}
                onChange={() => handlePurposeChange(key)}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  purpose === key ? 'border-blue-600' : 'border-gray-300'
                }`}
              >
                {purpose === key && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </span>
              <span
                className={`text-sm ${
                  purpose === key ? 'text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {PURPOSE_LABELS[key]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 確認表示 */}
      {displayAmount > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {FREQUENCY_LABELS[frequency]}：
            <span className="font-bold text-gray-900">
              {displayAmount.toLocaleString()}円
            </span>
            {frequency === 'monthly' && '/月'}
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={displayAmount < MIN_AMOUNT}
        className="w-full py-3.5 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        今すぐ寄付する
      </button>

      <p className="mt-3 text-xs text-gray-500 text-center">
        次のページで詳細を入力いただきます
      </p>
    </div>
  );
}
