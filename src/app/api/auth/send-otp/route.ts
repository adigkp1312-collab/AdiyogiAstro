import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { generateOTP, getOTPExpiry } from '@/lib/auth/otp';
import { validatePhone } from '@/lib/utils';
import { sendOTPviaMSG91, isMSG91Configured } from '@/lib/sms/msg91';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    const db = getDb();
    const otp = generateOTP();
    const expiresAt = getOTPExpiry();

    // Invalidate any existing unused OTPs for this phone
    db.prepare('UPDATE otp_codes SET is_used = 1 WHERE phone = ? AND is_used = 0').run(phone);

    // Store new OTP
    db.prepare('INSERT INTO otp_codes (phone, code, expires_at) VALUES (?, ?, ?)').run(
      phone, otp, expiresAt
    );

    // Send OTP via MSG91 if configured, otherwise log to console (dev mode)
    if (isMSG91Configured()) {
      const smsResult = await sendOTPviaMSG91(phone, otp);
      if (!smsResult.success) {
        console.error('[SMS] Failed to send OTP:', smsResult.message);
        // Still return success since OTP is stored — user can retry
      }
    } else {
      // Dev mode fallback — OTP printed to server console
      console.log(`[DEV] OTP for ${phone}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // Only expose OTP in development when MSG91 is not configured
      ...(!isMSG91Configured() && process.env.NODE_ENV === 'development' && { devOTP: otp }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    );
  }
}
