import crypto from 'crypto';
import { getDb } from '@/lib/db';

export const DEV_PAYMENT_MODE = true;

interface PaymentOrder {
  id: number;
  user_id: number;
  amount: number;
  bonus_amount: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  status: 'created' | 'paid' | 'failed';
  created_at: string;
  completed_at: string | null;
}

export function createDevPaymentOrder(
  userId: number,
  amount: number
): { paymentOrderId: number } {
  const db = getDb();

  const result = db.prepare(
    'INSERT INTO payment_orders (user_id, amount, status) VALUES (?, ?, ?)'
  ).run(userId, amount, 'created');

  return { paymentOrderId: Number(result.lastInsertRowid) };
}

export function verifyDevPayment(
  paymentOrderId: number,
  userId: number
): { success: boolean; amount: number; bonusAmount: number } {
  const db = getDb();

  const order = db.prepare(
    'SELECT * FROM payment_orders WHERE id = ? AND user_id = ?'
  ).get(paymentOrderId, userId) as PaymentOrder | undefined;

  if (!order) {
    return { success: false, amount: 0, bonusAmount: 0 };
  }

  if (order.status !== 'created') {
    return { success: false, amount: 0, bonusAmount: 0 };
  }

  db.prepare(
    `UPDATE payment_orders SET status = ?, razorpay_payment_id = ?, completed_at = datetime('now') WHERE id = ?`
  ).run('paid', `dev_pay_${Date.now()}`, paymentOrderId);

  return {
    success: true,
    amount: order.amount,
    bonusAmount: order.bonus_amount,
  };
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}
