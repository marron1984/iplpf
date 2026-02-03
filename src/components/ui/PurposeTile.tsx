'use client';

import { cn } from '@/lib/utils';

interface PurposeTileProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export default function PurposeTile({
  icon,
  label,
  selected,
  onClick,
  className,
}: PurposeTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 border-2 min-h-[72px]',
        selected
          ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm'
          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50',
        className
      )}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
    </button>
  );
}
