'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface InsufficientBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  requiredAmount: number;
}

export default function InsufficientBalanceModal({
  isOpen,
  onClose,
  currentBalance,
  requiredAmount,
}: InsufficientBalanceModalProps) {
  if (!isOpen) return null;

  const shortfall = requiredAmount - currentBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-surface-card border border-border/40 rounded-card p-6 shadow-elevated animate-slide-up">
        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 10V16M14 20H14.01M5.072 22H22.928C24.468 22 25.428 20.333 24.658 19L15.73 4C14.96 2.667 13.04 2.667 12.27 4L3.342 19C2.572 20.333 3.532 22 5.072 22Z"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-text-primary text-center mb-2">
          Insufficient Balance
        </h3>

        {/* Message */}
        <p className="text-sm text-text-secondary text-center mb-5">
          You need at least {formatCurrency(requiredAmount)} to continue. Your current balance is {formatCurrency(currentBalance)}.
        </p>

        {/* Balance details */}
        <div className="bg-surface-elevated rounded-button p-3 mb-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Current Balance</span>
            <span className="text-text-primary font-medium">{formatCurrency(currentBalance)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Required Amount</span>
            <span className="text-text-primary font-medium">{formatCurrency(requiredAmount)}</span>
          </div>
          <div className="border-t border-border/30 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shortfall</span>
              <span className="text-negative font-bold">{formatCurrency(shortfall)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
          <Link href="/wallet/recharge" className="flex-1">
            <Button variant="cosmic" size="lg" fullWidth>
              Recharge Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
