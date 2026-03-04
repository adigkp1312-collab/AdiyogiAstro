import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';

interface UserRow {
  wallet_balance: number;
  welcome_bonus_claimed: number;
}

export async function GET(request: NextRequest) {
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
      'SELECT wallet_balance, welcome_bonus_claimed FROM users WHERE id = ?'
    ).get(userId) as UserRow | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      balance: user.wallet_balance,
      welcome_bonus_available: user.welcome_bonus_claimed === 0,
    });
  } catch (error) {
    console.error('Wallet balance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet balance' },
      { status: 500 }
    );
  }
}
