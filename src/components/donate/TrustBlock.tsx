'use client';

import { cn } from '@/lib/utils';

interface TrustBlockProps {
  className?: string;
}

export default function TrustBlock({ className }: TrustBlockProps) {
  return (
    <div className={cn(className)}>
      {/* ヘッダー */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center px-4 py-2 rounded-full glass mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
          <span className="text-sm text-white/80">信頼と透明性</span>
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          安心してご寄付
          <span className="gradient-text">いただくために</span>
        </h2>
        <p className="text-lg text-white/60">
          透明性と信頼性を大切にしています
        </p>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 運営情報 */}
        <div
          className={cn(
            'relative rounded-2xl p-8 overflow-hidden',
            'bg-white/5 backdrop-blur-xl border border-white/10',
            'hover:bg-white/10 hover:border-white/20',
            'transition-all duration-500 group'
          )}
        >
          {/* アイコン */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-blue-400"
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
          <h3 className="text-xl font-bold text-white mb-4">
            運営団体
          </h3>
          <p className="text-white/50 mb-6 leading-relaxed text-sm">
            一般財団法人PLP財団
            <br />
            〒100-0001
            <br />
            東京都千代田区XXX
          </p>
          <a
            href="#"
            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-medium group/link"
          >
            団体概要を見る
            <svg
              className="w-4 h-4 ml-1 group-hover/link:translate-x-0.5 transition-transform"
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
        <div
          className={cn(
            'relative rounded-2xl p-8 overflow-hidden',
            'bg-white/5 backdrop-blur-xl border border-white/10',
            'hover:bg-white/10 hover:border-white/20',
            'transition-all duration-500 group'
          )}
        >
          {/* アイコン */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-emerald-400"
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
          <h3 className="text-xl font-bold text-white mb-4">
            規程・ポリシー
          </h3>
          <ul className="space-y-3">
            {['寄付金取扱規程', 'プライバシーポリシー', '特定商取引法に基づく表記'].map((text) => (
              <li key={text}>
                <a
                  href="#"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* お問い合わせ */}
        <div
          className={cn(
            'relative rounded-2xl p-8 overflow-hidden',
            'bg-white/5 backdrop-blur-xl border border-white/10',
            'hover:bg-white/10 hover:border-white/20',
            'transition-all duration-500 group'
          )}
        >
          {/* アイコン */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-purple-400"
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
          <h3 className="text-xl font-bold text-white mb-4">
            お問い合わせ
          </h3>
          <p className="text-white/50 mb-6 leading-relaxed text-sm">
            ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
          <a
            href="mailto:info@iplpf.org"
            className={cn(
              'inline-flex items-center px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300',
              'bg-white/5 border border-white/10 text-white/80',
              'hover:bg-white/10 hover:border-white/20 hover:text-white'
            )}
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
  );
}
