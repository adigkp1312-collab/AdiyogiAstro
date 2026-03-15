'use client';

import React from 'react';
import type { WalletTransaction } from '@/types';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';

interface TransactionItemProps {
  transaction: WalletTransaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit';

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/20 last:border-b-0">
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isCredit
            ? 'bg-positive/15 text-positive'
            : 'bg-negative/15 text-negative'
        }`}
      >
        {isCredit ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 14V4M9 4L5 8M9 4L13 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 4V14M9 14L5 10M9 14L13 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Description and date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {transaction.description || (isCredit ? 'Wallet Credit' : 'Wallet Debit')}
        </p>
        <p className="text-xs text-text-secondary mt-0.5">
          {formatRelativeTime(transaction.created_at)}
        </p>
      </div>

      {/* Amount and balance after */}
      <div className="flex-shrink-0 text-right">
        <p
          className={`text-sm font-bold ${
            isCredit ? 'text-positive' : 'text-negative'
          }`}
        >
          {isCredit ? '+' : '-'} {formatCurrency(transaction.amount)}
        </p>
        <p className="text-[10px] text-text-secondary mt-0.5">
          Bal: {formatCurrency(transaction.balance_after)}
        </p>
      </div>
    </div>
  );
}
