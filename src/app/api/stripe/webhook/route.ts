import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeServer } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  const stripe = getStripeServer();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  // Stripe署名の取得
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // リクエストボディの取得
    const body = await request.text();

    // 署名検証とイベント構築
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  // イベントタイプごとの処理
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook handler error: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook handler failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// チェックアウトセッション完了時の処理
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log('=== Checkout Session Completed ===');
  console.log('Session ID:', session.id);
  console.log('Customer Email:', session.customer_email);
  console.log('Amount Total:', session.amount_total);
  console.log('Currency:', session.currency);
  console.log('Mode:', session.mode);
  console.log('Metadata:', session.metadata);

  // TODO: 将来的にはここでDB保存やメール送信を行う
  // 例:
  // - 寄付記録をデータベースに保存
  // - 寄付者に確認メールを送信
  // - 管理者にSlack/メール通知を送信

  const metadata = session.metadata || {};
  const donationInfo = {
    sessionId: session.id,
    email: session.customer_email,
    amount: session.amount_total,
    currency: session.currency,
    mode: session.mode,
    frequency: metadata.frequency,
    purpose: metadata.purpose,
    donorType: metadata.donor_type,
    donorName: metadata.donor_name,
    donorAddress: metadata.donor_address,
    donorMessage: metadata.donor_message,
    createdAt: new Date().toISOString(),
  };

  console.log('Donation Info:', JSON.stringify(donationInfo, null, 2));

  // MVPではログ出力のみ
  // 第2フェーズで以下を実装予定:
  // - await saveDonationToDatabase(donationInfo);
  // - await sendConfirmationEmail(donationInfo);
  // - await notifyAdmins(donationInfo);
}

// 請求書支払い完了時の処理（定期寄付の継続支払い）
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('=== Invoice Paid ===');
  console.log('Invoice ID:', invoice.id);
  console.log('Customer:', invoice.customer);
  console.log('Amount Paid:', invoice.amount_paid);

  // TODO: 定期寄付の継続支払い記録
  // - 支払い履歴をデータベースに記録
  // - 寄付者に領収メールを送信
}

// サブスクリプション解約時の処理
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('=== Subscription Deleted ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Customer:', subscription.customer);
  console.log('Status:', subscription.status);
  console.log('Canceled At:', subscription.canceled_at);

  // TODO: 解約処理
  // - データベースの寄付ステータスを更新
  // - 解約理由のアンケートメールを送信（任意）
}
