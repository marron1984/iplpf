'use client';

import { cn } from '@/lib/utils';

interface TrustBlockProps {
  className?: string;
}

export default function TrustBlock({ className }: TrustBlockProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            安心してご寄付いただくために
          </h2>
          <p className="text-lg text-slate-600">
            透明性と信頼性を大切にしています
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 運営情報 */}
          <div className="bg-white rounded-2xl ring-1 ring-slate-200/60 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-sky-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              運営団体
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              一般財団法人PLP財団
              <br />
              〒100-0001
              <br />
              東京都千代田区XXX
            </p>
            <a
              href="#"
              className="inline-flex items-center text-sm text-sky-600 hover:text-sky-700 font-medium group"
            >
              団体概要を見る
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* 規程・ポリシー */}
          <div className="bg-white rounded-2xl ring-1 ring-slate-200/60 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              規程・ポリシー
            </h3>
            <ul className="text-sm text-slate-600 space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sky-600 hover:text-sky-700 hover:underline"
                >
                  寄付金取扱規程
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sky-600 hover:text-sky-700 hover:underline"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sky-600 hover:text-sky-700 hover:underline"
                >
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div className="bg-white rounded-2xl ring-1 ring-slate-200/60 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-7 h-7 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              お問い合わせ
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <a
              href="mailto:info@iplpf.org"
              className="inline-flex items-center px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@iplpf.org
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
