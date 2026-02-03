'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/donate/constants';

function ThanksPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // 受付番号の短縮表示（最初の8文字）
  const referenceNumber = sessionId ? sessionId.slice(0, 8).toUpperCase() : null;

  // 寄付完了イベントをトラック
  useEffect(() => {
    if (sessionId) {
      trackEvent(ANALYTICS_EVENTS.COMPLETE, {
        session_id: sessionId,
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Header />

      {/* 背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[100px]" />
      </div>

      <main className="relative pt-24 pb-12 md:py-32">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* 成功アイコン */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            ご寄付
            <span className="gradient-text">ありがとうございます</span>
          </h1>

          <p className="text-lg text-white/60 mb-12 leading-relaxed">
            あなたのご支援は、平和な世界の実現に向けた活動に
            <br className="hidden md:block" />
            大切に使わせていただきます。
          </p>

          {/* 受付番号 */}
          {referenceNumber && (
            <div
              className={cn(
                'rounded-2xl p-8 mb-10',
                'bg-white/5 backdrop-blur-xl border border-white/10'
              )}
            >
              <p className="text-sm text-white/50 mb-3">受付番号</p>
              <p className="text-3xl font-mono font-bold gradient-text-blue">
                {referenceNumber}
              </p>
              <p className="text-xs text-white/40 mt-3">
                お問い合わせの際にお伝えください
              </p>
            </div>
          )}

          {/* 領収書案内 */}
          <div
            className={cn(
              'rounded-2xl p-6 mb-10 text-left',
              'bg-blue-500/10 border border-blue-500/20'
            )}
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              領収書について
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              ご登録いただいたメールアドレスに、寄付完了のご案内をお送りしました。
              <br />
              領収書が必要な場合は、メールに記載の手順に従ってお申し込みください。
              <br />
              また、
              <a
                href="mailto:info@iplpf.org"
                className="text-blue-400 hover:underline"
              >
                info@iplpf.org
              </a>
              までお問い合わせいただくことも可能です。
            </p>
          </div>

          {/* 次のアクション */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6">
              次のステップ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="#"
                className={cn(
                  'block p-6 rounded-2xl text-left group',
                  'bg-white/5 backdrop-blur-xl border border-white/10',
                  'hover:bg-white/10 hover:border-white/20 transition-all duration-300'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">活動を見る</h4>
                <p className="text-sm text-white/50">
                  最新の活動報告をご覧ください
                </p>
              </Link>

              <Link
                href="/donate?frequency=monthly"
                className={cn(
                  'block p-6 rounded-2xl text-left group',
                  'bg-white/5 backdrop-blur-xl border border-white/10',
                  'hover:bg-white/10 hover:border-white/20 transition-all duration-300'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">
                  毎月寄付に切り替える
                </h4>
                <p className="text-sm text-white/50">
                  継続的なご支援をお願いします
                </p>
              </Link>
            </div>
          </div>

          {/* SNSシェア */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 mb-6">
              この活動を広めていただけませんか？
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=PLP財団に寄付しました。平和な世界の実現に向けて、あなたも一緒に支援しませんか？&url=https://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                  'bg-white/5 border border-white/10 text-white/60',
                  'hover:bg-white/10 hover:border-white/20 hover:text-white'
                )}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                  'bg-white/5 border border-white/10 text-white/60',
                  'hover:bg-white/10 hover:border-white/20 hover:text-white'
                )}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://line.me/R/msg/text/?PLP財団に寄付しました。%0Ahttps://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                  'bg-white/5 border border-white/10 text-white/60',
                  'hover:bg-white/10 hover:border-white/20 hover:text-white'
                )}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
            </div>
          </div>

          {/* ホームへ戻る */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              トップページへ戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
            <p className="text-sm text-white/40">読み込み中...</p>
          </div>
        </div>
      }
    >
      <ThanksPageContent />
    </Suspense>
  );
}
