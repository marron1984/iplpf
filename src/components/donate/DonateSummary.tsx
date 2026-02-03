'use client';

import Link from 'next/link';
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
    <div className="bg-gray-50 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">寄付内容</h3>
        {showEditButton && (
          <Link
            href={`/donate?${editParams.toString()}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            変更する
          </Link>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">寄付タイプ</span>
          <span className="text-sm font-medium text-gray-900">
            {FREQUENCY_LABELS[frequency]}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">金額</span>
          <span className="text-lg font-bold text-blue-600">
            {amount.toLocaleString()}円
            {frequency === 'monthly' && (
              <span className="text-sm font-normal text-gray-500">/月</span>
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">使い道</span>
          <span className="text-sm font-medium text-gray-900">
            {PURPOSE_LABELS[purpose]}
          </span>
        </div>
      </div>
    </div>
  );
}
