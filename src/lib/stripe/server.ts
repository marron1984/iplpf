// Stripe サーバーサイド初期化

import Stripe from 'stripe';

let stripe: Stripe | null = null;

export const getStripeServer = () => {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripe = new Stripe(key, {
      apiVersion: '2026-01-28.clover',
    });
  }
  return stripe;
};
