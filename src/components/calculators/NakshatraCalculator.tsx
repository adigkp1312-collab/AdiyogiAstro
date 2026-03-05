'use client';

import { useState, useEffect } from 'react';
import {
  calculateNakshatraIndex,
  NAKSHATRAS,
} from '@/lib/calculator-utils';

interface NakshatraCalculatorProps {
  userDob?: string | null;
  userName?: string | null;
  userTob?: string | null;
}

interface NakshatraResult {
  index: number;
  nakshatra: typeof NAKSHATRAS[number];
  pada: number;
}

const PADA_DESCRIPTIONS: Record<number, string> = {
  1: 'Focused on dharma (purpose) — drive, initiative, and self-expression',
  2: 'Focused on artha (wealth) — material stability and practical pursuits',
  3: 'Focused on kama (desire) — creativity, relationships, and enjoyment',
  4: 'Focused on moksha (liberation) — spiritual growth and inner transformation',
};

export default function NakshatraCalculator({ userDob }: NakshatraCalculatorProps) {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<NakshatraResult | null>(null);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  const canCalculate = dob.length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const index = calculateNakshatraIndex(dob);
    const nakshatra = NAKSHATRAS[index];
    // Calculate pada (quarter): use day-of-month mod 4 + 1 as approximate
    const date = new Date(dob);
    const pada = (date.getDate() % 4) + 1;
    setResult({ index, nakshatra, pada });
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
            Calculate Nakshatra
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">
              Your Birth Nakshatra
            </h3>

            {/* Nakshatra Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-violet-300">
                  {result.index + 1}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{result.nakshatra.name}</h4>
                <p className="text-sm text-text-secondary">{result.nakshatra.hindi}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Deity</p>
                <p className="text-sm font-semibold text-white">{result.nakshatra.deity}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Ruling Planet</p>
                <p className="text-sm font-semibold text-white">{result.nakshatra.lord}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Symbol</p>
                <p className="text-sm font-semibold text-white">{result.nakshatra.symbol}</p>
              </div>
              <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Pada (Quarter)</p>
                <p className="text-sm font-semibold text-violet-300">{result.pada} of 4</p>
              </div>
            </div>

            {/* Traits */}
            <div className="mb-4">
              <p className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-2">
                Key Traits
              </p>
              <div className="flex flex-wrap gap-2">
                {result.nakshatra.traits.split(', ').map((trait) => (
                  <span
                    key={trait}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Pada Description */}
            <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10">
              <p className="text-xs font-medium text-violet-300 mb-1">
                Pada {result.pada} Significance
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                {PADA_DESCRIPTIONS[result.pada]}
              </p>
            </div>

            {/* Nakshatra Note */}
            <div className="mt-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <p className="text-xs text-text-secondary leading-relaxed">
                Nakshatras are the 27 lunar mansions in Vedic astrology. Your birth nakshatra
                is determined by the Moon&apos;s position at the time of your birth and deeply
                influences your personality, destiny, and life patterns.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
