'use client';

export default function TrustBlock() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          安心してご寄付いただくために
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 運営情報 */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">運営団体</h3>
            <p className="text-sm text-gray-600 mb-3">
              一般財団法人PLP財団
              <br />
              〒100-0001
              <br />
              東京都千代田区XXX
            </p>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              団体概要を見る →
            </a>
          </div>

          {/* 規程・ポリシー */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              規程・ポリシー
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  寄付金取扱規程
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
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
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              お問い合わせ
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <a
              href="mailto:info@iplpf.org"
              className="inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              info@iplpf.org
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
