// 寄付に関する定数

import { DonationFrequency, DonationPurpose, DonorType } from './types';

export const AMOUNT_CHIPS = [3000, 5000, 10000, 30000] as const;

export const MIN_AMOUNT = 1000;
export const MAX_AMOUNT = 1000000;

export const FREQUENCY_LABELS: Record<DonationFrequency, string> = {
  one_time: '単発寄付',
  monthly: '毎月寄付',
};

export const PURPOSE_LABELS: Record<DonationPurpose, string> = {
  none: '指定なし',
  peace: '平和推進',
  un_support: '国連活動支援',
  research: '調査研究・提言',
  relief: '支援活動・災害復興',
};

export const PURPOSE_DESCRIPTIONS: Record<DonationPurpose, string> = {
  none: 'PLP財団の活動全般に役立てます',
  peace: '平和推進のための活動に使用します',
  un_support: '国連機関との連携活動に使用します',
  research: '調査研究や政策提言に使用します',
  relief: '被災地支援や復興活動に使用します',
};

export const DONOR_TYPE_LABELS: Record<DonorType, string> = {
  individual: '個人',
  corporate: '法人',
};

export const FAQ_ITEMS = [
  {
    question: '領収書は発行できますか？',
    answer:
      'はい、発行可能です。寄付完了後、ご登録いただいたメールアドレスに領収書についてのご案内をお送りします。確定申告等で必要な場合は、お問い合わせください。',
  },
  {
    question: '寄付の使い道は指定できますか？',
    answer:
      'はい、「平和推進」「国連活動支援」「調査研究・提言」「支援活動・災害復興」の4つの分野から指定いただけます。「指定なし」を選択された場合は、財団の判断で最も必要とされる活動に使用させていただきます。',
  },
  {
    question: '毎月寄付はいつでも停止できますか？',
    answer:
      'はい、いつでも停止いただけます。停止をご希望の場合は、お問い合わせフォームまたはメールにてご連絡ください。次回引き落とし日の5営業日前までにお手続きいただければ、次回から停止となります。',
  },
  {
    question: '寄付完了メールは届きますか？',
    answer:
      'はい、寄付完了後、ご登録いただいたメールアドレスに確認メールをお送りします。メールが届かない場合は、迷惑メールフォルダをご確認いただくか、お問い合わせください。',
  },
  {
    question: '法人として寄付できますか？',
    answer:
      'はい、法人様からのご寄付も承っております。寄付フォームで「法人」を選択し、法人名をご記入ください。法人様向けの領収書も発行可能です。',
  },
  {
    question: 'お問い合わせ先はどこですか？',
    answer:
      'ご質問やお問い合わせは、メール（info@iplpf.org）または公式サイトのお問い合わせフォームよりご連絡ください。',
  },
];

export const IMPACT_ITEMS = [
  {
    amount: 3000,
    description: '平和教育プログラムの教材1セットを提供できます',
    icon: '📚',
  },
  {
    amount: 5000,
    description: '国連会議への提言活動1件をサポートできます',
    icon: '🏛️',
  },
  {
    amount: 10000,
    description: '被災地への緊急支援キット5セットを届けられます',
    icon: '🤝',
  },
  {
    amount: 30000,
    description: '平和構築に関する調査研究1件を実施できます',
    icon: '🔬',
  },
];

// 計測イベント名
export const ANALYTICS_EVENTS = {
  SELECT_FREQUENCY: 'donate_select_frequency',
  SELECT_AMOUNT: 'donate_select_amount',
  SELECT_PURPOSE: 'donate_select_purpose',
  START_CHECKOUT: 'donate_start_checkout',
  COMPLETE: 'donate_complete',
} as const;
