'use client';

import { cn } from '@/lib/utils';

interface AmountChipProps {
  amount: number;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export default function AmountChip({
  amount,
  selected,
  onClick,
  className,
}: AmountChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2',
        selected
          ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm'
          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
        className
      )}
    >
      ¥{amount.toLocaleString()}
    </button>
  );
}
