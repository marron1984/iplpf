'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Donor, DonorType } from '@/lib/donate/types';
import { DONOR_TYPE_LABELS } from '@/lib/donate/constants';

interface DonorFormProps {
  initialDonor?: Partial<Donor>;
  onChange: (donor: Donor) => void;
  errors?: Partial<Record<keyof Donor, string>>;
}

export default function DonorForm({
  initialDonor,
  onChange,
  errors = {},
}: DonorFormProps) {
  const [donorType, setDonorType] = useState<DonorType>(
    initialDonor?.type ?? 'individual'
  );
  const [name, setName] = useState(initialDonor?.name ?? '');
  const [email, setEmail] = useState(initialDonor?.email ?? '');
  const [address, setAddress] = useState(initialDonor?.address ?? '');
  const [message, setMessage] = useState(initialDonor?.message ?? '');

  const updateDonor = useCallback(
    (updates: Partial<Donor>) => {
      const newDonor: Donor = {
        type: updates.type ?? donorType,
        name: updates.name ?? name,
        email: updates.email ?? email,
        address: updates.address ?? address,
        message: updates.message ?? message,
      };
      onChange(newDonor);
    },
    [donorType, name, email, address, message, onChange]
  );

  const handleTypeChange = (type: DonorType) => {
    setDonorType(type);
    updateDonor({ type });
  };

  const handleNameChange = (value: string) => {
    setName(value);
    updateDonor({ name: value });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    updateDonor({ email: value });
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    updateDonor({ address: value });
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    updateDonor({ message: value });
  };

  const inputClasses = cn(
    'w-full py-3 px-4 rounded-xl border text-sm transition-all duration-300',
    'bg-white/5 text-white placeholder-white/30',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
    'border-white/10 hover:border-white/20'
  );

  const errorInputClasses = cn(
    inputClasses,
    'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50'
  );

  return (
    <div className="space-y-6">
      {/* 個人/法人選択 */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-3">
          寄付者タイプ
        </label>
        <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
          {(Object.keys(DONOR_TYPE_LABELS) as DonorType[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTypeChange(key)}
              className={cn(
                'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300',
                donorType === key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              {DONOR_TYPE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* 氏名/法人名 */}
      <div>
        <label
          htmlFor="donor-name"
          className="block text-sm font-medium text-white/70 mb-3"
        >
          {donorType === 'individual' ? 'お名前' : '法人名'}
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          id="donor-name"
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder={
            donorType === 'individual' ? '山田 太郎' : '株式会社〇〇'
          }
          className={errors.name ? errorInputClasses : inputClasses}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label
          htmlFor="donor-email"
          className="block text-sm font-medium text-white/70 mb-3"
        >
          メールアドレス
          <span className="text-red-400 ml-1">*</span>
        </label>
        <input
          id="donor-email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="example@email.com"
          className={errors.email ? errorInputClasses : inputClasses}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email}</p>
        )}
        <p className="mt-2 text-xs text-white/40">
          確認メールと領収書のご案内をお送りします
        </p>
      </div>

      {/* 住所（任意） */}
      <div>
        <label
          htmlFor="donor-address"
          className="block text-sm font-medium text-white/70 mb-3"
        >
          住所
          <span className="text-white/40 ml-2 text-xs">（任意）</span>
        </label>
        <input
          id="donor-address"
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="東京都千代田区..."
          className={inputClasses}
        />
        <p className="mt-2 text-xs text-white/40">
          領収書の郵送をご希望の場合はご記入ください
        </p>
      </div>

      {/* 応援メッセージ（任意） */}
      <div>
        <label
          htmlFor="donor-message"
          className="block text-sm font-medium text-white/70 mb-3"
        >
          応援メッセージ
          <span className="text-white/40 ml-2 text-xs">（任意）</span>
        </label>
        <textarea
          id="donor-message"
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder="応援メッセージがあればお書きください..."
          rows={3}
          className={cn(inputClasses, 'resize-none')}
        />
      </div>
    </div>
  );
}
