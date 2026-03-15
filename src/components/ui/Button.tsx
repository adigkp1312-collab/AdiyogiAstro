'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'cosmic';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 active:scale-[0.97]';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-glow-sm hover:shadow-glow',
    secondary: 'bg-surface-card text-text-primary hover:bg-surface-elevated border border-border/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-card',
    accent: 'bg-gradient-to-r from-accent to-accent-light text-black font-bold hover:from-accent-dark hover:to-accent shadow-glow-gold',
    cosmic: 'bg-gradient-to-r from-primary via-purple-500 to-indigo-500 text-white shadow-glow hover:shadow-elevated',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  const radiusClass = pill ? 'rounded-pill' : 'rounded-button';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusClass} ${widthClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
      {...props}
    >
      {children}
    </button>
  );
}
