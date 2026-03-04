import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyOTP, isOTPExpired } from '@/lib/auth/otp';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';
import { validatePhone } from '@/lib/utils';
import type { OTPCode, User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit OTP' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Find the latest unused OTP for this phone
    const storedOTP = db.prepare(
      'SELECT * FROM otp_codes WHERE phone = ? AND is_used = 0 ORDER BY created_at DESC LIMIT 1'
    ).get(phone) as OTPCode | undefined;

    if (!storedOTP) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 400 }
      );
    }

    if (isOTPExpired(storedOTP.expires_at)) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (!verifyOTP(storedOTP.code, otp)) {
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    // Mark OTP as used
    db.prepare('UPDATE otp_codes SET is_used = 1 WHERE id = ?').run(storedOTP.id);

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone) as User | undefined;

    if (existingUser && existingUser.name) {
      // Existing user with complete profile - generate tokens
      const accessToken = signAccessToken({ userId: existingUser.id, phone: existingUser.phone });
      const refreshToken = signRefreshToken({ userId: existingUser.id });

      return NextResponse.json({
        isNewUser: false,
        accessToken,
        refreshToken,
        user: existingUser,
      });
    }

    // New user or incomplete profile
    // Create basic user record if doesn't exist
    if (!existingUser) {
      db.prepare('INSERT INTO users (phone) VALUES (?)').run(phone);
    }

    const user = db.prepare('SELECT * FROM users WHERE phone = ?').get(phone) as User;

    // Generate a temporary token for registration
    const tempToken = signAccessToken({ userId: user.id, phone: user.phone });

    return NextResponse.json({
      isNewUser: true,
      tempToken,
      userId: user.id,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
