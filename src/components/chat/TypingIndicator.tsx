'use client';

import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3 animate-fade-in">
      {/* Small placeholder for avatar spacing */}
      <div className="flex-shrink-0 w-8 h-8" />
      <div className="bg-surface-card border border-border/40 px-4 py-3 rounded-tr-2xl rounded-br-2xl rounded-tl-sm rounded-bl-2xl">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span
              className="w-2 h-2 bg-text-secondary/60 rounded-full animate-bounce"
              style={{ animationDelay: '0ms', animationDuration: '1.2s' }}
            />
            <span
              className="w-2 h-2 bg-text-secondary/60 rounded-full animate-bounce"
              style={{ animationDelay: '200ms', animationDuration: '1.2s' }}
            />
            <span
              className="w-2 h-2 bg-text-secondary/60 rounded-full animate-bounce"
              style={{ animationDelay: '400ms', animationDuration: '1.2s' }}
            />
          </div>
          <span className="text-[11px] text-text-secondary ml-1">typing...</span>
        </div>
      </div>
    </div>
  );
}
