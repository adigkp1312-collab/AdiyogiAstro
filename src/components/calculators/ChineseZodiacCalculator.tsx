'use client';

import React, { useState, useEffect } from 'react';
import { calculateChineseZodiac, CHINESE_ANIMALS, CHINESE_ELEMENTS } from '@/lib/calculator-utils';

interface ChineseZodiacCalculatorProps {
  userDob?: string | null;
}

const ANIMAL_EMOJIS: Record<string, string> = {
  Rat: '🐀',
  Ox: '🐂',
  Tiger: '🐅',
  Rabbit: '🐇',
  Dragon: '🐉',
  Snake: '🐍',
  Horse: '🐎',
  Goat: '🐐',
  Monkey: '🐒',
  Rooster: '🐓',
  Dog: '🐕',
  Pig: '🐖',
};

const ANIMAL_TRAITS: Record<string, string[]> = {
  Rat: ['Quick-witted', 'Resourceful', 'Versatile', 'Charming'],
  Ox: ['Diligent', 'Dependable', 'Strong', 'Determined'],
  Tiger: ['Brave', 'Competitive', 'Confident', 'Unpredictable'],
  Rabbit: ['Gentle', 'Elegant', 'Alert', 'Compassionate'],
  Dragon: ['Ambitious', 'Energetic', 'Fearless', 'Charismatic'],
  Snake: ['Wise', 'Enigmatic', 'Intuitive', 'Graceful'],
  Horse: ['Animated', 'Active', 'Energetic', 'Free-spirited'],
  Goat: ['Calm', 'Creative', 'Gentle', 'Sympathetic'],
  Monkey: ['Sharp', 'Smart', 'Curious', 'Playful'],
  Rooster: ['Observant', 'Hardworking', 'Courageous', 'Confident'],
  Dog: ['Loyal', 'Honest', 'Amiable', 'Prudent'],
  Pig: ['Generous', 'Compassionate', 'Diligent', 'Optimistic'],
};

const ANIMAL_COMPATIBLE: Record<string, string[]> = {
  Rat: ['Dragon', 'Monkey', 'Ox'],
  Ox: ['Rat', 'Snake', 'Rooster'],
  Tiger: ['Horse', 'Dog', 'Pig'],
  Rabbit: ['Goat', 'Dog', 'Pig'],
  Dragon: ['Rat', 'Monkey', 'Rooster'],
  Snake: ['Ox', 'Rooster', 'Dragon'],
  Horse: ['Tiger', 'Goat', 'Dog'],
  Goat: ['Rabbit', 'Horse', 'Pig'],
  Monkey: ['Rat', 'Dragon', 'Snake'],
  Rooster: ['Ox', 'Snake', 'Dragon'],
  Dog: ['Tiger', 'Rabbit', 'Horse'],
  Pig: ['Tiger', 'Rabbit', 'Goat'],
};

const ANIMAL_INCOMPATIBLE: Record<string, string[]> = {
  Rat: ['Horse', 'Goat', 'Rabbit'],
  Ox: ['Tiger', 'Dragon', 'Horse'],
  Tiger: ['Ox', 'Snake', 'Monkey'],
  Rabbit: ['Rat', 'Rooster', 'Dragon'],
  Dragon: ['Rabbit', 'Dog', 'Ox'],
  Snake: ['Tiger', 'Pig', 'Monkey'],
  Horse: ['Rat', 'Ox', 'Rooster'],
  Goat: ['Rat', 'Ox', 'Dog'],
  Monkey: ['Tiger', 'Snake', 'Pig'],
  Rooster: ['Rabbit', 'Horse', 'Dog'],
  Dog: ['Dragon', 'Goat', 'Rooster'],
  Pig: ['Snake', 'Monkey', 'Tiger'],
};

const ANIMAL_LUCKY_COLORS: Record<string, string[]> = {
  Rat: ['Blue', 'Gold', 'Green'],
  Ox: ['Yellow', 'Green', 'White'],
  Tiger: ['Orange', 'Grey', 'Blue'],
  Rabbit: ['Pink', 'Red', 'Purple'],
  Dragon: ['Gold', 'Silver', 'Grey'],
  Snake: ['Red', 'Yellow', 'Black'],
  Horse: ['Green', 'Red', 'Purple'],
  Goat: ['Brown', 'Red', 'Purple'],
  Monkey: ['White', 'Gold', 'Blue'],
  Rooster: ['Gold', 'Brown', 'Yellow'],
  Dog: ['Green', 'Red', 'Purple'],
  Pig: ['Yellow', 'Grey', 'Gold'],
};

