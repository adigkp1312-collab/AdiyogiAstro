'use client';

import React, { useState, useEffect } from 'react';
import { calculateSunSignIndex, ZODIAC_SIGNS } from '@/lib/calculator-utils';

interface RisingSignCalculatorProps {
  userDob?: string | null;
  userTob?: string | null;
  userPob?: string | null;
}

const SIGN_EMOJIS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const SIGN_HINDI_NAMES = [
  'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन',
];

const SIGN_ELEMENTS = [
  'Fire 🔥', 'Earth 🌍', 'Air 💨', 'Water 💧',
  'Fire 🔥', 'Earth 🌍', 'Air 💨', 'Water 💧',
  'Fire 🔥', 'Earth 🌍', 'Air 💨', 'Water 💧',
];

const SIGN_LORDS = [
  'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter',
];

const SIGN_TRAITS: Record<string, string[]> = {
  Aries: ['Bold', 'Energetic', 'Pioneering', 'Direct'],
  Taurus: ['Steady', 'Sensual', 'Grounded', 'Patient'],
  Gemini: ['Curious', 'Adaptable', 'Witty', 'Expressive'],
  Cancer: ['Nurturing', 'Intuitive', 'Protective', 'Emotional'],
  Leo: ['Charismatic', 'Confident', 'Warm', 'Dramatic'],
  Virgo: ['Analytical', 'Practical', 'Helpful', 'Precise'],
  Libra: ['Diplomatic', 'Harmonious', 'Charming', 'Fair'],
  Scorpio: ['Intense', 'Magnetic', 'Perceptive', 'Powerful'],
  Sagittarius: ['Adventurous', 'Optimistic', 'Philosophical', 'Free-spirited'],
  Capricorn: ['Ambitious', 'Disciplined', 'Responsible', 'Strategic'],
  Aquarius: ['Innovative', 'Humanitarian', 'Independent', 'Visionary'],
  Pisces: ['Compassionate', 'Imaginative', 'Sensitive', 'Mystical'],
};

export default function RisingSignCalculator({
  userDob,
  userTob,
  userPob,
}: RisingSignCalculatorProps) {
  const [dob, setDob] = useState(userDob || '');
  const [tob, setTob] = useState(userTob || '');
  const [pob, setPob] = useState(userPob || '');
  const [result, setResult] = useState<{
    signIndex: number;
    signName: string;
  } | null>(null);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  useEffect(() => {
    if (userTob) setTob(userTob);
  }, [userTob]);

  useEffect(() => {
    if (userPob) setPob(userPob);
  }, [userPob]);

  const canCalculate = dob.trim().length > 0 && tob.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;

    const sunSignIndex = calculateSunSignIndex(dob);

    // Parse time of birth
    const [hours, minutes] = tob.split(':').map(Number);
    const totalMinutesSince6AM = (hours - 6) * 60 + minutes;

    // Handle times before 6 AM (wrap around)
    const adjustedMinutes =
      totalMinutesSince6AM < 0 ? totalMinutesSince6AM + 1440 : totalMinutesSince6AM;

    // Each sign rises for ~120 minutes (2 hours)
    const signsAdvanced = Math.floor(adjustedMinutes / 120);
    const risingIndex = (sunSignIndex + signsAdvanced) % 12;

    setResult({
      signIndex: risingIndex,
      signName: ZODIAC_SIGNS[risingIndex].name,
    });
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
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Time of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              value={tob}
              onChange={(e) => {
                setTob(e.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Place of Birth <span className="text-text-secondary/50">(for reference)</span>
            </label>
            <input
              type="text"
              value={pob}
              onChange={(e) => setPob(e.target.value)}
              placeholder="e.g. Mumbai, India"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${canCalculate ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]' : 'bg-surface/50 text-text-secondary cursor-not-allowed'}`}
        >
          🌅 Calculate Rising Sign
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            {/* Sign Display */}
            <div className="text-center mb-5">
              <div className="text-6xl mb-2">{SIGN_EMOJIS[result.signIndex]}</div>
              <h3 className="text-2xl font-bold text-white">{result.signName}</h3>
              <p className="text-text-secondary text-sm mt-1">
                {SIGN_HINDI_NAMES[result.signIndex]} (Lagna / Ascendant)
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Element</div>
                <div className="text-white text-sm font-medium">
                  {SIGN_ELEMENTS[result.signIndex]}
                </div>
              </div>
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Ruling Lord</div>
                <div className="text-white text-sm font-medium">
                  {SIGN_LORDS[result.signIndex]}
                </div>
              </div>
            </div>

            {/* Traits */}
            <div className="mb-4">
              <div className="text-xs text-text-secondary mb-2 font-medium">
                Rising Sign Traits
              </div>
              <div className="flex flex-wrap gap-2">
                {SIGN_TRAITS[result.signName]?.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Approximation Note */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
              <p className="text-amber-400/80 text-xs leading-relaxed">
                ⚠️ <strong>Note:</strong> This is a simplified approximation. An accurate rising
                sign (Lagna) calculation requires precise birth coordinates, timezone, and
                astronomical ephemeris data. For a precise reading, consult a Vedic astrologer
                with your exact birth details.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
