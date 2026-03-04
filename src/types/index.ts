export interface User {
  id: number;
  phone: string;
  name: string | null;
  email: string | null;
  dob: string | null;
  tob: string | null;
  pob_city: string | null;
  pob_lat: number | null;
  pob_lng: number | null;
  moon_sign: string | null;
  current_dasha: string | null;
  profile_pic_url: string | null;
  wallet_balance: number;
  language_pref: string;
  is_active: number;
  welcome_bonus_claimed: number;
  created_at: string;
  updated_at: string;
}

export interface Astrologer {
  id: number;
  name: string;
  photo_url: string | null;
  specializations: string[];
  experience_years: number | null;
  languages: string[];
  total_orders: number;
  total_chats: number;
  rating: number;
  price_per_min: number | null;
  price_per_chat: number | null;
  discount_percent: number;
  is_ai: boolean;
  is_verified: boolean;
  is_available: boolean;
  bio: string | null;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  astrologer_id: number;
  type: 'chat' | 'call';
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  duration_minutes: number | null;
  amount: number | null;
  created_at: string;
  completed_at: string | null;
}

export interface WalletTransaction {
  id: number;
  user_id: number;
  type: 'credit' | 'debit';
  amount: number;
  balance_after: number;
  description: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string | null;
  type: string | null;
  value: number | null;
  image_url: string | null;
  promo_code: string | null;
  is_active: number;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

export interface OTPCode {
  id: number;
  phone: string;
  code: string;
  expires_at: string;
  is_used: number;
  created_at: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationData {
  name: string;
  dob: string;
  tob: string;
  pob_city: string;
  pob_lat?: number;
  pob_lng?: number;
}

export interface LifeArea {
  name: 'Love' | 'Career' | 'Money' | 'Health';
  status: 'favourable' | 'neutral' | 'unfavourable';
  title: string;
  reading: string;
  icon: string;
}

export interface DailyHoroscope {
  title: string;
  content: string;
  lucky_number: number;
  lucky_color: string;
  life_areas: LifeArea[];
}

// ========== Sprint 2: Chat + Wallet + Payment Types ==========

export interface Message {
  id: number;
  order_id: number;
  sender_type: 'user' | 'astrologer' | 'system';
  sender_id: number;
  content: string;
  is_read: number;
  created_at: string;
}

export interface PaymentOrder {
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

export interface PromoRedemption {
  id: number;
  user_id: number;
  promotion_id: number;
  amount: number;
  created_at: string;
}

export interface OrderFeedback {
  id: number;
  order_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface ChatSession {
  order: Order;
  astrologer: Astrologer;
  messages: Message[];
}

export interface RechargeOption {
  amount: number;
  label: string;
  bonus?: number;
  popular?: boolean;
}

// Razorpay client-side types
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
