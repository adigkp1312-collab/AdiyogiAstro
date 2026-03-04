import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';
import { creditWallet } from '@/lib/wallet/wallet-service';

interface Promotion {
  id: number;
  title: string;
  description: string;
  type: string;
  value: number;
  promo_code: string;
  is_active: number;
  starts_at: string | null;
  ends_at: string | null;
}

interface PromoRedemption {
  id: number;
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
    const { promo_code } = body;

    if (!promo_code || typeof promo_code !== 'string') {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Look up the promotion by promo_code
    const promotion = db.prepare(
      'SELECT * FROM promotions WHERE promo_code = ? AND is_active = 1'
    ).get(promo_code.trim().toUpperCase()) as Promotion | undefined;

    if (!promotion) {
      return NextResponse.json(
        { error: 'Invalid or inactive promo code' },
        { status: 400 }
      );
    }

    // Check if user has already redeemed this promotion
    const existingRedemption = db.prepare(
      'SELECT id FROM promo_redemptions WHERE user_id = ? AND promotion_id = ?'
    ).get(userId, promotion.id) as PromoRedemption | undefined;

    if (existingRedemption) {
      return NextResponse.json(
        { error: 'Promo code already redeemed' },
        { status: 400 }
      );
    }

    // Credit wallet and record redemption
    const creditAmount = promotion.value;

    const result = creditWallet(
      userId,
      creditAmount,
      `Promo code: ${promotion.promo_code}`,
      `promo_${promotion.id}`
    );

    db.prepare(
      'INSERT INTO promo_redemptions (user_id, promotion_id, amount) VALUES (?, ?, ?)'
    ).run(userId, promotion.id, creditAmount);

    const amountCredited = creditAmount;

    return NextResponse.json({
      success: true,
      amount_credited: amountCredited,
      new_balance: result.newBalance,
    });
  } catch (error) {
    console.error('Promo redeem error:', error);
    return NextResponse.json(
      { error: 'Failed to redeem promo code' },
      { status: 500 }
    );
  }
}
