'use client';

import { useState, useEffect } from 'react';
import {
  calculateSunSignIndex,
  ZODIAC_SIGNS,
} from '@/lib/calculator-utils';

interface SunSignCalculatorProps {
  userDob?: string | null;
  userName?: string | null;
  userTob?: string | null;
}

interface SunSignResult {
  index: number;
  sign: typeof ZODIAC_SIGNS[number];
}

const ELEMENT_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  Fire: { bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400', icon: '\uD83D\uDD25' },
  Earth: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', icon: '\uD83C\uDF3F' },
  Air: { bg: 'bg-sky-500/10 border-sky-500/20', text: 'text-sky-400', icon: '\uD83D\uDCA8' },
  Water: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400', icon: '\uD83D\uDCA7' },
};

const QUALITY_DESCRIPTIONS: Record<string, string> = {
  Cardinal: 'Initiating, action-oriented, leadership qualities',
  Fixed: 'Stable, determined, persistent, and resolute',
  Mutable: 'Adaptable, flexible, communicative, and versatile',
};

const SUN_SIGN_DESCRIPTIONS: Record<string, string> = {
  Aries: 'Bold and ambitious, you dive headfirst into challenges with confidence and determination.',
  Taurus: 'Grounded and reliable, you find strength in stability and appreciate the finer things in life.',
  Gemini: 'Intellectually curious and quick-witted, you effortlessly navigate between ideas and conversations.',
  Cancer: 'Deeply intuitive and sentimental, you are guided by your heart and fiercely protective of loved ones.',
  Leo: 'Theatrical and passionate, you light up every room with warmth, generosity, and creative flair.',
  Virgo: 'Methodical and analytical, you approach life with precision and a deep desire to be of service.',
  Libra: 'Charming and harmonious, you seek balance in all things and are drawn to beauty and fairness.',
  Scorpio: 'Magnetic and powerful, you possess an unmatched depth of emotion and transformative will.',
  Sagittarius: 'Adventurous and philosophical, you are a seeker of truth with boundless optimism.',
  Capricorn: 'Disciplined and strategic, you climb steadily toward your goals with patience and resilience.',
  Aquarius: 'Innovative and progressive, you champion originality and envision a better future for all.',
  Pisces: 'Empathetic and artistic, you navigate life through intuition and a deep connection to the unseen.',
};

export default function SunSignCalculator({ userDob }: SunSignCalculatorProps) {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<SunSignResult | null>(null);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  const canCalculate = dob.length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const index = calculateSunSignIndex(dob);
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
            Calculate Sun Sign
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">
              Your Vedic Sun Sign (Surya Rashi)
            </h3>

            {/* Sign Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-4xl">
                {result.sign.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{result.sign.name}</h4>
                <p className="text-sm text-text-secondary">{result.sign.hindi}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {SUN_SIGN_DESCRIPTIONS[result.sign.name]}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className={`rounded-xl border p-3 ${ELEMENT_STYLES[result.sign.element]?.bg || 'bg-white/5 border-white/10'}`}>
                <p className="text-xs text-text-secondary mb-0.5">Element</p>
                <p className={`text-sm font-semibold ${ELEMENT_STYLES[result.sign.element]?.text || 'text-white'}`}>
                  {ELEMENT_STYLES[result.sign.element]?.icon || ''} {result.sign.element}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-text-secondary mb-0.5">Ruling Planet</p>
                <p className="text-sm font-semibold text-white">{result.sign.lord}</p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 col-span-2">
                <p className="text-xs text-text-secondary mb-0.5">Quality</p>
                <p className="text-sm font-semibold text-amber-300">{result.sign.quality}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {QUALITY_DESCRIPTIONS[result.sign.quality]}
                </p>
              </div>
            </div>

            {/* Vedic vs Western Note */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs text-text-secondary leading-relaxed">
                The Vedic (Sidereal) Sun sign differs from the Western (Tropical) zodiac by approximately
                23 degrees. This is due to the precession of equinoxes, making the Vedic system aligned
                with the actual constellations in the sky.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
