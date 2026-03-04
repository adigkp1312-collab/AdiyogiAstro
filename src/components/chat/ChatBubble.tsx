'use client';

import React from 'react';
import type { Message } from '@/types';
import { formatDateTime } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';

interface ChatBubbleProps {
  message: Message;
  isUser: boolean;
  astrologerName?: string;
  isAI?: boolean;
}

export default function ChatBubble({ message, isUser, astrologerName, isAI }: ChatBubbleProps) {
  // System messages
  if (message.sender_type === 'system') {
    return (
      <div className="flex justify-center py-2 animate-fade-in">
        <div className="px-4 py-1.5 rounded-pill">
          <p className="text-text-secondary text-xs italic text-center">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // User messages - right-aligned
  if (isUser) {
    return (
      <div className="flex justify-end mb-3 animate-slide-up">
        <div className="max-w-[80%] flex flex-col items-end">
          <div className="bg-primary text-white px-4 py-2.5 rounded-tl-2xl rounded-bl-2xl rounded-tr-sm rounded-br-2xl shadow-glow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] text-text-secondary mt-1 mr-1">
            {formatDateTime(message.created_at)}
          </span>
        </div>
      </div>
    );
  }

  // Astrologer messages - left-aligned
  return (
    <div className="flex gap-2 mb-3 animate-slide-up">
      <div className="flex-shrink-0 mt-1">
        <Avatar name={astrologerName} size="sm" isAI={isAI} />
      </div>
      <div className="max-w-[80%] flex flex-col items-start">
        <div className="bg-surface-card border border-border/40 px-4 py-2.5 rounded-tr-2xl rounded-br-2xl rounded-tl-sm rounded-bl-2xl">
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        <span className="text-[10px] text-text-secondary mt-1 ml-1">
          {formatDateTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}
