'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { WalletTransaction } from '@/types';

interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  totalTransactions: number;
  isLoading: boolean;
  error: string | null;
}

export function useWallet() {
  const { accessToken } = useAuth();
  const [state, setState] = useState<WalletState>({
    balance: 0,
    transactions: [],
    totalTransactions: 0,
    isLoading: false,
    error: null,
  });

  const authHeaders = useCallback(() => ({
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  }), [accessToken]);

  const fetchBalance = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch('/api/wallet/balance', {
        headers: { 'Authorization': 'Bearer ' + accessToken },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch balance');
      }
      const data = await res.json();
      setState(prev => ({
        ...prev,
        balance: data.balance,
        isLoading: false,
      }));
      return { balance: data.balance, welcome_bonus_available: data.welcome_bonus_available };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch balance';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return null;
    }
  }, [accessToken]);

  const fetchTransactions = useCallback(async (page: number = 1) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch(`/api/wallet/transactions?page=${page}`, {
        headers: { 'Authorization': 'Bearer ' + accessToken },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch transactions');
      }
      const data = await res.json();
      setState(prev => ({
        ...prev,
        transactions: page === 1
          ? data.transactions
          : [...prev.transactions, ...data.transactions],
        totalTransactions: data.total,
        isLoading: false,
      }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return null;
    }
  }, [accessToken]);

  const recharge = useCallback(async (amount: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Step 1: Create payment order
      const createRes = await fetch('/api/wallet/recharge/create', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ amount }),
      });
      if (!createRes.ok) {
        const data = await createRes.json();
        throw new Error(data.error || 'Failed to create recharge order');
      }
      const createData = await createRes.json();

      // Step 2: Verify payment (dev mode auto-completes)
      const verifyRes = await fetch('/api/wallet/recharge/verify', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ payment_order_id: createData.payment_order_id }),
      });
      if (!verifyRes.ok) {
        const data = await verifyRes.json();
        throw new Error(data.error || 'Failed to verify recharge');
      }
      const verifyData = await verifyRes.json();

      setState(prev => ({
        ...prev,
        balance: verifyData.new_balance,
        isLoading: false,
      }));

      return {
        success: true,
        newBalance: verifyData.new_balance,
        bonusApplied: verifyData.bonus_applied,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Recharge failed';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return { success: false, error: message };
    }
  }, [accessToken, authHeaders]);

  const redeemPromo = useCallback(async (code: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch('/api/wallet/promo/redeem', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ promo_code: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to redeem promo code');
      }

      setState(prev => ({
        ...prev,
        balance: data.new_balance,
        isLoading: false,
      }));

      return {
        success: true,
        message: `Rs.${data.amount_credited} added to your wallet!`,
        newBalance: data.new_balance,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to redeem promo code';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return { success: false, message };
    }
  }, [accessToken, authHeaders]);

  const claimWelcomeBonus = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch('/api/wallet/welcome-bonus', {
        method: 'POST',
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to claim welcome bonus');
      }

      setState(prev => ({
        ...prev,
        balance: data.new_balance,
        isLoading: false,
      }));

      return {
        success: true,
        amount: data.amount,
        newBalance: data.new_balance,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to claim welcome bonus';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return { success: false, error: message };
    }
  }, [accessToken, authHeaders]);

  return {
    balance: state.balance,
    transactions: state.transactions,
    totalTransactions: state.totalTransactions,
    isLoading: state.isLoading,
    error: state.error,
    fetchBalance,
    fetchTransactions,
    recharge,
    redeemPromo,
    claimWelcomeBonus,
  };
}
