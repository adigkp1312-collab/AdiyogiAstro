'use client';

import React from 'react';
import Badge from '@/components/ui/Badge';

interface RechargeCardProps {
  amount: number;
  label: string;
  bonus?: number;
  popular?: boolean;
  selected: boolean;
  onSelect: () => void;
}

export default function RechargeCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  amount,
  label,
  bonus,
  popular,
  selected,
  onSelect,
}: RechargeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col items-center justify-center p-4 rounded-card border-2 transition-all duration-300 active:scale-[0.97] min-h-[100px] ${
        selected
          ? 'border-primary shadow-glow-sm bg-primary/10'
          : 'border-border/40 bg-surface-card hover:border-primary/30 hover:bg-surface-elevated'
      }`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <Badge variant="info" size="sm">
            Popular
          </Badge>
        </div>
      )}

      {/* Amount */}
      <span
        className={`text-xl font-bold transition-colors duration-300 ${
          selected ? 'text-primary-light' : 'text-text-primary'
        }`}
      >
        {label}
      </span>

      {/* Bonus */}
      {bonus && bonus > 0 ? (
        <span className="mt-1 text-xs font-medium text-positive">
          + \u20B9{bonus} bonus
        </span>
      ) : null}

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
