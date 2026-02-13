'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import {
  DonationFrequency,
  DonationPurpose,
  DonorType,
} from '@/lib/donate/types';
import {
  FREQUENCY_LABELS,
  PURPOSE_LABELS,
  DONOR_TYPE_LABELS,
} from '@/lib/donate/constants';
import { cn } from '@/lib/utils';
import { HEADER_LOGO_URL } from '@/lib/iplpfAssets';

function CheckoutContent() {
  const router = useRouter();
  const sp = useSearchParams();

  const frequency = (sp.get('freq') as DonationFrequency) || 'one_time';
  const amount = Number(sp.get('amount')) || 5000;
  const purpose = (sp.get('purpose') as DonationPurpose) || 'none';

  const [donorType, setDonorType] = useState<DonorType>('individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = name.trim() && email.trim() && email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/donate/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frequency,
          amount,
          purpose,
          donor: { type: donorType, name, email, address, message },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'エラーが発生しました');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={HEADER_LOGO_URL} alt="IPLPF" className="w-10 h-10 object-contain" />
            <span className="font-bold text-sm text-stone-900">国際P-LP財団</span>
          </Link>
          <Link href="/donate" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            戻る
          </Link>
        </div>
      </header>

      <main className="py-10 md:py-16">
        <div className="max-w-xl mx-auto px-4">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-8 text-sm">
            <span className="text-stone-400">金額選択</span>
            <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-amber-600 font-bold">お客様情報</span>
            <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-stone-400">お支払い</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-stone-900 text-center mb-8"
          >
            お客様情報の入力
          </motion.h1>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-amber-50 rounded-xl p-4 mb-8 ring-1 ring-amber-200"
          >
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-stone-500">{FREQUENCY_LABELS[frequency]}</span>
                <span className="mx-2 text-stone-300">|</span>
                <span className="text-stone-500">{PURPOSE_LABELS[purpose]}</span>
              </div>
              <span className="text-lg font-bold text-amber-600">¥{amount.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Donor Type */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">寄付者種別</label>
              <div className="grid grid-cols-2 gap-3">
                {(['individual', 'corporate'] as DonorType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDonorType(type)}
                    className={cn(
                      'py-3 rounded-xl text-sm font-medium transition-all border-2',
                      donorType === type
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-stone-200 bg-white text-stone-600'
                    )}
                  >
                    {DONOR_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">
                {donorType === 'corporate' ? '法人名' : 'お名前'}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={donorType === 'corporate' ? '株式会社〇〇' : '山田 太郎'}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">
                メールアドレス
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">ご住所（任意）</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="東京都〇〇区..."
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-stone-900 mb-2">応援メッセージ（任意）</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="頑張ってください！"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:ring-0 transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl p-4 ring-1 ring-red-200">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={cn(
                'w-full py-4 rounded-xl font-bold text-base transition-all',
                canSubmit && !loading
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              )}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  処理中...
                </span>
              ) : (
                '決済画面へ進む'
              )}
            </button>

            <p className="text-xs text-stone-400 text-center">
              決済はStripeの安全な決済画面で行われます
            </p>
          </motion.form>
        </div>
      </main>

      <footer className="bg-stone-900 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} 国際P-LP財団. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFBF5]" />}>
      <CheckoutContent />
    </Suspense>
  );
}
