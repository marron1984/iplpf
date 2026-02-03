// 寄付に関する型定義

export type DonationFrequency = 'one_time' | 'monthly';

export type DonationPurpose =
  | 'none'
  | 'peace'
  | 'un_support'
  | 'research'
  | 'relief';

export type DonorType = 'individual' | 'corporate';

export interface Donor {
  type: DonorType;
  name: string;
  email: string;
  address?: string;
  message?: string;
}

export interface DonationParams {
  frequency: DonationFrequency;
  amount: number;
  purpose: DonationPurpose;
  donor: Donor;
}

export interface DonationSelection {
  frequency: DonationFrequency;
  amount: number;
  purpose: DonationPurpose;
}

export interface CreateCheckoutSessionRequest {
  frequency: DonationFrequency;
  amount: number;
  purpose: DonationPurpose;
  donor: Donor;
}

export interface CreateCheckoutSessionResponse {
  url: string;
}

export interface CheckoutSessionData {
  frequency: DonationFrequency;
  amount: number;
  purpose: DonationPurpose;
  donorType: DonorType;
  donorName: string;
  donorEmail: string;
}
