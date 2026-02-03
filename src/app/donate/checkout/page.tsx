'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DonateSummary from '@/components/donate/DonateSummary';
import DonorForm from '@/components/donate/DonorForm';
import {
  DonationFrequency,
  DonationPurpose,
  Donor,
  CreateCheckoutSessionRequest,
} from '@/lib/donate/types';
import { MIN_AMOUNT, MAX_AMOUNT } from '@/lib/donate/constants';

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLパラメータから寄付情報を取得
  const frequency =
    (searchParams.get('frequency') as DonationFrequency) ?? 'one_time';
  const amount = searchParams.get('amount')
    ? parseInt(searchParams.get('amount')!, 10)
    : 5000;
  const purpose =
    (searchParams.get('purpose') as DonationPurpose) ?? 'none';

  // フォーム状態
  const [donor, setDonor] = useState<Donor>({
    type: 'individual',
    name: '',
    email: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Donor, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // バリデーション
  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof Donor, string>> = {};

    if (!donor.name.trim()) {
      newErrors.name =
        donor.type === 'individual'
          ? 'お名前を入力してください'
          : '法人名を入力してください';
    }

    if (!donor.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [donor]);

  // 送信処理
  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }

    // 金額チェック
    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      setSubmitError(
        `金額は${MIN_AMOUNT.toLocaleString()}円以上、${MAX_AMOUNT.toLocaleString()}円以下で指定してください`
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const requestBody: CreateCheckoutSessionRequest = {
        frequency,
        amount,
        purpose,
        donor,
      };

      const response = await fetch('/api/donate/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '決済の初期化に失敗しました');
      }

      const data = await response.json();

      if (data.url) {
        // Stripe Checkoutにリダイレクト
        window.location.href = data.url;
      } else {
        throw new Error('決済URLの取得に失敗しました');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : '決済処理中にエラーが発生しました。しばらく経ってからお試しください。'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [frequency, amount, purpose, donor, validate]);

  // 金額が無効な場合は寄付ページに戻す
  if (!amount || amount < MIN_AMOUNT) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">寄付金額が設定されていません</p>
          <Link
            href="/donate"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            寄付ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* パンくず */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/donate" className="hover:text-blue-600">
                  寄付する
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">お支払い情報</li>
            </ol>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            お支払い情報の入力
          </h1>

          {/* 寄付サマリー */}
          <DonateSummary
            frequency={frequency}
            amount={amount}
            purpose={purpose}
          />

          {/* 寄付者情報フォーム */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              寄付者情報
            </h2>
            <DonorForm
              initialDonor={donor}
              onChange={setDonor}
              errors={errors}
            />
          </div>

          {/* 決済方法 */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              お支払い方法
            </h2>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <svg
                className="w-8 h-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">クレジットカード</p>
                <p className="text-sm text-gray-500">
                  Visa, Mastercard, American Express, JCB
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              決済処理はStripeを通じて安全に行われます。カード情報は当サイトでは保存されません。
            </p>
          </div>

          {/* 銀行振込案内 */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-medium">銀行振込をご希望の場合</span>
              <br />
              <a
                href="mailto:info@iplpf.org"
                className="text-blue-600 hover:underline"
              >
                info@iplpf.org
              </a>
              までお問い合わせください。
            </p>
          </div>

          {/* エラーメッセージ */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          )}

          {/* 送信ボタン */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                処理中...
              </>
            ) : (
              `${amount.toLocaleString()}円を寄付する`
            )}
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            「寄付する」ボタンをクリックすると、Stripeの決済ページに移動します。
            <br />
            決済完了後、確認メールをお送りします。
          </p>

          {/* キャンセルリンク */}
          <div className="mt-6 text-center">
            <Link
              href="/donate"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              キャンセルして戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
