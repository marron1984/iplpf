'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = name.trim() && email.trim() && email.includes('@') && body.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError('');

    const mailSubject = subject.trim() || 'お問い合わせ';
    const mailBody = `【お名前】${name}\n【メールアドレス】${email}\n\n${body}`;
    const mailtoUrl = `mailto:info@iplpf.org?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SiteHeader />

      <main>
        <section className="py-16 md:py-24">
          <div className="max-w-xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-[#0052A4] font-semibold text-sm mb-2">CONTACT</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">お問い合わせ</h1>
              <p className="text-slate-500">
                ご質問・ご要望がございましたら、お気軽にお問い合わせください。
              </p>
            </motion.div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 ring-1 ring-slate-100 shadow-sm text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">メールアプリが開きました</h2>
                <p className="text-slate-500 text-sm mb-6">
                  メールアプリでお問い合わせ内容をご確認の上、送信してください。
                  <br />
                  メールアプリが開かない場合は、下記のメールアドレスに直接ご連絡ください。
                </p>
                <p className="text-sm font-medium text-[#0052A4] mb-4">info@iplpf.org</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors underline"
                >
                  フォームに戻る
                </button>
              </motion.div>
            ) : (
              <>
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-slate-100 shadow-sm mb-8"
                >
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">お名前 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="山田 太郎"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">件名</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="お問い合わせ内容"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
                      <textarea
                        rows={5}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="お問い合わせ内容をご記入ください"
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#0052A4] focus:ring-0 transition-colors resize-none"
                        required
                      />
                    </div>
                    {error && (
                      <div className="bg-red-50 text-red-600 text-sm rounded-xl p-4 ring-1 ring-red-200">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                        canSubmit
                          ? 'bg-[#0052A4] text-white shadow-lg shadow-blue-900/20 hover:bg-[#003d7a]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      送信する
                    </button>
                  </div>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 ring-1 ring-slate-100 text-center"
                >
                  <h3 className="font-bold text-slate-900 mb-3">その他のお問い合わせ方法</h3>
                  <p className="text-sm text-slate-500 mb-2">メール: info@iplpf.org</p>
                  <p className="text-sm text-slate-500">
                    公式サイト:{' '}
                    <a href="https://iplpf.org/" target="_blank" rel="noopener noreferrer" className="text-[#0052A4] hover:underline">
                      https://iplpf.org/
                    </a>
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
