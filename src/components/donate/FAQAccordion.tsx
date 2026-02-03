'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/lib/donate/constants';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base font-medium text-slate-900 pr-4 group-hover:text-sky-600 transition-colors">
          {question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300',
            isOpen
              ? 'bg-sky-100 text-sky-600 rotate-180'
              : 'bg-slate-100 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500'
          )}
        >
          <svg
            className="w-4 h-4"
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
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        )}
      >
        <p className="text-slate-600 leading-relaxed pr-12 pl-0">
          {answer}
        </p>
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
    <section className={cn('py-16 md:py-24', className)}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            よくあるご質問
          </h2>
          <p className="text-lg text-slate-600">
            寄付に関するご不明点にお答えします
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200/60 px-6 md:px-8">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
