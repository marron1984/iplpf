'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

// Image URLs
const IMAGES = {
  logo: 'https://iplpf.org/wp-content/uploads/2026/01/HDRP_ロゴマークOL_20260119-768x454.png',
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Form Input Component
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

// Form Textarea Component
function FormTextarea({
  label,
  required = false,
  error,
  ...props
}: {
  label: string;
  required?: boolean;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-stone-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'お名前を入力してください';
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.subject.trim()) newErrors.subject = '件名を入力してください';
    if (!formData.message.trim()) newErrors.message = 'お問い合わせ内容を入力してください';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 relative">
              <Image src={IMAGES.logo} alt="PLP財団" fill className="object-contain" sizes="48px" />
            </div>
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-lg">PLP財団</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'ホーム', href: '/' },
              { label: '活動内容', href: '/activities' },
              { label: 'お知らせ', href: '/news' },
              { label: 'お問い合わせ', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  item.href === '/contact' ? 'text-amber-600' : 'text-stone-600 hover:text-stone-900'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/donate">
              <Button variant="primary" size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                寄付する
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 font-semibold text-sm mb-4"
            >
              CONTACT
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              お問い合わせ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              ご質問・ご相談などお気軽にお問い合わせください
            </motion.p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    送信完了
                  </h2>
                  <p className="text-stone-600 mb-8">
                    お問い合わせいただきありがとうございます。
                    <br />
                    内容を確認の上、担当者よりご連絡いたします。
                  </p>
                  <Link href="/">
                    <Button variant="primary" className="bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                      トップページへ戻る
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-6 md:p-10 shadow-xl"
                >
                  <motion.div variants={fadeUp} className="mb-8">
                    <h2 className="text-2xl font-bold text-stone-900 mb-2">お問い合わせフォーム</h2>
                    <p className="text-stone-500 text-sm">
                      <span className="text-red-500">*</span> は必須項目です
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="space-y-6">
                    <FormInput
                      label="お名前"
                      required
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                    />

                    <FormInput
                      label="メールアドレス"
                      required
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />

                    <FormInput
                      label="件名"
                      required
                      placeholder="お問い合わせの件名"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      error={errors.subject}
                    />

                    <FormTextarea
                      label="お問い合わせ内容"
                      required
                      placeholder="お問い合わせ内容をご記入ください"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      error={errors.message}
                    />
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-8">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 border-0 py-4"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      送信する
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                INFORMATION
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900">
                お問い合わせ先
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '📧',
                  title: 'メール',
                  content: 'info@iplpf.org',
                  description: '24時間受付',
                },
                {
                  icon: '🏢',
                  title: '所在地',
                  content: '東京都',
                  description: '詳細はお問い合わせください',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FFFBF5] rounded-2xl p-6 text-center"
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-amber-600 font-medium mb-1">{item.content}</p>
                  <p className="text-stone-500 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.p variants={fadeUp} className="text-amber-600 font-semibold text-sm mb-2">
                FAQ
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-stone-900">
                よくある質問
              </motion.h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: '寄付の領収書は発行されますか？',
                  a: 'はい、ご希望の方には領収書を発行いたします。寄付完了後にお送りするメールの案内に従ってお申し込みください。',
                },
                {
                  q: '毎月の寄付は解約できますか？',
                  a: 'はい、いつでも解約可能です。お問い合わせフォームよりご連絡ください。',
                },
                {
                  q: 'ボランティアとして参加できますか？',
                  a: 'はい、ボランティアを随時募集しております。お問い合わせフォームよりご連絡ください。',
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6"
                >
                  <h3 className="font-bold text-stone-900 mb-2">{faq.q}</h3>
                  <p className="text-stone-600 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative">
                  <Image src={IMAGES.logo} alt="PLP財団" fill className="object-contain brightness-0 invert" sizes="40px" />
                </div>
                <span className="text-lg font-bold text-white">PLP財団</span>
              </div>
              <p className="text-sm text-stone-400">平和を愛する人を増やすために</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">活動</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/activities" className="hover:text-white transition-colors">活動内容</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">お知らせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">寄付</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/donate" className="hover:text-white transition-colors">寄付する</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">情報</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><Link href="/about" className="hover:text-white transition-colors">団体概要</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center">
            <p className="text-sm text-stone-500">© {new Date().getFullYear()} PLP財団. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
