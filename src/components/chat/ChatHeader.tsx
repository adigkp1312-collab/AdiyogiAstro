'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';

interface ChatHeaderProps {
  astrologerName: string;
  isAI: boolean;
  elapsed: string;
  onEndChat: () => void;
}

export default function ChatHeader({ astrologerName, isAI, elapsed, onEndChat }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 right-0 bg-surface-card/95 backdrop-blur-xl border-b border-border/30 px-3 py-2.5 z-20">
      <div className="flex items-center gap-3">
        {/* Back button */}
        <button
          onClick={() => router.push('/chat')}
          className="flex-shrink-0 w-8 h-8 rounded-button flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19L5 12L12 5" />
          </svg>
        </button>

        {/* Astrologer info */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Avatar name={astrologerName} size="sm" isAI={isAI} />
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-text-primary truncate">
              {astrologerName}
            </h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
              <span className="text-[11px] text-positive">Online</span>
            </div>
          </div>
        </div>

        {/* Session timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-surface-elevated/80 border border-border/30">
          <div className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
          <span className="text-xs font-mono text-text-primary">{elapsed}</span>
        </div>

        {/* End chat button */}
        <button
          onClick={onEndChat}
          className="flex-shrink-0 px-3 py-1.5 rounded-button bg-negative/15 text-negative text-xs font-semibold hover:bg-negative/25 transition-all duration-200 active:scale-95"
        >
          End
        </button>
      </div>
    </div>
  );
}
