'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function WelcomeGiftBanner() {
  const { user, accessToken, refreshUser } = useAuth();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  // Hide if already claimed
  if (user?.welcome_bonus_claimed || claimed) {
    return (
      <div className="mx-4 mt-4 rounded-card border border-positive/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-positive/5 via-surface-card to-positive/10" />
        <div className="relative p-4 text-center">
          <p className="text-sm text-positive font-semibold flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Welcome bonus claimed! Rs.50 added to wallet
          </p>
        </div>
      </div>
    );
  }

  const handleClaim = async () => {
    if (claiming) return;
    setClaiming(true);
    try {
      const res = await fetch('/api/wallet/welcome-bonus', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        setClaimed(true);
        refreshUser();
      }
    } catch {
      // Silently fail
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="mx-4 mt-4 rounded-card border border-accent/20 relative overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-surface-card to-accent/10" />
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />

      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/15 rounded-full flex items-center justify-center border border-accent/30">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 00-3-3c-1.05 0-1.95.56-2.47 1.37L12 4.16l-.53-.79A2.99 2.99 0 009 2a3 3 0 00-3 3c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">Welcome Gift</p>
              <p className="text-xs text-text-secondary">Claim Rs.50 free credits!</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="discount" size="sm">FREE</Badge>
            <Button
              variant="accent"
              size="sm"
              className="mt-1.5"
              onClick={handleClaim}
              disabled={claiming}
            >
              {claiming ? 'Claiming...' : 'Claim Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
