'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import KundliWatermark from '@/components/ui/KundliWatermark';
import NumerologyCalculator from '@/components/calculators/NumerologyCalculator';
import MoonSignCalculator from '@/components/calculators/MoonSignCalculator';
import NakshatraCalculator from '@/components/calculators/NakshatraCalculator';
import SunSignCalculator from '@/components/calculators/SunSignCalculator';
import LoveCalculator from '@/components/calculators/LoveCalculator';
import RisingSignCalculator from '@/components/calculators/RisingSignCalculator';
import ChineseZodiacCalculator from '@/components/calculators/ChineseZodiacCalculator';
import LuckyNumberColorCalculator from '@/components/calculators/LuckyNumberColorCalculator';

type CalculatorType = 'numerology' | 'moonSign' | 'nakshatra' | 'sunSign' | 'love' | 'risingSign' | 'chineseZodiac' | 'luckyNumberColor';

const CALCULATORS: { key: CalculatorType; title: string; subtitle: string; icon: string; gradient: string }[] = [
  { key: 'numerology', title: 'Numerology', subtitle: 'Lucky Numbers', icon: '🔢', gradient: 'from-violet-600 to-purple-600' },
  { key: 'moonSign', title: 'Moon Sign', subtitle: 'Chandra Rashi', icon: '🌙', gradient: 'from-blue-600 to-indigo-600' },
  { key: 'nakshatra', title: 'Nakshatra', subtitle: 'Birth Star', icon: '⭐', gradient: 'from-amber-600 to-orange-600' },
  { key: 'sunSign', title: 'Sun Sign', subtitle: 'Surya Rashi', icon: '☀️', gradient: 'from-yellow-500 to-amber-500' },
  { key: 'love', title: 'Love', subtitle: 'Name Match', icon: '❤️', gradient: 'from-pink-600 to-rose-500' },
  { key: 'risingSign', title: 'Rising Sign', subtitle: 'Lagna', icon: '🌅', gradient: 'from-teal-600 to-cyan-600' },
  { key: 'chineseZodiac', title: 'Chinese Zodiac', subtitle: 'Birth Year', icon: '🐉', gradient: 'from-red-600 to-rose-600' },
  { key: 'luckyNumberColor', title: 'Lucky Number', subtitle: '& Color', icon: '🍀', gradient: 'from-emerald-600 to-green-600' },
];

export default function CalculatorsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (key: CalculatorType) => {
    if (activeCalculator === key) {
      setActiveCalculator(null);
      return;
    }
    setActiveCalculator(key);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const renderCalculator = () => {
    const props = {
      userDob: user?.dob,
      userName: user?.name,
      userTob: user?.tob,
      userPob: user?.pob_city,
    };

    switch (activeCalculator) {
      case 'numerology': return <NumerologyCalculator {...props} />;
      case 'moonSign': return <MoonSignCalculator {...props} />;
      case 'nakshatra': return <NakshatraCalculator {...props} />;
      case 'sunSign': return <SunSignCalculator {...props} />;
      case 'love': return <LoveCalculator userName={props.userName} />;
      case 'risingSign': return <RisingSignCalculator {...props} />;
      case 'chineseZodiac': return <ChineseZodiacCalculator {...props} />;
      case 'luckyNumberColor': return <LuckyNumberColorCalculator {...props} />;
      default: return null;
    }
  };

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-40 -right-20" opacity={0.03} size={400} color="#06B6D4" />
      <KundliWatermark className="top-[800px] -left-24" opacity={0.025} size={350} />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600/20 via-teal-500/10 to-purple-600/20 border-b border-cyan-500/20">
          <div className="px-4 pt-12 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => window.history.length > 1 ? router.back() : router.push('/home')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{t('calculators')}</h1>
                <p className="text-xs text-cyan-200/70">Discover Your Cosmic Numbers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="px-4 mt-5">
          <div className="grid grid-cols-2 gap-3">
            {CALCULATORS.map((calc) => (
              <button
                key={calc.key}
                onClick={() => handleSelect(calc.key)}
                className={`relative bg-gradient-to-br ${calc.gradient} rounded-2xl p-3.5 h-[90px] flex flex-col justify-between overflow-hidden text-left transition-all duration-200 ${
                  activeCalculator === calc.key
                    ? 'ring-2 ring-white/60 scale-[0.97] shadow-lg'
                    : 'hover:shadow-elevated active:scale-[0.97]'
                }`}
              >
                <div className="absolute right-2 top-2 text-2xl opacity-20">
                  {calc.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{calc.title}</h3>
                  <p className="text-white/70 text-[11px]">{calc.subtitle}</p>
                </div>
                {activeCalculator === calc.key && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] text-white/80 font-medium">Active</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Calculator */}
        {activeCalculator && (
          <div ref={calculatorRef} className="px-4 mt-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white">
                {CALCULATORS.find(c => c.key === activeCalculator)?.icon}{' '}
                {CALCULATORS.find(c => c.key === activeCalculator)?.title} Calculator
              </h2>
              <button
                onClick={() => setActiveCalculator(null)}
                className="text-xs text-text-secondary hover:text-white transition-colors"
              >
                Close ✕
              </button>
            </div>
            {renderCalculator()}
          </div>
        )}

        {/* Info section when no calculator selected */}
        {!activeCalculator && (
          <div className="px-4 mt-5 pb-4">
            <div className="bg-surface/40 border border-border rounded-2xl p-4">
              <h3 className="text-sm font-bold text-white mb-2">🔮 Vedic Astrology Calculators</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Tap any calculator above to discover your cosmic numbers. Our calculators use ancient
                Vedic astrology principles to reveal your birth star, lucky numbers, compatibility,
                and more. Results are based on your birth details for personalized insights.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-4 pb-8">
          <button
            onClick={() => router.push('/chat')}
            className="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('chat')} — Get Personalized Reading
          </button>

          <p className="text-[10px] text-text-secondary text-center mt-3">
            Results are approximate. For precise calculations, consult a professional astrologer.
          </p>
        </div>
      </div>
    </div>
  );
}
