'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function CurrentDasha() {
  const { user } = useAuth();

  return (
    <div className="mx-4 mt-3 relative overflow-hidden rounded-card border border-border/40">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/5 to-accent/10" />
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

      <div className="relative p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
            Your Current Dasha
          </p>
          <p className="text-sm font-bold text-primary-light mt-0.5">
            {user?.current_dasha || 'Mercury Pratyantardasha'}
          </p>
        </div>
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        </div>
      </div>
    </div>
  );
}
