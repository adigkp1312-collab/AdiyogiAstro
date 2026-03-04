'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'favourable' | 'neutral' | 'unfavourable' | 'discount' | 'info' | 'free';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'info', size = 'sm', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-semibold rounded-badge';

  const variants = {
    favourable: 'bg-positive/20 text-positive border border-positive/40',
    neutral: 'bg-accent/20 text-accent border border-accent/40',
    unfavourable: 'bg-negative/20 text-negative border border-negative/40',
    discount: 'bg-gradient-to-r from-negative to-rose-600 text-white',
    info: 'bg-primary/20 text-primary-light border border-primary/40',
    free: 'bg-gradient-to-r from-positive to-emerald-400 text-white',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
