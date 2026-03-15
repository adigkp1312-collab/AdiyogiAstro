import { DEV_OTP, OTP_EXPIRY_MINUTES } from '../constants';

export function generateOTP(): string {
  if (process.env.NODE_ENV === 'development') {
    return DEV_OTP;
  }
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOTPExpiry(): string {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES);
  return expiry.toISOString();
}

export function isOTPExpired(expiresAt: string): boolean {
  return new Date() > new Date(expiresAt);
}

export function verifyOTP(stored: string, provided: string): boolean {
  return stored === provided;
}
