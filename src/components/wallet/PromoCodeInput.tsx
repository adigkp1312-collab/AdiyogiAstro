'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface PromoCodeInputProps {
  onApply: (code: string) => Promise<{ success: boolean; message: string }>;
}

export default function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;
    setIsApplying(true);
    setResult(null);

    try {
      const res = await onApply(code.trim());
      setResult(res);
      if (res.success) {
        setCode('');
      }
    } catch {
      setResult({ success: false, message: 'Something went wrong. Try again.' });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Have a promo code?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            if (result) setResult(null);
          }}
          placeholder="Enter code"
          className="flex-1 px-4 py-2.5 rounded-button border border-border bg-surface-card text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300 text-sm uppercase tracking-wider"
          maxLength={20}
          disabled={isApplying}
        />
        <Button
          variant="outline"
          size="md"
          onClick={handleApply}
          disabled={!code.trim() || isApplying}
        >
          {isApplying ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Applying
            </span>
          ) : (
            'Apply'
          )}
        </Button>
      </div>

      {/* Result message */}
      {result && (
        <p
          className={`text-xs font-medium animate-fade-in ${
            result.success ? 'text-positive' : 'text-negative'
          }`}
        >
          {result.success ? (
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7L6 10L11 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {result.message}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 4L10 10M10 4L4 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {result.message}
            </span>
          )}
        </p>
      )}
    </div>
  );
}
