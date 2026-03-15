import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';
import { getPlaceholderMoonSign, getPlaceholderDasha } from '@/lib/utils';
import type { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { name, dob, tob, pob_city, pob_lat, pob_lng } = await request.json();

    if (!name || !dob || !pob_city) {
      return NextResponse.json(
        { error: 'Name, date of birth, and place of birth are required' },
        { status: 400 }
      );
    }

    // Validate DOB is a valid date and not in the future
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date of birth format' },
        { status: 400 }
      );
    }
    if (dobDate > new Date()) {
      return NextResponse.json(
        { error: 'Date of birth cannot be in the future' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Calculate placeholder moon sign and dasha
    const moonSign = getPlaceholderMoonSign(dob);
    const currentDasha = getPlaceholderDasha();

    // Update user profile
    db.prepare(`
      UPDATE users SET
        name = ?,
        dob = ?,
        tob = ?,
        pob_city = ?,
        pob_lat = ?,
        pob_lng = ?,
        moon_sign = ?,
        current_dasha = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(name, dob, tob || null, pob_city, pob_lat || null, pob_lng || null, moonSign, currentDasha, auth.userId);

    // Fetch updated user
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(auth.userId) as User;

    // Generate proper tokens
    const accessToken = signAccessToken({ userId: user.id, phone: user.phone });
    const refreshToken = signRefreshToken({ userId: user.id });

    return NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
