'use client';

import { IMPACT_ITEMS } from '@/lib/donate/constants';

export default function ImpactGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          あなたの寄付でできること
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {IMPACT_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className="text-lg font-bold text-blue-600 mb-1">
                    {item.amount.toLocaleString()}円
                  </p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
