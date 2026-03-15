'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  noPadding?: boolean;
  onClick?: () => void;
  glow?: boolean;
  style?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Card({ children, className = '', dark = false, noPadding = false, onClick, glow = false, style }: CardProps) {
  const baseStyles = 'bg-surface-card rounded-card border border-border/40';
  const paddingStyles = noPadding ? '' : 'p-4';
  const clickStyles = onClick ? 'cursor-pointer hover:border-primary/50 hover:shadow-glow transition-all duration-300' : '';
  const glowStyles = glow ? 'shadow-glow animate-glow-pulse' : 'shadow-card';

  return (
    <div
      className={`${baseStyles} ${paddingStyles} ${clickStyles} ${glowStyles} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
