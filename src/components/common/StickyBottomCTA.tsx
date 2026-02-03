'use client';

import { cn } from '@/lib/utils';
import { FREQUENCY_LABELS } from '@/lib/donate/constants';
import { DonationFrequency } from '@/lib/donate/types';
import Button from '@/components/ui/Button';

interface StickyBottomCTAProps {
  label?: string;
  onClick: () => void;
  amount?: number;
  frequency?: DonationFrequency;
  className?: string;
}

export default function StickyBottomCTA({
  label = '今すぐ寄付する',
  onClick,
  amount,
  frequency = 'one_time',
  className = '',
}: StickyBottomCTAProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden',
        'bg-white/90 backdrop-blur-xl border-t border-stone-200',
        'p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      <div className="max-w-md mx-auto flex items-center gap-4">
        {/* 選択情報 */}
        {amount && amount > 0 && (
          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-500 truncate">
              {FREQUENCY_LABELS[frequency]}
            </p>
            <p className="text-xl font-bold text-stone-900">
              ¥{amount.toLocaleString()}
              {frequency === 'monthly' && (
                <span className="text-sm font-normal text-stone-500">/月</span>
              )}
            </p>
          </div>
        )}
        {/* CTAボタン */}
        <Button
          variant="primary"
          size="lg"
          onClick={onClick}
          className={cn(amount && amount > 0 ? 'flex-shrink-0' : 'w-full')}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
