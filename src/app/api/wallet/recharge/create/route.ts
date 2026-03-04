import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth/middleware';
import { DEV_PAYMENT_MODE, createDevPaymentOrder } from '@/lib/payment/razorpay';

const VALID_RECHARGE_AMOUNTS = [50, 100, 200, 500, 1000];

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { userId } = auth;
    const body = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json(
        { error: 'Amount is required and must be a number' },
        { status: 400 }
      );
    }

    if (!VALID_RECHARGE_AMOUNTS.includes(amount)) {
      return NextResponse.json(
        { error: `Invalid amount. Valid options: ${VALID_RECHARGE_AMOUNTS.join(', ')}` },
        { status: 400 }
      );
    }

    if (DEV_PAYMENT_MODE) {
      const { paymentOrderId } = createDevPaymentOrder(userId, amount);

      return NextResponse.json({
        dev_mode: true,
        payment_order_id: paymentOrderId,
        amount,
      });
    }

    // Production Razorpay integration would go here
    return NextResponse.json(
      { error: 'Production payment not configured' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Recharge create error:', error);
    return NextResponse.json(
      { error: 'Failed to create recharge order' },
      { status: 500 }
    );
  }
}
