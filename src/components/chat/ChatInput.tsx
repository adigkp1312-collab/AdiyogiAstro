'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  isSending?: boolean;
}

export default function ChatInput({ onSend, disabled = false, isSending = false }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled || isSending) return;
    onSend(trimmed);
    setText('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = disabled || isSending;
  const hasText = text.trim().length > 0;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-surface-card/95 backdrop-blur-xl border-t border-border/30 px-3 py-2.5 safe-area-bottom z-20">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isDisabled}
            rows={1}
            className="w-full bg-surface-elevated/60 border border-border/40 rounded-button px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 resize-none focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200 disabled:opacity-50"
            style={{ maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={isDisabled || !hasText}
          className={`flex-shrink-0 w-10 h-10 rounded-button flex items-center justify-center transition-all duration-300 ${
            hasText && !isDisabled
              ? 'bg-primary text-white shadow-glow-sm hover:shadow-glow active:scale-95'
              : 'bg-surface-elevated text-text-secondary/50 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