const ANIMAL_LUCKY_NUMBERS: Record<string, number[]> = {
  Rat: [2, 3],
  Ox: [1, 4],
  Tiger: [1, 3, 4],
  Rabbit: [3, 4, 6],
  Dragon: [1, 6, 7],
  Snake: [2, 8, 9],
  Horse: [2, 3, 7],
  Goat: [2, 7],
  Monkey: [4, 9],
  Rooster: [5, 7, 8],
  Dog: [3, 4, 9],
  Pig: [2, 5, 8],
};

export default function ChineseZodiacCalculator({ userDob }: ChineseZodiacCalculatorProps) {
  const [dob, setDob] = useState(userDob || '');
  const [result, setResult] = useState<{
    animal: string;
    element: string;
    yinYang: string;
    year: number;
  } | null>(null);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  const canCalculate = dob.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;

    const date = new Date(dob);
    const year = date.getFullYear();

    const zodiacResult = calculateChineseZodiac(year);

    // Element cycle: each element lasts 2 years
    const elementIndex = Math.floor((year - 4) / 2) % 5;
    const element = CHINESE_ELEMENTS[elementIndex];

    // Yin/Yang: even years = Yang, odd years = Yin
    const yinYang = year % 2 === 0 ? 'Yang ☀️' : 'Yin 🌙';

    setResult({
      animal: zodiacResult.animal || CHINESE_ANIMALS[(year - 4) % 12].animal,
      element,
      yinYang,
      year,
    });
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface/60 border border-border rounded-2xl p-5">
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
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${canCalculate ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]' : 'bg-surface/50 text-text-secondary cursor-not-allowed'}`}
        >
          🐉 Calculate Chinese Zodiac
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            {/* Animal Display */}
            <div className="text-center mb-5">
              <div className="text-7xl mb-2">{ANIMAL_EMOJIS[result.animal]}</div>
              <h3 className="text-2xl font-bold text-white">{result.animal}</h3>
              <p className="text-text-secondary text-sm mt-1">
                {result.element} {result.animal} &middot; {result.yinYang}
              </p>
            </div>

            {/* Element & Yin/Yang */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Year</div>
                <div className="text-white text-sm font-medium">{result.year}</div>
              </div>
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Element</div>
                <div className="text-white text-sm font-medium">{result.element}</div>
              </div>
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Energy</div>
                <div className="text-white text-sm font-medium">{result.yinYang}</div>
              </div>
            </div>

            {/* Traits */}
            <div className="mb-4">
              <div className="text-xs text-text-secondary mb-2 font-medium">
                Personality Traits
              </div>
              <div className="flex flex-wrap gap-2">
                {ANIMAL_TRAITS[result.animal]?.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <div className="text-xs text-green-400 mb-2 font-medium">✅ Compatible</div>
                <div className="flex flex-wrap gap-1.5">
                  {ANIMAL_COMPATIBLE[result.animal]?.map((a) => (
                    <span key={a} className="text-white text-xs">
                      {ANIMAL_EMOJIS[a]} {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <div className="text-xs text-red-400 mb-2 font-medium">❌ Incompatible</div>
                <div className="flex flex-wrap gap-1.5">
                  {ANIMAL_INCOMPATIBLE[result.animal]?.map((a) => (
                    <span key={a} className="text-white text-xs">
                      {ANIMAL_EMOJIS[a]} {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lucky Colors & Numbers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface/40 rounded-xl p-3">
                <div className="text-xs text-text-secondary mb-2 font-medium">🎨 Lucky Colors</div>
                <div className="flex flex-wrap gap-1.5">
                  {ANIMAL_LUCKY_COLORS[result.animal]?.map((color) => (
                    <span
                      key={color}
                      className="px-2 py-0.5 rounded-full bg-surface text-white text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-surface/40 rounded-xl p-3">
                <div className="text-xs text-text-secondary mb-2 font-medium">
                  🔢 Lucky Numbers
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ANIMAL_LUCKY_NUMBERS[result.animal]?.map((num) => (
                    <span
                      key={num}
                      className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
