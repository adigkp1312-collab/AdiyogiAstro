import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';
import { DEV_PAYMENT_MODE } from '@/lib/payment/razorpay';
import { creditWallet } from '@/lib/wallet/wallet-service';

interface RechargeOption {
  amount: number;
  bonus: number;
}

const RECHARGE_OPTIONS: RechargeOption[] = [
  { amount: 50, bonus: 10 },
  { amount: 100, bonus: 25 },
  { amount: 200, bonus: 60 },
  { amount: 500, bonus: 175 },
  { amount: 1000, bonus: 400 },
];

interface PaymentOrderRow {
  id: number;
  user_id: number;
  amount: number;
  bonus_amount: number;
  status: string;
}

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

    if (DEV_PAYMENT_MODE) {
      const { payment_order_id } = body;

      if (!payment_order_id || typeof payment_order_id !== 'number') {
        return NextResponse.json(
          { error: 'payment_order_id is required' },
          { status: 400 }
        );
      }

      const db = getDb();

      // Look up and verify the payment order
      const order = db.prepare(
        'SELECT * FROM payment_orders WHERE id = ? AND user_id = ?'
      ).get(payment_order_id, userId) as PaymentOrderRow | undefined;

      if (!order) {
        return NextResponse.json(
          { error: 'Payment order not found' },
          { status: 404 }
        );
      }

      if (order.status !== 'created') {
        return NextResponse.json(
          { error: 'Payment order already processed' },
          { status: 400 }
        );
      }

      // Calculate bonus based on recharge amount
      const rechargeOption = RECHARGE_OPTIONS.find(opt => opt.amount === order.amount);
      const bonusAmount = rechargeOption ? rechargeOption.bonus : 0;
      const totalCredit = order.amount + bonusAmount;

      // Mark payment order as paid
      db.prepare(
        `UPDATE payment_orders SET status = ?, bonus_amount = ?, razorpay_payment_id = ?, completed_at = datetime('now') WHERE id = ?`
      ).run('paid', bonusAmount, `dev_pay_${Date.now()}`, payment_order_id);

      // Credit wallet with amount + bonus
      const result = creditWallet(
        userId,
        totalCredit,
        `Wallet recharge Rs.${order.amount} + bonus Rs.${bonusAmount}`,
        `recharge_${payment_order_id}`
      );

      return NextResponse.json({
        success: true,
        new_balance: result.newBalance,
        bonus_applied: bonusAmount,
      });
    }

    // Production Razorpay verification would go here
    return NextResponse.json(
      { error: 'Production payment verification not configured' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Recharge verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify recharge' },
      { status: 500 }
    );
  }
}
