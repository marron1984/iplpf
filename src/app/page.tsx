import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              平和を愛する人を増やす
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              PLP財団は、国連活動支援、平和推進、調査研究、支援活動を通じて、
              世界の平和構築に貢献しています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                寄付する
              </Link>
              <Link
                href="#activities"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                活動を見る
              </Link>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              私たちの活動
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: '平和推進',
                  description:
                    '平和教育プログラムの開発と普及を通じて、平和を愛する人を増やします。',
                  icon: '🕊️',
                },
                {
                  title: '国連活動支援',
                  description:
                    '国連機関と連携し、国際的な平和構築活動を支援しています。',
                  icon: '🌍',
                },
                {
                  title: '調査研究・提言',
                  description:
                    '平和構築に関する調査研究を行い、政策提言を行っています。',
                  icon: '📊',
                },
                {
                  title: '支援活動・災害復興',
                  description:
                    '被災地への緊急支援や復興支援活動を実施しています。',
                  icon: '🤝',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              あなたの支援が、世界を変える
            </h2>
            <p className="text-gray-600 mb-8">
              私たちの活動は、皆様のご支援によって支えられています。
              一緒に平和な世界をつくりましょう。
            </p>
            <Link
              href="/donate"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              寄付する
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
