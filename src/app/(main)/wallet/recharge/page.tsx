'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import KundliWatermark from '@/components/ui/KundliWatermark';
import RechargeCard from '@/components/wallet/RechargeCard';
import PromoCodeInput from '@/components/wallet/PromoCodeInput';
import { useWallet } from '@/hooks/useWallet';
import { RECHARGE_OPTIONS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function RechargePage() {
  const router = useRouter();
  const { balance, isLoading, fetchBalance, recharge, redeemPromo } = useWallet();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handlePay = async () => {
    if (!selectedAmount) return;
    setIsProcessing(true);

    const result = await recharge(selectedAmount);

    if (result.success) {
      const bonus = result.bonusApplied || 0;
      const bonusText = bonus > 0 ? ` (+ \u20B9${bonus} bonus)` : '';
      setToast({
        message: `\u20B9${selectedAmount}${bonusText} added to wallet!`,
        type: 'success',
      });
      setSelectedAmount(null);
      // Refresh balance
      fetchBalance();
    } else {
      setToast({
        message: result.error || 'Recharge failed. Please try again.',
        type: 'error',
      });
    }

    setIsProcessing(false);
  };

  const handlePromoApply = async (code: string) => {
    const result = await redeemPromo(code);
    if (result.success) {
      fetchBalance();
    }
    return { success: result.success, message: result.message };
  };

  return (
    <div className="bg-background min-h-screen starfield relative">
      {/* Kundli watermark backgrounds */}
      <KundliWatermark className="top-40 -right-20" opacity={0.03} size={400} />
      <KundliWatermark className="bottom-20 -left-24" opacity={0.025} size={350} color="#F59E0B" />

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/20">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => window.history.length > 1 ? router.back() : router.push('/home')}
              className="w-9 h-9 rounded-full bg-surface-card border border-border/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/40 transition-all duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4L6 9L11 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-text-primary">Recharge Wallet</h1>
          </div>
        </div>

        {/* Current Balance */}
        <div className="px-4 pt-6 pb-4">
          <div className="bg-surface-card border border-border/40 rounded-card p-5 text-center shadow-glow-sm">
            <p className="text-sm text-text-secondary mb-1">Current Balance</p>
            <p className="text-3xl font-bold text-text-primary">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {formatCurrency(balance)}
              </span>
            </p>
          </div>
        </div>

        {/* Recharge Options */}
        <div className="px-4 pb-4">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Select Amount
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {RECHARGE_OPTIONS.map((option) => (
              <RechargeCard
                key={option.amount}
                amount={option.amount}
                label={option.label}
                bonus={option.bonus}
                popular={'popular' in option ? option.popular : undefined}
                selected={selectedAmount === option.amount}
                onSelect={() => setSelectedAmount(option.amount)}
              />
            ))}
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="px-4 pb-6">
          <div className="bg-surface-card border border-border/40 rounded-card p-4">
            <PromoCodeInput onApply={handlePromoApply} />
          </div>
        </div>

        {/* Proceed to Pay Button */}
        <div className="px-4 pb-8">
          <Button
            variant="cosmic"
            size="lg"
            fullWidth
            disabled={!selectedAmount || isProcessing || isLoading}
            onClick={handlePay}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : selectedAmount ? (
              `Pay \u20B9${selectedAmount}`
            ) : (
              'Select an Amount'
            )}
          </Button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-24 left-4 right-4 z-50 animate-slide-up">
          <div
            className={`rounded-card px-4 py-3 text-sm font-medium text-center shadow-elevated ${
              toast.type === 'success'
                ? 'bg-positive/90 text-white'
                : 'bg-negative/90 text-white'
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
