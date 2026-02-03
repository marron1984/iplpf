'use client';

interface StickyBottomCTAProps {
  label?: string;
  onClick: () => void;
  amount?: number;
  className?: string;
}

export default function StickyBottomCTA({
  label = '今すぐ寄付する',
  onClick,
  amount,
  className = '',
}: StickyBottomCTAProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 ${className}`}
    >
      <div className="max-w-md mx-auto">
        {amount && amount > 0 && (
          <p className="text-center text-sm text-gray-600 mb-2">
            <span className="font-bold text-blue-600">
              {amount.toLocaleString()}円
            </span>
            を寄付
          </p>
        )}
        <button
          type="button"
          onClick={onClick}
          className="w-full py-3.5 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
