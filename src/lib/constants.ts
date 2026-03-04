export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 5;
export const DEV_OTP = '123456';

export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';

export const MOON_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export const DASHA_PLANETS = [
  'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter',
  'Saturn', 'Mercury', 'Ketu', 'Venus'
] as const;

export const LIFE_AREAS = ['Love', 'Career', 'Money', 'Health'] as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/home', icon: 'home' },
  { label: 'My Life', href: '/mylife', icon: 'mylife' },
  { label: 'Chat', href: '/chat', icon: 'chat' },
] as const;

// ========== Sprint 2: Chat + Wallet + Payment Constants ==========

export const CHAT_POLL_INTERVAL_MS = 3000;
export const AI_RESPONSE_DELAY_MIN_MS = 2000;
export const AI_RESPONSE_DELAY_MAX_MS = 5000;
export const DEFAULT_WELCOME_BONUS = 50;
export const MIN_CHAT_BALANCE = 10;
export const ITEMS_PER_PAGE = 20;

export const RECHARGE_OPTIONS = [
  { amount: 50, label: '\u20B950', bonus: 0 },
  { amount: 100, label: '\u20B9100', bonus: 0, popular: true },
  { amount: 200, label: '\u20B9200', bonus: 20 },
  { amount: 500, label: '\u20B9500', bonus: 75 },
  { amount: 1000, label: '\u20B91,000', bonus: 200 },
] as const;

// Razorpay config - dev mode when no real key is set
export const DEV_PAYMENT_MODE = true; // Set to false and configure env vars for real Razorpay
