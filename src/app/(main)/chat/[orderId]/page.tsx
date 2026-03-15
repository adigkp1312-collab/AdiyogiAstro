'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useSessionTimer } from '@/hooks/useSessionTimer';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ChatEndModal from '@/components/chat/ChatEndModal';
import KundliWatermark from '@/components/ui/KundliWatermark';
import type { Astrologer, Order } from '@/types';
import { formatDuration } from '@/lib/utils';

export default function ChatConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { accessToken, user } = useAuth();

  const orderId = Number(params.orderId);

  // State
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [chatEnded, setChatEnded] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [endSummary, setEndSummary] = useState<{
    duration_minutes: number;
    amount_charged: number;
  } | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Chat messages hook
  const {
    messages,
    orderStatus,
    isLoading,
    sendMessage,
    isSending,
  } = useChatMessages(orderId, accessToken, !chatEnded);

  // Session timer
  const { formatted: elapsedFormatted } = useSessionTimer(
    order?.created_at || null,
    orderStatus === 'active' && !chatEnded
  );

  // Fetch initial order and astrologer info on mount
  useEffect(() => {
    if (!accessToken || isNaN(orderId)) return;

    const fetchInitialData = async () => {
      try {
        // Fetch messages to get order info
        const messagesRes = await fetch(`/api/chat/${orderId}/messages`, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!messagesRes.ok) {
          setInitError('Failed to load chat session');
          return;
        }

        const messagesData = await messagesRes.json();

        // If order is already completed, mark chat as ended
        if (messagesData.order_status === 'completed' || messagesData.order_status === 'cancelled') {
          setChatEnded(true);
        }

        // Fetch all astrologers to find the one for this order
        const astrologersRes = await fetch('/api/astrologers?filter=all');
        if (astrologersRes.ok) {
          const astrologersData = await astrologersRes.json();

          // We need order info to find the astrologer
          // Try fetching order details from the messages endpoint context
          // The order_id is known, so we need to find the astrologer_id
          // We'll store all astrologers and match later
          const allAstrologers: Astrologer[] = astrologersData.astrologers || [];

          // For now store the first AI astrologer as fallback
          // The actual astrologer_id comes from the order which we get via a separate mechanism
          // Since our API doesn't expose a direct order endpoint, we use the start API's stored data
          // Let's check localStorage for the order info
          const storedOrderData = sessionStorage.getItem(`chat_order_${orderId}`);
          if (storedOrderData) {
            const parsed = JSON.parse(storedOrderData);
            setOrder(parsed.order || null);
            const matchedAstrologer = allAstrologers.find(
              (a: Astrologer) => a.id === (parsed.astrologer?.id || parsed.order?.astrologer_id)
            );
            if (matchedAstrologer) {
              setAstrologer(matchedAstrologer);
            } else if (parsed.astrologer) {
              setAstrologer(parsed.astrologer);
            }
          } else {
            // Fallback: try to determine from messages (astrologer sender)
            const astrologerMessages = (messagesData.messages || []).filter(
              (m: { sender_type: string }) => m.sender_type === 'astrologer'
            );
            if (astrologerMessages.length > 0) {
              const astrologerId = astrologerMessages[0].sender_id;
              const matched = allAstrologers.find((a: Astrologer) => a.id === astrologerId);
              if (matched) {
                setAstrologer(matched);
              }
            }

            // Create a minimal order object
            setOrder({
              id: orderId,
              user_id: user?.id || 0,
              astrologer_id: astrologer?.id || 0,
              type: 'chat',
              status: messagesData.order_status || 'active',
              duration_minutes: null,
              amount: null,
              created_at: messagesData.messages?.[0]?.created_at || new Date().toISOString(),
              completed_at: null,
            });
          }
        }
      } catch (err) {
        console.error('Failed to load chat data:', err);
        setInitError('Failed to load chat session');
      }
    };

    fetchInitialData();
  }, [accessToken, orderId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Detect if order status changed to completed externally
  useEffect(() => {
    if (orderStatus === 'completed' || orderStatus === 'cancelled') {
      setChatEnded(true);
    }
  }, [orderStatus]);

  // Determine if we should show the typing indicator
  const showTyping = (() => {
    if (chatEnded || messages.length === 0) return false;
    const lastMessage = messages[messages.length - 1];
    return lastMessage.sender_type === 'user';
  })();

  // End chat handler
  const handleEndChat = useCallback(async () => {
    if (!accessToken || isEnding) return;

    const confirmed = window.confirm('Are you sure you want to end this chat session?');
    if (!confirmed) return;

    setIsEnding(true);
    try {
      const res = await fetch('/api/chat/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to end chat');
        setIsEnding(false);
        return;
      }

      const data = await res.json();
      setChatEnded(true);
      setEndSummary({
        duration_minutes: data.duration_minutes,
        amount_charged: data.amount_charged,
      });
      setShowEndModal(true);
    } catch (err) {
      console.error('Failed to end chat:', err);
      alert('Failed to end chat session');
    } finally {
      setIsEnding(false);
    }
  }, [accessToken, isEnding, orderId]);

  // Feedback submit handler
  const handleFeedbackSubmit = useCallback(
    async (rating: number, comment?: string) => {
      if (!accessToken) return;

      try {
        await fetch(`/api/chat/${orderId}/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ rating, comment }),
        });
      } catch (err) {
        console.error('Failed to submit feedback:', err);
      }

      setShowEndModal(false);
      router.push('/chat');
    },
    [accessToken, orderId, router]
  );

  // Handle modal close (skip feedback)
  const handleModalClose = useCallback(() => {
    setShowEndModal(false);
    router.push('/chat');
  }, [router]);

  // Count user messages for summary
  const userMessageCount = messages.filter((m) => m.sender_type !== 'system').length;

  // Loading state
  if (initError) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-negative/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-negative"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9L9 15M9 9L15 15" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm mb-4">{initError}</p>
          <button
            onClick={() => router.push('/chat')}
            className="text-primary text-sm font-semibold"
          >
            Back to Chat List
          </button>
        </div>
      </div>
    );
  }

  const astrologerName = astrologer?.name || 'Astrologer';
  const isAI = astrologer?.is_ai || false;

  return (
    <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      {/* Watermark */}
      <KundliWatermark className="top-1/3 -right-20" opacity={0.02} size={350} />

      {/* Header */}
      <ChatHeader
        astrologerName={astrologerName}
        isAI={isAI}
        elapsed={elapsedFormatted}
        onEndChat={handleEndChat}
      />

      {/* Messages area */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto px-3 py-4"
        style={{ paddingBottom: chatEnded ? '1rem' : '0' }}
      >
        {/* Initial loading indicator */}
        {isLoading && messages.length === 0 && (
          <div className="flex justify-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-xs text-text-secondary">Loading messages...</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isUser={message.sender_type === 'user'}
            astrologerName={astrologerName}
            isAI={isAI}
          />
        ))}

        {/* Typing indicator */}
        {showTyping && !chatEnded && <TypingIndicator />}

        {/* Chat ended notice */}
        {chatEnded && (
          <div className="flex justify-center py-4 animate-fade-in">
            <div className="px-4 py-2 rounded-pill bg-surface-elevated/60 border border-border/30">
              <p className="text-text-secondary text-xs text-center">
                This chat session has ended
              </p>
            </div>
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar (hidden when chat ended) */}
      {!chatEnded && (
        <ChatInput
          onSend={sendMessage}
          disabled={chatEnded}
          isSending={isSending}
        />
      )}

      {/* End chat modal */}
      <ChatEndModal
        isOpen={showEndModal}
        onClose={handleModalClose}
        duration={
          endSummary
            ? formatDuration(endSummary.duration_minutes * 60)
            : elapsedFormatted
        }
        messagesCount={userMessageCount}
        amountCharged={endSummary?.amount_charged || 0}
        onSubmitFeedback={handleFeedbackSubmit}
      />
    </div>
  );
}
