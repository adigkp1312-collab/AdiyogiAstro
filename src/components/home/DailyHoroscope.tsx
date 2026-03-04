'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getZodiacEmoji } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DailyHoroscope() {
  const { user } = useAuth();
  const moonSign = user?.moon_sign || 'Aries';

  const checklistItems = [
    { text: 'Created from your birth chart', done: true },
    { text: "Combined with today's planetary positions", done: true },
    { text: 'Creating personalized predictions', done: true },
  ];

  return (
    <div className="mx-4 mt-4 rounded-card relative overflow-hidden border border-border/40">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-card via-[#1a1040] to-surface-card" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Background zodiac decoration */}
      <div className="absolute right-4 top-4 text-[80px] opacity-[0.06] leading-none">
        {getZodiacEmoji(moonSign)}
      </div>

      <div className="relative p-5">
        <p className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold mb-3">
          Your Daily Horoscope
        </p>

        {/* Checklist */}
        <div className="space-y-2.5 mb-5">
          {checklistItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.done ? 'bg-positive shadow-sm' : 'border-2 border-text-secondary'
              }`}>
                {item.done && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${item.done ? 'text-text-primary' : 'text-text-secondary'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-text-secondary mb-4">
          Your moon sign <span className="text-accent font-semibold">{moonSign} {getZodiacEmoji(moonSign)}</span> horoscope is ready
        </p>

        <Link href="/mylife">
          <Button variant="cosmic" size="lg" fullWidth>
            See My Life ✨
          </Button>
        </Link>
      </div>
    </div>
  );
}
