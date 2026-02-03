'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/lib/donate/constants';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <div
      className={cn(
        'border-b border-white/10 last:border-b-0',
        'transition-colors duration-300'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <span
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300',
              isOpen
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={cn(
              'text-base font-medium transition-colors',
              isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
            )}
          >
            {question}
          </span>
        </div>
        <span
          className={cn(
            'flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300',
            isOpen
              ? 'bg-blue-500/20 text-blue-400 rotate-180'
              : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
          )}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-out',
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pl-12 pr-14">
          <p className="text-white/60 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FAQAccordionProps {
  className?: string;
}

export default function FAQAccordion({ className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn(className)}>
      {/* ヘッダー */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center px-4 py-2 rounded-full glass mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
          <span className="text-sm text-white/80">FAQ</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          よくある
          <span className="gradient-text">ご質問</span>
        </h2>
        <p className="text-lg text-white/60">
          寄付に関するご不明点にお答えします
        </p>
      </div>

      {/* アコーディオン */}
      <div
        className={cn(
          'max-w-3xl mx-auto rounded-2xl overflow-hidden',
          'bg-white/5 backdrop-blur-xl border border-white/10',
          'shadow-2xl shadow-black/20'
        )}
      >
        <div className="px-6 md:px-8">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
