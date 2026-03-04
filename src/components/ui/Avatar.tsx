'use client';

import React from 'react';

interface AvatarProps {
  name?: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isAI?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

export default function Avatar({ name, src, size = 'md', isAI = false, className = '' }: AvatarProps) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const bgColors = [
    'bg-purple-900/60 text-purple-300',
    'bg-indigo-900/60 text-indigo-300',
    'bg-blue-900/60 text-blue-300',
    'bg-violet-900/60 text-violet-300',
    'bg-fuchsia-900/60 text-fuchsia-300',
  ];

  const colorIndex = name ? name.charCodeAt(0) % bgColors.length : 0;

  if (src) {
    return (
      <div className={`${sizeMap[size]} rounded-full overflow-hidden flex-shrink-0 relative ring-2 ring-border ${className}`}>
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
        {isAI && (
          <div className="absolute -bottom-0.5 -right-0.5 bg-accent text-black text-[8px] font-bold px-1 rounded-sm">
            AI
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} rounded-full flex items-center justify-center font-semibold flex-shrink-0 relative ${isAI ? 'bg-gradient-to-br from-primary to-indigo-600 text-white shadow-glow-sm ring-2 ring-primary/50' : `${bgColors[colorIndex]} ring-2 ring-border`} ${className}`}>
      {isAI ? (
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
          <path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6" />
          <circle cx="12" cy="6" r="1" fill="currentColor" />
        </svg>
      ) : (
        initials
      )}
    </div>
  );
}
