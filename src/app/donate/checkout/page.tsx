'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Logo URL
const LOGO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/左上ロゴマーク.png';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import {
  DonationFrequency,
  DonationPurpose,
  Donor,
  DonorType,
  CreateCheckoutSessionRequest,
} from '@/lib/donate/types';
import { MIN_AMOUNT, MAX_AMOUNT, FREQUENCY_LABELS, PURPOSE_LABELS, DONOR_TYPE_LABELS } from '@/lib/donate/constants';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Input component with zen styling
function ZenInput({
  label,
  required = false,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <motion.div
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            'w-full px-4 py-3.5 rounded-xl border-2 text-stone-900',
            'transition-all duration-200 outline-none',
            'placeholder:text-stone-400',
            error
              ? 'border-red-300 bg-red-50/50'
              : isFocused
                ? 'border-stone-900 bg-white'
                : 'border-stone-200 bg-white hover:border-stone-300'
          )}
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Textarea component
function ZenTextarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        {label}
        <span className="text-stone-400 font-normal ml-2">（任意）</span>
      </label>
      <motion.div
        animate={{ scale: isFocused ? 1.005 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <textarea
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            'w-full px-4 py-3.5 rounded-xl border-2 text-stone-900 resize-none',
            'transition-all duration-200 outline-none',
            'placeholder:text-stone-400',
            isFocused
              ? 'border-stone-900 bg-white'
              : 'border-stone-200 bg-white hover:border-stone-300'
          )}
        />
      </motion.div>
    </div>
  );
}

function CheckoutPageContent() {
  const searchParams = useSearchParams();

  // URLパラメータから寄付情報を取得
  const frequency = (searchParams.get('frequency') as DonationFrequency) ?? 'one_time';
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount')!, 10) : 5000;
  const purpose = (searchParams.get('purpose') as DonationPurpose) ?? 'none';

  // フォーム状態
  const [donorType, setDonorType] = useState<DonorType>('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // バリデーション
  const validate = useCallback((): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = donorType === 'individual'
        ? 'お名前を入力してください'
        : '法人名を入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, donorType]);

  // 送信処理
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      setSubmitError(`金額は${MIN_AMOUNT.toLocaleString()}円以上、${MAX_AMOUNT.toLocaleString()}円以下で指定してください`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const donor: Donor = {
        type: donorType,
        name,
        email,
        address: '',
        message,
      };

      const requestBody: CreateCheckoutSessionRequest = {
        frequency,
        amount,
        purpose,
        donor,
      };

      const response = await fetch('/api/donate/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '決済の初期化に失敗しました');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('決済URLの取得に失敗しました');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setSubmitError(error instanceof Error ? error.message : '決済処理中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  }, [frequency, amount, purpose, donorType, name, email, message, validate]);

  // 金額が無効な場合
  if (!amount || amount < MIN_AMOUNT) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">寄付金額が設定されていません</p>
          <Link href="/donate" className="text-indigo-600 hover:text-indigo-700 font-medium">
            寄付ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-subtle border-b border-stone-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src={LOGO_URL}
                alt="PLP財団"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-semibold text-stone-900 tracking-tight">PLP財団</span>
          </Link>
          <Link href="/donate" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            キャンセル
          </Link>
        </div>
      </motion.header>

      <main className="pt-28 pb-20">
        <div className="max-w-lg mx-auto px-6">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-xs text-stone-400 mb-10"
          >
            <span className="text-indigo-600 font-medium">1. 金額選択</span>
            <span className="w-8 h-px bg-stone-300" />
            <span className="text-stone-900 font-medium">2. 情報入力</span>
            <span className="w-8 h-px bg-stone-300" />
            <span>3. 決済</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <h1 className="text-display text-3xl md:text-4xl text-stone-900 mb-3">
              情報を入力
            </h1>
            <p className="text-body">
              決済はStripeを通じて安全に処理されます
            </p>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-500 text-sm">寄付金額</span>
              <Link href="/donate" className="text-indigo-600 text-sm hover:text-indigo-700">
                変更
              </Link>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-stone-900">
                ¥{amount.toLocaleString()}
              </span>
              {frequency === 'monthly' && (
                <span className="text-stone-500">/月</span>
              )}
            </div>
            <div className="flex gap-3 mt-4 pt-4 border-t border-stone-100">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-100 text-xs text-stone-600">
                {FREQUENCY_LABELS[frequency]}
              </span>
              {purpose !== 'none' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-xs text-indigo-600">
                  {PURPOSE_LABELS[purpose]}
                </span>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-heading text-lg text-stone-900 mb-6">
              ご連絡先
            </h2>

            <div className="space-y-6">
              {/* Donor Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700">
                  寄付者の種類
                </label>
                <div className="flex p-1 bg-stone-100 rounded-xl">
                  {(['individual', 'corporate'] as const).map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setDonorType(type)}
                      className={cn(
                        'flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors relative',
                        donorType === type ? 'text-white' : 'text-stone-600'
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      {donorType === type && (
                        <motion.div
                          layoutId="donorType-bg"
                          className="absolute inset-0 bg-stone-900 rounded-lg"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{DONOR_TYPE_LABELS[type]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <ZenInput
                label={donorType === 'individual' ? 'お名前' : '法人名'}
                required
                placeholder={donorType === 'individual' ? '山田 太郎' : '株式会社〇〇'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              {/* Email */}
              <ZenInput
                label="メールアドレス"
                required
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <p className="text-xs text-stone-400 -mt-4">
                確認メールと領収書のご案内をお送りします
              </p>

              {/* Message */}
              <ZenTextarea
                label="応援メッセージ"
                placeholder="応援メッセージがあればお書きください..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Payment Method Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-6 p-5 rounded-xl bg-stone-50 border border-stone-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-stone-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
              </svg>
              <span className="font-medium text-stone-700 text-sm">クレジットカード決済</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              次のステップでカード情報を入力します。Visa, Mastercard, American Express, JCB対応。
              決済情報は当サイトでは保存されません。
            </p>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200"
              >
                <p className="text-sm text-red-600">{submitError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
            >
              決済に進む
            </Button>

            <p className="mt-4 text-xs text-stone-400 text-center leading-relaxed">
              「決済に進む」をクリックすると、Stripeの決済ページに移動します。
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              SSL暗号化
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by Stripe
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
