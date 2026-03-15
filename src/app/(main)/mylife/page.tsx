'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { getZodiacEmoji, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import KundliWatermark from '@/components/ui/KundliWatermark';

interface LifeArea {
  key: 'love' | 'career' | 'money' | 'health';
  status: 'favourable' | 'neutral' | 'unfavourable';
  icon: string;
  reading: string;
  advice: string;
  luckyInfo: string;
  chatPrompt: string;
}

const LIFE_AREAS: LifeArea[] = [
  {
    key: 'love',
    status: 'favourable',
    icon: '\u2764\uFE0F',
    reading: 'Venus is strongly placed in your chart today, bringing warmth and harmony to your relationships. Your emotional bonds will strengthen.',
    advice: 'Express your feelings openly. A surprise gesture for your loved one will bring immense joy.',
    luckyInfo: 'Lucky color: Pink | Best time: 6 PM - 9 PM',
    chatPrompt: 'Tell me about my love life today',
  },
  {
    key: 'career',
    status: 'neutral',
    icon: '\uD83D\uDCBC',
    reading: 'Saturn is in a transitional phase, indicating a period of steady progress. Focus on building foundations rather than seeking quick results.',
    advice: 'Collaborate with colleagues on pending tasks. Avoid making major financial decisions at work today.',
    luckyInfo: 'Lucky color: Blue | Best time: 10 AM - 1 PM',
    chatPrompt: 'What does my career look like today',
  },
  {
    key: 'money',
    status: 'neutral',
    icon: '\uD83D\uDCB0',
    reading: 'Mercury influences your financial sector today. Be mindful of small expenditures that can add up. A moderate approach to spending is wise.',
    advice: 'Review your subscriptions and recurring expenses. An unexpected small gain is possible after noon.',
    luckyInfo: 'Lucky number: 7 | Best time: 2 PM - 4 PM',
    chatPrompt: 'How is my financial situation today',
  },
  {
    key: 'health',
    status: 'favourable',
    icon: '\uD83D\uDC9A',
    reading: 'Mars energizes your health house today. Your vitality and stamina are at their peak. Physical activities will bring great satisfaction.',
    advice: 'Start the day with yoga or meditation. Stay hydrated and eat fresh, sattvic foods for maximum energy.',
    luckyInfo: 'Lucky color: Green | Best time: Morning',
    chatPrompt: 'Give me health advice based on my chart',
  },
];

