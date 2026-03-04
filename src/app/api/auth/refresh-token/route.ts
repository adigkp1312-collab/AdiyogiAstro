import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, signAccessToken } from '@/lib/auth/jwt';
import { getDb } from '@/lib/db';
import type { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    const decoded = verifyToken(refreshToken);

    if (!('type' in decoded) || decoded.type !== 'refresh') {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(decoded.userId) as User | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const accessToken = signAccessToken({ userId: user.id, phone: user.phone });

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'Token refresh failed. Please login again.' },
      { status: 401 }
    );
  }
}
