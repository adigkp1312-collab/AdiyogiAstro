'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import KundliWatermark from '@/components/ui/KundliWatermark';

function VerifyContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, sendOTP } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';

  useEffect(() => {
    if (!phone) {
      router.replace('/auth/login');
      return;
    }
    // In dev mode, auto-fill OTP after a short delay
    if (process.env.NODE_ENV === 'development') {
      const devOtp = '123456'.split('');
      setTimeout(() => {
        setOtp(devOtp);
        inputRefs.current[5]?.focus();
        // Auto-verify after filling
        handleVerify('123456');
      }, 500);
    } else {
      inputRefs.current[0]?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, router]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    }
  };

  const handleVerify = async (otpCode: string) => {
    setLoading(true);
    const result = await verifyOTP(phone, otpCode);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.isNewUser) {
      router.push('/auth/register');
    } else {
      router.push('/home');
    }
  };

  const handleResend = async () => {
    setResendTimer(30);
    setError('');
    setOtp(['', '', '', '', '', '']);
    await sendOTP(phone);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col starfield">
      {/* Kundli watermark */}
      <KundliWatermark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.03} size={450} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full relative z-10">
        {/* Cosmic glow */}
        <div className="absolute top-32 right-10 w-28 h-28 bg-primary/10 rounded-full blur-3xl" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="self-start mb-8 text-text-secondary hover:text-primary-light flex items-center gap-1 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="w-full glass-card p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-text-primary mb-1">Verify OTP</h2>
          <p className="text-sm text-text-secondary mb-6">
            Enter the 6-digit code sent to <strong className="text-primary-light">+91 {phone}</strong>
          </p>

          {/* OTP Input */}
          <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-button bg-surface-card text-text-primary focus:outline-none transition-all duration-300 ${
                  error ? 'border-negative' : digit ? 'border-primary shadow-glow-sm' : 'border-border'
                } focus:border-primary focus:shadow-glow-sm`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-negative text-center mb-4">{error}</p>
          )}

          {loading && (
            <div className="flex justify-center mb-4">
              <svg className="animate-spin w-6 h-6 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}

          {/* Resend */}
          <div className="text-center mt-4">
            {resendTimer > 0 ? (
              <p className="text-sm text-text-secondary">
                Resend OTP in <span className="font-semibold text-primary">{resendTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm font-semibold text-accent hover:text-accent-light transition-colors"
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-primary/10 border border-primary/30 rounded-button p-3 text-xs text-primary-light text-center">
          <strong>Dev Mode:</strong> Enter <strong className="text-accent">123456</strong>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-text-secondary">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
