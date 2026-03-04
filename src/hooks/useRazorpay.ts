'use client';

import { useState, useCallback } from 'react';

interface CheckoutOptions {
  amount: number;
  orderId?: string;
  description?: string;
}

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openCheckout = useCallback(async (_options: CheckoutOptions): Promise<{ success: true }> => {
    setIsLoading(true);
    try {
      // Dev mode: payment auto-succeeds without loading Razorpay script
      // Simulate a brief delay to feel like a real payment flow
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { openCheckout, isLoading };
}
