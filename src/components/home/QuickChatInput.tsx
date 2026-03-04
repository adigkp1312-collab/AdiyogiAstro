'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';

export default function QuickChatInput() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      router.push('/chat');
    }
  };

  return (
    <div className="mx-4 mt-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-surface-card rounded-card p-2 border border-border/40 shadow-card hover:border-primary/30 transition-all duration-300">
        <Avatar name="AI Riya" size="md" isAI />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask any question..."
          className="flex-1 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none bg-transparent"
        />
        <button
          type="submit"
          className="w-9 h-9 bg-gradient-to-r from-primary to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 hover:shadow-glow transition-all duration-300"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
