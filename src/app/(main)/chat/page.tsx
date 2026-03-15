'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import KundliWatermark from '@/components/ui/KundliWatermark';
import InsufficientBalanceModal from '@/components/wallet/InsufficientBalanceModal';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Astrologer } from '@/types';

type FilterType = 'all' | 'ai' | 'human';

export default function ChatPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingChat, setStartingChat] = useState<number | null>(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [balanceInfo, setBalanceInfo] = useState({ current: 0, required: 0 });
  const { accessToken, user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  // Fetch astrologers from API
  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const res = await fetch(`/api/astrologers?filter=${filter}`);
        if (res.ok) {
          const data = await res.json();
          setAstrologers(data.astrologers);
        }
      } catch {
        // Fallback silently
      } finally {
        setLoading(false);
      }
    }
    fetchAstrologers();
  }, [filter]);

  const handleStartChat = async (astrologer: Astrologer) => {
    if (startingChat) return;
    setStartingChat(astrologer.id);

    try {
      const res = await fetch('/api/chat/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ astrologer_id: astrologer.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error && data.error.includes('Insufficient')) {
          setBalanceInfo({
            current: data.current || user?.wallet_balance || 0,
            required: data.required || 10,
          });
          setShowBalanceModal(true);
        } else {
          alert(data.error || 'Failed to start chat');
        }
        return;
      }

      // Store order+astrologer info for the chat page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`chat_order_${data.order.id}`, JSON.stringify({
          order: data.order,
          astrologer: data.astrologer || astrologer,
        }));
      }

      router.push(`/chat/${data.order.id}`);
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setStartingChat(null);
    }
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Kundli watermark */}
      <KundliWatermark className="top-32 -right-20" opacity={0.025} size={400} />
      <KundliWatermark className="top-[700px] -left-16" opacity={0.02} size={350} color="#F59E0B" />

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/30">
        <h1 className="text-lg font-bold text-text-primary mb-3">{t('chatWithAstrologer')}</h1>

        {/* Filter pills */}
        <div className="flex gap-2">
          {[
            { key: 'all' as FilterType, label: 'All' },
            { key: 'ai' as FilterType, label: 'AI Astrologers' },
            { key: 'human' as FilterType, label: 'Human' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-pill text-xs font-semibold transition-all duration-300 ${
                filter === f.key
                  ? 'bg-primary text-white shadow-glow-sm'
                  : 'bg-surface-card text-text-secondary hover:text-text-primary hover:bg-surface-elevated border border-border/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        /* Astrologer List */
        <div className="px-4 py-4 space-y-3 pb-24">
          {astrologers.map((astrologer, i) => (
            <Card key={astrologer.id} className="flex gap-3 animate-slide-up" style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}>
              <Avatar
                name={astrologer.name}
                size="lg"
                isAI={astrologer.is_ai}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-text-primary truncate">
                    {astrologer.name}
                  </h3>
                  {astrologer.is_verified && (
                    <svg className="w-4 h-4 text-primary-light flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L13.09 4.26L15.5 3.42L14.68 5.82L17 6.5L15.5 8.5L17.5 10.5L15 11L15.5 13.5L13.09 12.68L12 15L10.91 12.68L8.5 13.5L9 11L6.5 10.5L8.5 8.5L7 6.5L9.32 5.82L8.5 3.42L10.91 4.26L12 2Z" />
                    </svg>
                  )}
                  {astrologer.is_ai && (
                    <Badge variant="info" size="sm">AI</Badge>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  {astrologer.specializations.join(' | ')}
                  {astrologer.experience_years && ` | ${astrologer.experience_years} Yrs`}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {astrologer.languages.join(', ')}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="text-xs font-semibold text-accent">{astrologer.rating.toFixed(1)}</span>
                  <span className="text-xs text-text-secondary">| {astrologer.total_chats.toLocaleString()} chats</span>
                </div>

                {/* Pricing + Status */}
                <div className="flex items-center justify-between mt-2">
                  <div>
                    {astrologer.price_per_min ? (
                      <span className="text-sm font-bold text-accent">
                        {formatCurrency(astrologer.price_per_min)}/min
                      </span>
                    ) : astrologer.discount_percent === 100 ? (
                      <span className="text-sm font-bold text-positive">FREE Chat</span>
                    ) : (
                      <span className="text-sm font-bold text-accent">
                        {formatCurrency(astrologer.price_per_chat || 0)}/chat
                      </span>
                    )}
                    {astrologer.discount_percent > 0 && astrologer.discount_percent < 100 && (
                      <Badge variant="discount" size="sm" className="ml-2">
                        {astrologer.discount_percent}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    astrologer.is_available ? 'text-positive' : 'text-text-secondary'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      astrologer.is_available ? 'bg-positive shadow-sm' : 'bg-text-secondary/50'
                    }`} />
                    {astrologer.is_available ? 'Online' : 'Offline'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2">
                  {astrologer.price_per_min && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Call
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    disabled={!astrologer.is_available || startingChat === astrologer.id}
                    onClick={() => handleStartChat(astrologer)}
                  >
                    {startingChat === astrologer.id ? (
                      <span className="flex items-center gap-1.5">
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t('loading')}
                      </span>
                    ) : t('chat')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {astrologers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔮</div>
              <p className="text-text-secondary text-sm">No astrologers found</p>
            </div>
          )}
        </div>
      )}

      {/* Insufficient Balance Modal */}
      <InsufficientBalanceModal
        isOpen={showBalanceModal}
        onClose={() => setShowBalanceModal(false)}
        currentBalance={balanceInfo.current}
        requiredAmount={balanceInfo.required}
      />
    </div>
  );
}
