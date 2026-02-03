'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* 成功アイコン */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ご寄付ありがとうございます
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            あなたのご支援は、平和な世界の実現に向けた活動に
            <br className="hidden md:block" />
            大切に使わせていただきます。
          </p>

          {/* 受付番号 */}
          {referenceNumber && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">受付番号</p>
              <p className="text-2xl font-mono font-bold text-gray-900">
                {referenceNumber}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                お問い合わせの際にお伝えください
              </p>
            </div>
          )}

          {/* 領収書案内 */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-blue-900 mb-3">
              領収書について
            </h2>
            <p className="text-sm text-blue-800 leading-relaxed">
              ご登録いただいたメールアドレスに、寄付完了のご案内をお送りしました。
              <br />
              領収書が必要な場合は、メールに記載の手順に従ってお申し込みください。
              <br />
              また、
              <a
                href="mailto:info@iplpf.org"
                className="text-blue-600 hover:underline"
              >
                info@iplpf.org
              </a>
              までお問い合わせいただくことも可能です。
            </p>
          </div>

          {/* 次のアクション */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              次のステップ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="#"
                className="block p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                <h4 className="font-bold text-gray-900 mb-1">活動を見る</h4>
                <p className="text-sm text-gray-500">
                  最新の活動報告をご覧ください
                </p>
              </Link>

              <Link
                href="/donate?frequency=monthly"
                className="block p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                <h4 className="font-bold text-gray-900 mb-1">
                  毎月寄付に切り替える
                </h4>
                <p className="text-sm text-gray-500">
                  継続的なご支援をお願いします
                </p>
              </Link>
            </div>
          </div>

          {/* SNSシェア */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              この活動を広めていただけませんか？
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=PLP財団に寄付しました。平和な世界の実現に向けて、あなたも一緒に支援しませんか？&url=https://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={`https://line.me/R/msg/text/?PLP財団に寄付しました。%0Ahttps://iplpf.org/donate`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </a>
            </div>
          </div>

          {/* ホームへ戻る */}
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <ThanksPageContent />
    </Suspense>
  );
}
