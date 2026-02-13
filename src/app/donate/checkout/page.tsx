'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
import { HEADER_LOGO_URL } from '@/lib/iplpfAssets';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function FormInput({
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
      <label className="block text-sm font-semibold text-stone-700">
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
                ? 'border-amber-500 bg-white ring-4 ring-amber-500/10'
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

function FormTextarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-stone-700">
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
              ? 'border-amber-500 bg-white ring-4 ring-amber-500/10'
              : 'border-stone-200 bg-white hover:border-stone-300'
          )}
        />
      </motion.div>
    </div>
  );
}

function CheckoutPageContent() {
  const searchParams = useSearchParams();

  const frequency = (searchParams.get('frequency') as DonationFrequency) ?? 'one_time';
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount')!, 10) : 5000;
  const purpose = (searchParams.get('purpose') as DonationPurpose) ?? 'none';

  const [donorType, setDonorType] = useState<DonorType>('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = donorType === 'individual' ? 'お名前を入力してください' : '法人名を入力してください';
    }
    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, donorType]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      setSubmitError(`金額は${MIN_AMOUNT.toLocaleString()}円以上、${MAX_AMOUNT.toLocaleString()}円以下で指定してください`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const donor: Donor = { type: donorType, name, email, address: '', message };
      const requestBody: CreateCheckoutSessionRequest = { frequency, amount, purpose, donor };

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

  if (!amount || amount < MIN_AMOUNT) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">寄付金額が設定されていません</p>
          <Link href="/donate" className="text-amber-600 hover:text-amber-700 font-medium">
            寄付ページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <img src={HEADER_LOGO_URL} alt="国際P-LP財団 公式ロゴ" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-lg">PLP財団</span>
          </Link>
          <Link href="/donate" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">キャンセル</Link>
        </div>
      </motion.header>

      <main className="pt-28 md:pt-32 pb-20">
        <div className="max-w-lg mx-auto px-4 md:px-6">
          {/* Progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 md:gap-3 text-xs mb-8 md:mb-10">
            <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">✓</span>
              金額選択
            </span>
            <span className="w-6 md:w-8 h-px bg-amber-300" />
            <span className="flex items-center gap-1.5 text-stone-900 font-semibold">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">2</span>
              情報入力
            </span>
            <span className="w-6 md:w-8 h-px bg-stone-200" />
            <span className="flex items-center gap-1.5 text-stone-400">
              <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs">3</span>
              決済
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">ご連絡先の入力</h1>
            <p className="text-stone-500 text-sm">決済はStripeを通じて安全に処理されます</p>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 mb-6 text-white shadow-lg shadow-amber-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/80 text-sm">寄付金額</span>
                <Link href="/donate" className="text-white/90 text-xs ml-2 underline hover:text-white">変更</Link>
              </div>
              <div className="text-right">
                <span className="text-3xl md:text-4xl font-bold">¥{amount.toLocaleString()}</span>
                {frequency === 'monthly' && <span className="text-white/80 text-sm ml-1">/月</span>}
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/20">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs">{FREQUENCY_LABELS[frequency]}</span>
              {purpose !== 'none' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs">{PURPOSE_LABELS[purpose]}</span>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-white rounded-2xl p-5 md:p-6 shadow-sm ring-1 ring-stone-100"
          >
            <div className="space-y-5">
              {/* Donor Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-700">寄付者の種類</label>
                <div className="flex p-1.5 bg-stone-100 rounded-xl">
                  {(['individual', 'corporate'] as const).map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setDonorType(type)}
                      className={cn(
                        'flex-1 py-3 rounded-lg text-sm font-semibold transition-colors relative',
                        donorType === type ? 'text-white' : 'text-stone-600'
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      {donorType === type && (
                        <motion.div
                          layoutId="donorType-bg"
                          className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{DONOR_TYPE_LABELS[type]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <FormInput
                label={donorType === 'individual' ? 'お名前' : '法人名'}
                required
                placeholder={donorType === 'individual' ? '山田 太郎' : '株式会社〇〇'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />

              <FormInput
                label="メールアドレス"
                required
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <p className="text-xs text-stone-400 -mt-3">確認メールと領収書のご案内をお送りします</p>

              <FormTextarea
                label="応援メッセージ"
                placeholder="応援メッセージがあればお書きください..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-5 p-4 rounded-xl bg-red-50 ring-1 ring-red-200"
              >
                <p className="text-sm text-red-600">{submitError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-6"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-full bg-stone-900 hover:bg-stone-800 border-0 py-4"
            >
              決済に進む
            </Button>
            <p className="mt-4 text-xs text-stone-400 text-center leading-relaxed">
              「決済に進む」をクリックすると、Stripeの安全な決済ページに移動します。
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">🔒 SSL暗号化</span>
            <span className="flex items-center gap-1.5">⚡ Powered by Stripe</span>
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
        <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-3 border-amber-200 border-t-amber-500 rounded-full"
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
