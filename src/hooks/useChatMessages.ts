'use client';

import { useState, useCallback, useRef } from 'react';
import { usePolling } from './usePolling';
import type { Message } from '@/types';
import { CHAT_POLL_INTERVAL_MS } from '@/lib/constants';

interface ChatPollResult {
  messages: Message[];
  order_status: string;
}

export function useChatMessages(
  orderId: number,
  accessToken: string | null,
  enabled: boolean = true
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>('active');
  const [isSending, setIsSending] = useState(false);
  const lastMessageIdRef = useRef<number>(0);

  const fetchMessages = useCallback(async (): Promise<ChatPollResult | null> => {
    if (!accessToken) return null;

    const afterParam = lastMessageIdRef.current > 0 ? `?after=${lastMessageIdRef.current}` : '';
    const res = await fetch(`/api/chat/${orderId}/messages${afterParam}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch messages');
    }

    const data = await res.json();
    const newMessages: Message[] = data.messages || [];

    if (newMessages.length > 0) {
      // Update the last message ID for incremental polling
      const maxId = Math.max(...newMessages.map((m: Message) => m.id));
      lastMessageIdRef.current = maxId;

      // Accumulate messages in state
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const uniqueNew = newMessages.filter((m: Message) => !existingIds.has(m.id));
        return [...prev, ...uniqueNew];
      });
    }

    if (data.order_status) {
      setOrderStatus(data.order_status);
    }

    return data;
  }, [orderId, accessToken]);

  // Only poll when enabled and chat is active
  const shouldPoll = enabled && orderStatus === 'active';

  const { isLoading, refresh } = usePolling<ChatPollResult>(
    fetchMessages,
    CHAT_POLL_INTERVAL_MS,
    shouldPoll
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!accessToken || isSending) return;

      setIsSending(true);
      try {
        const res = await fetch(`/api/chat/${orderId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) {
          throw new Error('Failed to send message');
        }

        const data = await res.json();
        const sentMessage: Message = data.message;

        // Immediately add sent message to state
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          if (existingIds.has(sentMessage.id)) return prev;
          return [...prev, sentMessage];
        });

        // Update last message ID
        if (sentMessage.id > lastMessageIdRef.current) {
          lastMessageIdRef.current = sentMessage.id;
        }

        // Trigger a refresh to quickly pick up AI responses
        setTimeout(() => refresh(), 1500);
      } catch (err) {
        console.error('Failed to send message:', err);
      } finally {
        setIsSending(false);
      }
    },
    [orderId, accessToken, isSending, refresh]
  );

  return {
    messages,
    orderStatus,
    isLoading,
    sendMessage,
    isSending,
  };
}
