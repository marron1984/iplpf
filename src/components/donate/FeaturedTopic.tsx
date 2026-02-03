'use client';

interface FeaturedTopicProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
}

export default function FeaturedTopic({
  title = '今月の注力テーマ',
  description = '現在、国連総会に向けた政策提言活動に注力しています。平和構築に関する調査研究をもとに、実効性のある提言を行うための準備を進めています。',
  imageUrl = '/featured-topic.jpg',
  linkUrl = '#',
}: FeaturedTopicProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gray-200 min-h-[200px] md:min-h-[280px] flex items-center justify-center">
              {/* プレースホルダー画像 */}
              <div className="text-gray-400 text-center p-4">
                <svg
                  className="w-16 h-16 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">画像を設定予定</span>
              </div>
            </div>
            <div className="md:w-3/5 p-6 md:p-8">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                国連活動支援
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                国連総会に向けた政策提言活動
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
              <a
                href={linkUrl}
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                詳しく見る
                <svg
                  className="w-4 h-4 ml-1"
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
          </div>
        </div>
      </div>
    </section>
  );
}
