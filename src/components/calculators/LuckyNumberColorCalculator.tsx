'use client';

import React, { useState, useEffect } from 'react';
import { calculateLifePathNumber, reduceToSingle, PLANET_ATTRIBUTES } from '@/lib/calculator-utils';

interface LuckyNumberColorCalculatorProps {
  userDob?: string | null;
  userName?: string | null;
}

const NUMBER_COLORS: Record<number, { name: string; hex: string }> = {
  1: { name: 'Red', hex: '#EF4444' },
  2: { name: 'Orange', hex: '#F97316' },
  3: { name: 'Yellow', hex: '#EAB308' },
  4: { name: 'Green', hex: '#22C55E' },
  5: { name: 'Turquoise', hex: '#06B6D4' },
  6: { name: 'Indigo', hex: '#6366F1' },
  7: { name: 'Violet', hex: '#8B5CF6' },
  8: { name: 'Rose', hex: '#EC4899' },
  9: { name: 'Gold', hex: '#F59E0B' },
};

const NUMBER_DAYS: Record<number, string> = {
  1: 'Sunday',
  2: 'Monday',
  3: 'Thursday',
  4: 'Sunday',
  5: 'Wednesday',
  6: 'Friday',
  7: 'Monday',
  8: 'Saturday',
  9: 'Tuesday',
};

const NUMBER_GEMSTONES: Record<number, string> = {
  1: 'Ruby 💎',
  2: 'Pearl 🤍',
  3: 'Yellow Sapphire 💛',
  4: 'Hessonite (Gomed) 🟤',
  5: 'Emerald 💚',
  6: 'Diamond 💠',
  7: "Cat's Eye 🐱",
  8: 'Blue Sapphire 💙',
  9: 'Red Coral ❤️',
};

const NUMBER_PLANETS: Record<number, string> = {
  1: 'Sun ☀️',
  2: 'Moon 🌙',
  3: 'Jupiter 🪐',
  4: 'Rahu 🌑',
  5: 'Mercury 🌐',
  6: 'Venus 💫',
  7: 'Ketu 🌘',
  8: 'Saturn 🪐',
  9: 'Mars ♂️',
};

const NUMBER_ADDITIONAL: Record<number, number[]> = {
  1: [10, 19, 28],
  2: [11, 20, 29],
  3: [12, 21, 30],
  4: [13, 22, 31],
  5: [14, 23, 5],
  6: [15, 24, 6],
  7: [16, 25, 7],
  8: [17, 26, 8],
  9: [18, 27, 9],
};

export default function LuckyNumberColorCalculator({
  userDob,
  userName,
}: LuckyNumberColorCalculatorProps) {
  const [name, setName] = useState(userName || '');
  const [dob, setDob] = useState(userDob || '');
  const [result, setResult] = useState<{
    lifePathNumber: number;
    color: { name: string; hex: string };
    day: string;
    gemstone: string;
    planet: string;
    additionalNumbers: number[];
    planetAttributes: Record<string, unknown> | null;
  } | null>(null);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setShowGlow(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowGlow(false);
    }
  }, [result]);

  const canCalculate = dob.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;

    const lpn = calculateLifePathNumber(dob);

    // Get planet attributes if available
    const effectiveNum = lpn > 9 ? reduceToSingle(lpn) : lpn;
    const attrs = PLANET_ATTRIBUTES[effectiveNum] || null;

    setResult({
      lifePathNumber: lpn,
      color: NUMBER_COLORS[lpn] || { name: 'White', hex: '#FFFFFF' },
      day: NUMBER_DAYS[lpn] || 'Sunday',
      gemstone: NUMBER_GEMSTONES[lpn] || 'Crystal',
      planet: NUMBER_PLANETS[lpn] || 'Sun',
      additionalNumbers: NUMBER_ADDITIONAL[lpn] || [],
      planetAttributes: attrs as Record<string, unknown> | null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface/60 border border-border rounded-2xl p-5">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
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
        </div>

        <button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${canCalculate ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]' : 'bg-surface/50 text-text-secondary cursor-not-allowed'}`}
        >
          🔮 Calculate Lucky Number & Color
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            {/* Lucky Number Display */}
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-24 h-24 rounded-full text-5xl font-bold transition-all duration-700"
                style={{
                  color: result.color.hex,
                  textShadow: showGlow
                    ? `0 0 20px ${result.color.hex}80, 0 0 40px ${result.color.hex}40, 0 0 60px ${result.color.hex}20`
                    : 'none',
                  background: `radial-gradient(circle, ${result.color.hex}15 0%, transparent 70%)`,
                }}
              >
                {result.lifePathNumber}
              </div>
              <h3 className="text-xl font-bold text-white mt-3">
                Life Path Number {result.lifePathNumber}
              </h3>
              {name && (
                <p className="text-text-secondary text-sm mt-1">
                  Personalized for {name}
                </p>
              )}
            </div>

            {/* Lucky Color Swatch */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg transition-all duration-500"
                style={{
                  backgroundColor: result.color.hex,
                  boxShadow: showGlow
                    ? `0 0 15px ${result.color.hex}60, 0 0 30px ${result.color.hex}30`
                    : `0 4px 6px ${result.color.hex}20`,
                }}
              />
              <div>
                <div className="text-white text-sm font-medium">Lucky Color</div>
                <div className="text-text-secondary text-xs">{result.color.name}</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Lucky Day</div>
                <div className="text-white text-sm font-medium">{result.day}</div>
              </div>
              <div className="bg-surface/40 rounded-xl p-3 text-center">
                <div className="text-xs text-text-secondary mb-1">Lucky Gemstone</div>
                <div className="text-white text-sm font-medium">{result.gemstone}</div>
              </div>
            </div>

            {/* Ruling Planet */}
            <div className="bg-surface/40 rounded-xl p-3 text-center mb-4">
              <div className="text-xs text-text-secondary mb-1">Ruling Planet</div>
              <div className="text-white text-sm font-medium">{result.planet}</div>
            </div>

            {/* Additional Lucky Numbers */}
            <div className="mb-2">
              <div className="text-xs text-text-secondary mb-2 font-medium">
                Additional Lucky Numbers
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {result.additionalNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                    style={{
                      backgroundColor: `${result.color.hex}20`,
                      color: result.color.hex,
                      border: `1px solid ${result.color.hex}40`,
                    }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