export default function MyLifePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const moonSign = user?.moon_sign || 'Aries';
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  const handleAreaClick = (areaKey: string) => {
    setExpandedArea(expandedArea === areaKey ? null : areaKey);
  };

  const handleAskAstrologer = () => {
    router.push('/chat');
  };

  return (
    <div className="bg-background min-h-screen starfield">
      {/* Kundli watermark - centered behind moon sign */}
      <KundliWatermark className="top-10 left-1/2 -translate-x-1/2" opacity={0.04} size={480} />
      <KundliWatermark className="top-[500px] -right-16" opacity={0.025} size={350} color="#F59E0B" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold text-text-primary">{t('myLife')}</h1>
            <button className="text-text-secondary hover:text-primary-light transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16,6 12,2 8,6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          {/* Birth Details */}
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-sm uppercase tracking-widest text-accent font-semibold mb-2">
              {t('discoverLifeJourney')}
            </h2>
            <p className="text-xs text-text-secondary">
              {t('dateOfBirth')}: {user?.dob ? formatDate(user.dob) : 'Not set'} | {t('placeOfBirth')}: {user?.pob_city || 'Not set'}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {t('influencedBy')}: <span className="text-primary-light font-medium">{user?.current_dasha?.split(' ')[0] || 'Mercury'}</span>
            </p>
          </div>

          {/* Moon Sign Display */}
          <div className="flex flex-col items-center mb-6 animate-float">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-indigo-500/30 flex items-center justify-center mb-3 border-2 border-primary/40 shadow-glow relative">
              {/* Orbital ring */}
              <div className="absolute inset-[-6px] rounded-full border border-primary/20 animate-pulse-slow" />
              <span className="text-5xl">{getZodiacEmoji(moonSign)}</span>
            </div>
            <p className="text-text-primary font-semibold">{t('moonSign')}</p>
            <p className="text-accent font-bold text-lg text-glow-gold">{moonSign}</p>
          </div>
        </div>

        {/* Life Areas */}
        <div className="px-4 pb-6">
          <h3 className="text-sm uppercase tracking-widest text-text-secondary font-semibold mb-3 text-center">
            {t('todaysLifeAreas')}
          </h3>
          <p className="text-[11px] text-text-secondary/60 text-center mb-4">
            {t('tapToSeeReading')}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {LIFE_AREAS.map((area, i) => {
              const isExpanded = expandedArea === area.key;
              const statusLabel = t(area.status);
              return (
                <div
                  key={area.key}
                  className={`rounded-card text-center border transition-all duration-300 animate-slide-up cursor-pointer active:scale-[0.97] ${
                    isExpanded
                      ? 'col-span-2 bg-surface-card border-primary/50 shadow-glow-sm'
                      : 'bg-surface-card border-border/40 hover:border-primary/40 hover:shadow-glow-sm'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                  onClick={() => handleAreaClick(area.key)}
                >
                  {/* Collapsed view */}
                  <div className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">{area.icon}</span>
                      {isExpanded && (
                        <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      )}
                    </div>
                    <p className="text-text-primary font-semibold text-sm mt-1">{t(area.key)}</p>
                    <Badge
                      variant={area.status}
                      size="sm"
                      className="mt-1.5"
                    >
                      {statusLabel}
                    </Badge>
                  </div>

                  {/* Expanded reading */}
                  {isExpanded && (
                    <div className="px-4 pb-4 text-left border-t border-border/30 pt-3 animate-fade-in">
                      {/* Reading */}
                      <div className="mb-3">
                        <p className="text-[11px] uppercase tracking-wider text-primary-light font-semibold mb-1">
                          {t('todaysReading')}
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {area.reading}
                        </p>
                      </div>

                      {/* Advice */}
                      <div className="mb-3">
                        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-1">
                          {t('advice')}
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {area.advice}
                        </p>
                      </div>

                      {/* Lucky info */}
                      <div className="bg-primary/5 rounded-lg px-3 py-2 mb-3 border border-primary/20">
                        <p className="text-[11px] text-primary-light font-medium">
                          {area.luckyInfo}
                        </p>
                      </div>

                      {/* Ask astrologer CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAskAstrologer();
                        }}
                        className="w-full py-2 bg-gradient-to-r from-primary to-indigo-500 text-white text-xs font-semibold rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                        </svg>
                        {t('askAstrologerAbout')} {t(area.key)}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Tip */}
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-r from-accent/10 via-surface-card to-accent/5 rounded-card p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 border border-accent/30">
                <span className="text-sm">💡</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-accent mb-1">{t('dailyCosmicTip')}</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Today is especially good for spiritual practices and meditation. The Moon in {moonSign} enhances your intuitive abilities. Trust your inner voice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="px-4 pb-8">
          <h3 className="text-sm uppercase tracking-widest text-text-secondary font-semibold mb-3 text-center">
            {t('upcomingCosmicEvents')}
          </h3>
          <div className="space-y-2">
            {[
              { event: 'Full Moon in Pisces', date: 'Mar 14', type: 'Emotional clarity & release' },
              { event: 'Mercury enters Aries', date: 'Mar 19', type: 'Sharp thinking & new ideas' },
              { event: 'Spring Equinox', date: 'Mar 20', type: 'New beginnings & balance' },
            ].map((item) => (
              <div key={item.event} className="bg-surface-card rounded-card px-4 py-3 border border-border/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-text-primary">{item.event}</p>
                  <p className="text-[10px] text-text-secondary">{item.type}</p>
                </div>
                <Badge variant="info" size="sm">{item.date}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
