'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useGreeting } from '@/hooks/useGreeting';
import Avatar from '@/components/ui/Avatar';
import { formatCurrency } from '@/lib/utils';

export default function Header() {
  const { user } = useAuth();
  const greeting = useGreeting();

  return (
    <div className="px-4 py-4 flex items-center justify-between relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 relative z-10">
        <Avatar name={user?.name || 'User'} size="md" />
        <div>
          <p className="text-xs text-text-secondary">{greeting}</p>
          <p className="text-base font-semibold text-text-primary">
            Namaste, <span className="text-primary-light">{user?.name?.split(' ')[0] || 'User'}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-surface-card rounded-pill px-3 py-1.5 shadow-card border border-border/50 relative z-10">
        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" opacity="0.2" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">&#x20B9;</text>
        </svg>
        <span className="text-xs font-semibold text-text-primary">
          {formatCurrency(user?.wallet_balance || 0)}
        </span>
        <Link href="/wallet/recharge" className="ml-1 w-5 h-5 bg-gradient-to-r from-accent to-accent-light text-black rounded-full flex items-center justify-center text-xs font-bold shadow-glow-gold hover:shadow-elevated transition-all">
          +
        </Link>
      </div>
    </div>
  );
}
