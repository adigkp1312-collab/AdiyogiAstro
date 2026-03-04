'use client';

import Button from '@/components/ui/Button';

export default function PromoBanner() {
  return (
    <div className="mx-4 rounded-card relative overflow-hidden border border-primary/30">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-purple-600 to-indigo-600" />
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -left-5 -top-10 w-28 h-28 bg-white/5 rounded-full blur-2xl" />

      <div className="relative p-5">
        <p className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-1">
          On Your First Recharge
        </p>
        <h3 className="text-2xl font-bold text-white mb-1 text-glow">
          150% <span className="text-lg text-accent">BONUS*</span>
        </h3>
        <p className="text-xs text-white/70 mb-3">
          Top up your wallet and get extra credits for consultations
        </p>
        <Button variant="accent" size="sm">
          Recharge Now
        </Button>
      </div>
    </div>
  );
}
