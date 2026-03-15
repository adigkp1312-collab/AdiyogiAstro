'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import KundliWatermark from '@/components/ui/KundliWatermark';
import TransactionItem from '@/components/wallet/TransactionItem';
import Button from '@/components/ui/Button';
import { useWallet } from '@/hooks/useWallet';

export default function TransactionHistoryPage() {
  const router = useRouter();
  const { transactions, totalTransactions, isLoading, fetchTransactions } = useWallet();
  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchTransactions(1).then(() => setInitialLoad(false));
  }, [fetchTransactions]);

  const hasMore = transactions.length < totalTransactions;

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage);
  }, [page, fetchTransactions]);

  return (
    <div className="bg-background min-h-screen starfield relative">
      {/* Kundli watermark backgrounds */}
      <KundliWatermark className="top-60 -left-20" opacity={0.03} size={400} />
      <KundliWatermark className="bottom-40 -right-24" opacity={0.02} size={350} color="#F59E0B" />

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
            <h1 className="text-lg font-bold text-text-primary">Transaction History</h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-4 pb-8">
          {/* Loading state for initial load */}
          {initialLoad && isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin shadow-glow-sm mb-3" />
              <p className="text-sm text-text-secondary">Loading transactions...</p>
            </div>
          )}

          {/* Empty state */}
          {!initialLoad && transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-card border border-border/40 flex items-center justify-center mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 3V7M14 21V25M5 14H1M27 14H23M7.05 7.05L4.222 4.222M23.778 23.778L20.95 20.95M7.05 20.95L4.222 23.778M23.778 4.222L20.95 7.05"
                    stroke="#8B8AA0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="14"
                    cy="14"
                    r="5"
                    stroke="#8B8AA0"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">
                No Transactions Yet
              </h3>
              <p className="text-sm text-text-secondary max-w-xs">
                Your wallet transactions will appear here once you recharge or use your balance.
              </p>
            </div>
          )}

          {/* Transaction list */}
          {!initialLoad && transactions.length > 0 && (
            <div className="bg-surface-card border border-border/40 rounded-card overflow-hidden">
              {transactions.map((txn) => (
                <TransactionItem key={txn.id} transaction={txn} />
              ))}
            </div>
          )}

          {/* Load more button */}
          {!initialLoad && hasMore && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="secondary"
                size="md"
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}

          {/* All loaded indicator */}
          {!initialLoad && transactions.length > 0 && !hasMore && (
            <p className="text-center text-xs text-text-secondary mt-4">
              All transactions loaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
