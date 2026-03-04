import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';
import { creditWallet } from '@/lib/wallet/wallet-service';

const WELCOME_BONUS_AMOUNT = 50;

interface UserRow {
  id: number;
  welcome_bonus_claimed: number;
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
    const db = getDb();

    const user = db.prepare(
      'SELECT id, welcome_bonus_claimed FROM users WHERE id = ?'
    ).get(userId) as UserRow | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.welcome_bonus_claimed === 1) {
      return NextResponse.json(
        { error: 'Welcome bonus already claimed' },
        { status: 400 }
      );
    }

    // Credit the wallet and mark bonus as claimed
    const result = creditWallet(userId, WELCOME_BONUS_AMOUNT, 'Welcome bonus', 'welcome_bonus');

    db.prepare(
      `UPDATE users SET welcome_bonus_claimed = 1, updated_at = datetime('now') WHERE id = ?`
    ).run(userId);

    return NextResponse.json({
      success: true,
      amount: WELCOME_BONUS_AMOUNT,
      new_balance: result.newBalance,
    });
  } catch (error) {
    console.error('Welcome bonus error:', error);
    return NextResponse.json(
      { error: 'Failed to claim welcome bonus' },
      { status: 500 }
    );
  }
}
