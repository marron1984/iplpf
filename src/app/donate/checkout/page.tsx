'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DonateSummary from '@/components/donate/DonateSummary';
import DonorForm from '@/components/donate/DonorForm';
import Button from '@/components/ui/Button';
import {
  DonationFrequency,
  DonationPurpose,
  Donor,
  CreateCheckoutSessionRequest,
} from '@/lib/donate/types';
import { MIN_AMOUNT, MAX_AMOUNT } from '@/lib/donate/constants';

function CheckoutPageContent() {
  const searchParams = useSearchParams();

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
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">寄付金額が設定されていません</p>
          <Link
            href="/donate"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            寄付ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Header />

      {/* 背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[80px]" />
      </div>

      <main className="relative pt-24 pb-12 md:py-32">
        <div className="max-w-2xl mx-auto px-4">
          {/* パンくず */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/donate" className="hover:text-blue-400 transition-colors">
                  寄付する
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-white font-medium">お支払い情報</li>
            </ol>
          </nav>

          {/* ヘッダー */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              お支払い情報の
              <span className="gradient-text">入力</span>
            </h1>
            <p className="text-white/60">
              決済はStripeを通じて安全に処理されます
            </p>
          </div>

          {/* 寄付サマリー */}
          <DonateSummary
            frequency={frequency}
            amount={amount}
            purpose={purpose}
          />

          {/* 寄付者情報フォーム */}
          <div
            className={cn(
              'rounded-2xl p-6 md:p-8 mb-6',
              'bg-white/5 backdrop-blur-xl border border-white/10'
            )}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              寄付者情報
            </h2>
            <DonorForm
              initialDonor={donor}
              onChange={setDonor}
              errors={errors}
            />
          </div>

          {/* 決済方法 */}
          <div
            className={cn(
              'rounded-2xl p-6 md:p-8 mb-6',
              'bg-white/5 backdrop-blur-xl border border-white/10'
            )}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              お支払い方法
            </h2>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">クレジットカード</p>
                <p className="text-sm text-white/50">
                  Visa, Mastercard, American Express, JCB
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-white/40">
              決済処理はStripeを通じて安全に行われます。カード情報は当サイトでは保存されません。
            </p>
          </div>

          {/* 銀行振込案内 */}
          <div className="rounded-2xl p-5 mb-6 bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <span className="font-medium">銀行振込をご希望の場合</span>
              <br />
              <a
                href="mailto:info@iplpf.org"
                className="text-blue-400 hover:underline"
              >
                info@iplpf.org
              </a>
              までお問い合わせください。
            </p>
          </div>

          {/* エラーメッセージ */}
          {submitError && (
            <div className="rounded-2xl p-5 mb-6 bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          {/* 送信ボタン */}
          <Button
            variant="glow"
            size="xl"
            onClick={handleSubmit}
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full"
          >
            {amount.toLocaleString()}円を寄付する
          </Button>

          <p className="mt-6 text-xs text-white/40 text-center">
            「寄付する」ボタンをクリックすると、Stripeの決済ページに移動します。
            <br />
            決済完了後、確認メールをお送りします。
          </p>

          {/* キャンセルリンク */}
          <div className="mt-8 text-center">
            <Link
              href="/donate"
              className="text-sm text-white/50 hover:text-white/70 transition-colors"
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
        <div className="min-h-screen bg-[#030712] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
            <p className="text-sm text-white/40">読み込み中...</p>
          </div>
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
