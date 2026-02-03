import Link from 'next/link';

export default function LplpfNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-slate-600 mb-8 max-w-md">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="space-y-4">
          <Link
            href="/lplpf/"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
          >
            ホームに戻る
          </Link>

          <div className="pt-8">
            <p className="text-sm text-slate-500 mb-4">または以下のページをご覧ください:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/lplpf/about-us/"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                私たちについて
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/lplpf/what-we-do/"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                活動内容
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/lplpf/projects/"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                プロジェクト
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/lplpf/contact/"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
