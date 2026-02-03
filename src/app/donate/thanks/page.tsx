'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/donate/constants';

// Logo and activity images
const LOGO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/HDRP_ロゴマークOL_20260119-768x454.png';
const ACTIVITY_IMAGE = 'https://iplpf.org/wp-content/uploads/2026/01/カンボジアバンザイ_0258.png';

// Floating particle component
function Particle({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-amber-400/30"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Particles container
function ParticlesBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 4 + Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} delay={p.delay} duration={p.duration} size={p.size} />
      ))}
    </div>
  );
}

// Checkmark animation
function AnimatedCheckmark() {
  return (
    <motion.div
      className="relative w-28 h-28 mx-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-200"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {/* Inner filled circle */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
      >
        {/* Checkmark */}
        <motion.svg
          className="w-12 h-12 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12l5 5L20 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          />
        </motion.svg>
      </motion.div>

      {/* Celebration rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-amber-300"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2 + i * 0.5, opacity: 0 }}
          transition={{
            delay: 0.8 + i * 0.15,
            duration: 1,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
}

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

function ThanksPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const referenceNumber = sessionId ? sessionId.slice(0, 8).toUpperCase() : null;

  useEffect(() => {
    if (sessionId) {
      trackEvent(ANALYTICS_EVENTS.COMPLETE, { session_id: sessionId });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-amber-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <ParticlesBackground />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 relative">
              <Image
                src={LOGO_URL}
                alt="PLP財団"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-bold text-stone-900 tracking-tight text-sm md:text-base">PLP財団</span>
          </Link>
        </div>
      </motion.header>

      <main className="relative pt-28 md:pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-lg mx-auto">
          {/* Success Icon */}
          <AnimatedCheckmark />

          {/* Main Content */}
          <motion.div
            className="text-center mt-8 md:mt-10"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 md:mb-6"
            >
              ありがとう
              <br />
              ございます
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10"
            >
              あなたの想いが、子どもたちの
              <br />
              笑顔につながります。
            </motion.p>

            {/* Activity Image */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-amber-200 shadow-xl"
            >
              <Image
                src={ACTIVITY_IMAGE}
                alt="支援活動の様子"
                fill
                className="object-cover"
                sizes="160px"
              />
            </motion.div>

            {/* Reference Number */}
            {referenceNumber && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
              >
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">受付番号</p>
                <p className="text-2xl md:text-3xl font-bold text-stone-900 tracking-wider font-mono">
                  {referenceNumber}
                </p>
                <p className="text-xs text-stone-400 mt-3">
                  お問い合わせの際にお伝えください
                </p>
              </motion.div>
            )}

            {/* Info Card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-5 md:p-6 mb-8 text-left shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-1">確認メールをお送りしました</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    領収書が必要な場合は、メール内の案内に従ってお申し込みください。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 md:py-10 border-y border-stone-200"
            >
              <blockquote className="text-xl md:text-2xl font-light text-stone-700 italic leading-relaxed">
                &ldquo;平和は微笑みから始まります&rdquo;
              </blockquote>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mt-4">— マザー・テレサ</p>
            </motion.div>

            {/* Share Section */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10"
            >
              <p className="text-stone-500 text-sm mb-5">
                この活動を広めていただけませんか？
              </p>
              <div className="flex justify-center gap-3">
                {[
                  {
                    name: 'X',
                    href: `https://twitter.com/intent/tweet?text=PLP財団に寄付しました。子どもたちの笑顔のために、あなたも一緒に支援しませんか？&url=https://iplpf.org/donate`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Facebook',
                    href: `https://www.facebook.com/sharer/sharer.php?u=https://iplpf.org/donate`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'LINE',
                    href: `https://line.me/R/msg/text/?PLP財団に寄付しました。%0Ahttps://iplpf.org/donate`,
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      'bg-white border border-stone-200 text-stone-500',
                      'hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 transition-all'
                    )}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 md:mt-12"
            >
              <Link href="/">
                <Button variant="primary" size="lg" className="w-full bg-stone-900 hover:bg-stone-800 border-0 py-4">
                  トップページへ戻る
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} PLP財団. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ThanksPage() {
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
      <ThanksPageContent />
    </Suspense>
  );
}
