'use client';

import { useState, useEffect } from 'react';
import {
  calculateMoonSignIndex,
  ZODIAC_SIGNS,
} from '@/lib/calculator-utils';

interface MoonSignCalculatorProps {
  userDob?: string | null;
  userName?: string | null;
  userTob?: string | null;
}

interface MoonSignResult {
  index: number;
  sign: typeof ZODIAC_SIGNS[number];
}

const ELEMENT_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  Fire: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', icon: '\uD83D\uDD25' },
  Earth: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', icon: '\uD83C\uDF3F' },
  Air: { bg: 'bg-sky-500/10 border-sky-500/20', text: 'text-sky-400', icon: '\uD83D\uDCA8' },
  Water: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400', icon: '\uD83D\uDCA7' },
};

const KEY_TRAITS: Record<string, string[]> = {
  Aries: ['Courageous', 'Energetic', 'Impulsive', 'Pioneering'],
  Taurus: ['Stable', 'Sensual', 'Patient', 'Determined'],
  Gemini: ['Communicative', 'Adaptable', 'Curious', 'Witty'],
  Cancer: ['Nurturing', 'Intuitive', 'Protective', 'Emotional'],
  Leo: ['Dramatic', 'Generous', 'Warm-hearted', 'Creative'],
  Virgo: ['Analytical', 'Modest', 'Diligent', 'Perfectionist'],
  Libra: ['Harmonious', 'Charming', 'Diplomatic', 'Idealistic'],
  Scorpio: ['Intense', 'Passionate', 'Resourceful', 'Magnetic'],
  Sagittarius: ['Adventurous', 'Optimistic', 'Philosophical', 'Honest'],
  Capricorn: ['Disciplined', 'Ambitious', 'Practical', 'Cautious'],
  Aquarius: ['Independent', 'Humanitarian', 'Inventive', 'Visionary'],
  Pisces: ['Empathetic', 'Imaginative', 'Gentle', 'Mystical'],
};

export default function MoonSignCalculator({ userDob }: MoonSignCalculatorProps) {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<MoonSignResult | null>(null);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  const canCalculate = dob.length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const index = calculateMoonSignIndex(dob);
    const sign = ZODIAC_SIGNS[index];
    setResult({ index, sign });
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface/60 border border-border rounded-2xl p-5">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              canCalculate
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]'
                : 'bg-surface/50 text-text-secondary cursor-not-allowed'
            }`}
          >
            Calculate Moon Sign
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">
              Your Vedic Moon Sign (Rashi)
            </h3>

            {/* Sign Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center text-4xl">
                {result.sign.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{result.sign.name}</h4>
                <p className="text-sm text-text-secondary">{result.sign.hindi}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className={`rounded-xl border p-3 ${ELEMENT_COLORS[result.sign.element]?.bg || 'bg-white/5 border-white/10'}`}>
                <p className="text-xs text-text-secondary mb-0.5">Element</p>
                <p className={`text-sm font-semibold ${ELEMENT_COLORS[result.sign.element]?.text || 'text-white'}`}>
                  {ELEMENT_COLORS[result.sign.element]?.icon || ''} {result.sign.element}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Ruling Planet</p>
                <p className="text-sm font-semibold text-white">{result.sign.lord}</p>
              </div>
            </div>

            {/* Key Traits */}
            <div>
              <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-2">
                Key Traits
              </p>
              <div className="flex flex-wrap gap-2">
                {(KEY_TRAITS[result.sign.name] || []).map((trait) => (
                  <span
                    key={trait}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Moon Significance Note */}
            <div className="mt-4 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <p className="text-xs text-text-secondary leading-relaxed">
                In Vedic astrology, the Moon sign (Rashi) is considered more important than the Sun sign.
                It governs your mind, emotions, and instinctive reactions, reflecting your inner self and
                emotional nature.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
