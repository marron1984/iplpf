import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getStripeServer } from '@/lib/stripe/server';
import {
  PURPOSE_LABELS,
  FREQUENCY_LABELS,
  MIN_AMOUNT,
  MAX_AMOUNT,
} from '@/lib/donate/constants';

// リクエストバリデーションスキーマ
const requestSchema = z.object({
  frequency: z.enum(['one_time', 'monthly']),
  amount: z.number().min(MIN_AMOUNT).max(MAX_AMOUNT),
  purpose: z.enum(['none', 'peace', 'un_support', 'research', 'relief']),
  donor: z.object({
    type: z.enum(['individual', 'corporate']),
    name: z.string().min(1, '名前は必須です'),
    email: z.string().email('有効なメールアドレスを入力してください'),
    address: z.string().optional(),
    message: z.string().optional(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'バリデーションエラー',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { frequency, amount, purpose, donor } = validationResult.data;
    const stripe = getStripeServer();

    // サイトのベースURL
    const siteOrigin =
      process.env.NEXT_PUBLIC_SITE_ORIGIN || 'http://localhost:3000';

    // 商品名の生成
    const productName = `PLP財団への寄付 (${PURPOSE_LABELS[purpose]})`;
    const description = `${FREQUENCY_LABELS[frequency]} - ${PURPOSE_LABELS[purpose]}`;

    // Stripeメタデータ（必須項目）
    const metadata = {
      frequency,
      purpose,
      donor_type: donor.type,
      donor_name: donor.name,
      donor_email: donor.email,
      donor_address: donor.address || '',
      donor_message: donor.message || '',
    };

    // Checkout Session の作成
    if (frequency === 'one_time') {
      // 単発寄付
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: donor.email,
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: productName,
                description: description,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        metadata,
        success_url: `${siteOrigin}/donate/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteOrigin}/donate`,
        locale: 'ja',
      });

      return NextResponse.json({ url: session.url });
    } else {
      // 毎月寄付（サブスクリプション）
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: donor.email,
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: productName,
                description: description,
              },
              unit_amount: amount,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata,
        },
        metadata,
        success_url: `${siteOrigin}/donate/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteOrigin}/donate`,
        locale: 'ja',
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error('Checkout session creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'バリデーションエラー',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Stripeエラーの場合
      if ('type' in error && (error as { type: string }).type === 'StripeInvalidRequestError') {
        return NextResponse.json(
          {
            error: '決済サービスとの通信でエラーが発生しました',
            message: error.message,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: '決済の初期化に失敗しました。しばらく経ってからお試しください。',
      },
      { status: 500 }
    );
  }
}
