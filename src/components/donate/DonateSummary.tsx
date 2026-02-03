'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  DonationFrequency,
  DonationPurpose,
} from '@/lib/donate/types';
import {
  FREQUENCY_LABELS,
  PURPOSE_LABELS,
} from '@/lib/donate/constants';

interface DonateSummaryProps {
  frequency: DonationFrequency;
  amount: number;
  purpose: DonationPurpose;
  showEditButton?: boolean;
}

export default function DonateSummary({
  frequency,
  amount,
  purpose,
  showEditButton = true,
}: DonateSummaryProps) {
  const editParams = new URLSearchParams({
    frequency,
    amount: amount.toString(),
    purpose,
  });

  return (
    <div
      className={cn(
        'rounded-2xl p-6 mb-6',
        'bg-white/5 backdrop-blur-xl border border-white/10'
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-white">寄付内容</h3>
        {showEditButton && (
          <Link
            href={`/donate?${editParams.toString()}`}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            変更する
          </Link>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">寄付タイプ</span>
          <span className="text-sm font-medium text-white">
            {FREQUENCY_LABELS[frequency]}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">金額</span>
          <span className="text-xl font-bold gradient-text-blue">
            {amount.toLocaleString()}円
            {frequency === 'monthly' && (
              <span className="text-sm font-normal text-white/50">/月</span>
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/60">使い道</span>
          <span className="text-sm font-medium text-white">
            {PURPOSE_LABELS[purpose]}
          </span>
        </div>
      </div>
    </div>
  );
}
