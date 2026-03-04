'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import KundliWatermark from '@/components/ui/KundliWatermark';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendOTP } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    const result = await sendOTP(cleanPhone);
    setLoading(false);

    if (result.success) {
      router.push(`/auth/verify?phone=${cleanPhone}`);
    } else {
      setError(result.error || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col starfield">
      {/* Kundli watermark behind login */}
      <KundliWatermark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.04} size={520} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full relative z-10">
        {/* Cosmic glow orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-5 w-24 h-24 bg-accent/10 rounded-full blur-3xl" />

        {/* Logo Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-glow animate-float">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-text-primary text-glow">Nakshatra</h1>
          <p className="text-text-secondary mt-2 text-sm">
            Vedic Astrology & Personalized Horoscope
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full glass-card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Welcome</h2>
          <p className="text-sm text-text-secondary mb-6">
            Enter your phone number to begin your cosmic journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-surface-elevated rounded-button border border-border text-sm text-text-secondary">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(val);
                    setError('');
                  }}
                  error={error}
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
              disabled={loading || phone.length < 10}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>

          <p className="text-xs text-text-secondary text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Dev hint */}
        <div className="mt-6 bg-primary/10 border border-primary/30 rounded-button p-3 text-xs text-primary-light text-center">
          <strong>Dev Mode:</strong> Use any 10-digit number and OTP <strong className="text-accent">123456</strong>
        </div>
      </div>
    </div>
  );
}
