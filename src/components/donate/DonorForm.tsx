'use client';

import { useState, useCallback } from 'react';
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

  return (
    <div className="space-y-5">
      {/* 個人/法人選択 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          寄付者タイプ
        </label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(Object.keys(DONOR_TYPE_LABELS) as DonorType[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTypeChange(key)}
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                donorType === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {donorType === 'individual' ? 'お名前' : '法人名'}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="donor-name"
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder={
            donorType === 'individual' ? '山田 太郎' : '株式会社〇〇'
          }
          className={`w-full py-3 px-4 rounded-lg border text-sm ${
            errors.name ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label
          htmlFor="donor-email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          メールアドレス
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="donor-email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="example@email.com"
          className={`w-full py-3 px-4 rounded-lg border text-sm ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          確認メールと領収書のご案内をお送りします
        </p>
      </div>

      {/* 住所（任意） */}
      <div>
        <label
          htmlFor="donor-address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          住所
          <span className="text-gray-400 ml-1 text-xs">（任意）</span>
        </label>
        <input
          id="donor-address"
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="東京都千代田区..."
          className="w-full py-3 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">
          領収書の郵送をご希望の場合はご記入ください
        </p>
      </div>

      {/* 応援メッセージ（任意） */}
      <div>
        <label
          htmlFor="donor-message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          応援メッセージ
          <span className="text-gray-400 ml-1 text-xs">（任意）</span>
        </label>
        <textarea
          id="donor-message"
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder="応援メッセージがあればお書きください..."
          rows={3}
          className="w-full py-3 px-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
