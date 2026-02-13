'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/donate/constants';
import { HEADER_LOGO_URL, HERO_URL } from '@/lib/iplpfAssets';

function Particle({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-blue-400/30"
      style={{ left: `${x}%`, width: size, height: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: [0, -window.innerHeight * 1.2], opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

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

function AnimatedCheckmark() {
  return (
    <motion.div
      className="relative w-28 h-28 mx-auto"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-200"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-600/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
      >
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
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-blue-300"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2 + i * 0.5, opacity: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <ParticlesBackground />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 md:gap-3">
            <img src={HEADER_LOGO_URL} alt="国際P-LP財団 公式ロゴ" className="h-8 md:h-10 w-auto object-contain" loading="eager" decoding="async" />
            <span className="font-bold text-slate-900 tracking-tight text-sm md:text-base">PLP財団</span>
          </Link>
        </div>
      </motion.header>

      <main className="relative pt-28 md:pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-lg mx-auto">
          <AnimatedCheckmark />

          <motion.div className="text-center mt-8 md:mt-10" initial="hidden" animate="visible" variants={stagger}>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6"
            >
              ありがとう
              <br />
              ございます
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10"
            >
              あなたのご支援が、世界の平和と
              <br />
              持続可能な未来に繋がります。
            </motion.p>

            {/* Activity Image */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-blue-200 shadow-xl"
            >
              <img src={HERO_URL} alt="支援活動の様子" className="w-full h-full object-cover" />
            </motion.div>

            {/* Reference Number */}
            {referenceNumber && (
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-sm border border-slate-100"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">受付番号</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-wider font-mono">{referenceNumber}</p>
                <p className="text-xs text-slate-400 mt-3">お問い合わせの際にお伝えください</p>
              </motion.div>
            )}

            {/* Info Card */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-5 md:p-6 mb-8 text-left shadow-sm border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">確認メールをお送りしました</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">領収書が必要な場合は、メール内の案内に従ってお申し込みください。</p>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 md:py-10 border-y border-slate-200"
            >
              <blockquote className="text-xl md:text-2xl font-light text-slate-700 italic leading-relaxed">
                &ldquo;平和は微笑みから始まります&rdquo;
              </blockquote>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-4">— マザー・テレサ</p>
            </motion.div>

            {/* Share */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10"
            >
              <p className="text-slate-500 text-sm mb-5">この活動を広めていただけませんか？</p>
              <div className="flex justify-center gap-3">
                {[
                  {
                    name: 'X',
                    href: `https://twitter.com/intent/tweet?text=PLP財団に寄付しました。世界平和とSDGs達成のために、あなたも一緒に支援しませんか？&url=https://iplpf.org/donate`,
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
                      'bg-white border border-slate-200 text-slate-500',
                      'hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all'
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
                <Button variant="primary" size="lg" className="w-full bg-slate-900 hover:bg-slate-800 border-0 py-4">
                  トップページへ戻る
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} 一般財団法人 国際P-LP財団. All rights reserved.
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <motion.div
            className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full"
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
