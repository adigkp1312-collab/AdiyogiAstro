'use client';

import React, { useState, useEffect } from 'react';

interface LoveCalculatorProps {
  userName?: string | null;
}

const FLAMES_LABELS = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemies', 'Siblings'] as const;

const FLAMES_EMOJIS: Record<string, string> = {
  Friends: '🤝',
  Lovers: '❤️',
  Affection: '💕',
  Marriage: '💍',
  Enemies: '⚔️',
  Siblings: '👫',
};

const FLAMES_DESCRIPTIONS: Record<string, string> = {
  Friends:
    'Your cosmic energies align in a harmonious friendship vibration. The stars suggest a deep, lasting bond built on mutual respect and shared laughter. This is the foundation from which all great relationships grow.',
  Lovers:
    'The planets have aligned to ignite a passionate flame between you two! Your energies resonate at the frequency of deep romantic love. Expect butterflies, stolen glances, and a connection that transcends the ordinary.',
  Affection:
    'A warm, tender energy flows between you both. The universe blesses this connection with gentle affection and caring warmth. This bond is nurtured by kindness and grows stronger with every shared moment.',
  Marriage:
    'The celestial bodies reveal a destined union! Your souls vibrate in perfect harmony, suggesting a bond strong enough for a lifetime commitment. The stars bless this partnership with enduring love and devotion.',
  Enemies:
    "Fiery Mars dominates this pairing — a clash of strong wills and intense energies. But remember, the opposite of love isn't hate — it's indifference. This intensity could transform into powerful passion if channeled wisely.",
  Siblings:
    'A familial, protective energy surrounds this connection. You share a comfortable, sibling-like bond filled with playful banter and unconditional support. The cosmos sees you as kindred spirits on the same journey.',
};

const FLAMES_COLORS: Record<string, string> = {
  Friends: 'from-blue-400 to-cyan-400',
  Lovers: 'from-red-400 to-pink-500',
  Affection: 'from-pink-400 to-rose-400',
  Marriage: 'from-amber-400 to-yellow-400',
  Enemies: 'from-red-600 to-orange-500',
  Siblings: 'from-green-400 to-emerald-400',
};

function computeFLAMES(name1: string, name2: string): { result: string; score: number } {
  const a = name1.toLowerCase().replace(/[^a-z]/g, '');
  const b = name2.toLowerCase().replace(/[^a-z]/g, '');

  const remaining1: string[] = a.split('');
  const remaining2: string[] = b.split('');

  for (let i = 0; i < remaining1.length; i++) {
    const idx = remaining2.indexOf(remaining1[i]);
    if (idx !== -1) {
      remaining1[i] = '';
      remaining2[idx] = '';
    }
  }

  const count = remaining1.filter(Boolean).length + remaining2.filter(Boolean).length;

  if (count === 0) {
    return { result: 'Lovers', score: 100 };
  }

  const flameArr = [...FLAMES_LABELS];
  let idx = 0;

  while (flameArr.length > 1) {
    idx = (idx + count - 1) % flameArr.length;
    flameArr.splice(idx, 1);
    if (idx >= flameArr.length) idx = 0;
  }

  const combined = a + b;
  let charCodeSum = 0;
  for (let i = 0; i < combined.length; i++) {
    charCodeSum += combined.charCodeAt(i);
  }
  const score = 40 + (charCodeSum % 61);

  return { result: flameArr[0], score };
}

export default function LoveCalculator({ userName }: LoveCalculatorProps) {
  const [yourName, setYourName] = useState(userName || '');
  const [partnerName, setPartnerName] = useState('');
  const [result, setResult] = useState<{ result: string; score: number } | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (userName) setYourName(userName);
  }, [userName]);

  useEffect(() => {
    if (!result) {
      setAnimatedScore(0);
      return;
    }
    let current = 0;
    const target = result.score;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setAnimatedScore(current);
    }, 30);
    return () => clearInterval(timer);
  }, [result]);

  const canCalculate = yourName.trim().length > 0 && partnerName.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const res = computeFLAMES(yourName.trim(), partnerName.trim());
    setResult(res);
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface/60 border border-border rounded-2xl p-5">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => {
                setYourName(e.target.value);
                setResult(null);
              }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Partner&apos;s Name
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => {
                setPartnerName(e.target.value);
                setResult(null);
              }}
              placeholder="Enter partner&apos;s name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface-card text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${canCalculate ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]' : 'bg-surface/50 text-text-secondary cursor-not-allowed'}`}
        >
          💘 Calculate Love Compatibility
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            {/* Score Display */}
            <div className="text-center mb-5">
              <div className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                {animatedScore}%
              </div>
              <div className="text-text-secondary text-sm mt-1">Love Compatibility Score</div>
            </div>

            {/* Compatibility Bar */}
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden mb-5">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${FLAMES_COLORS[result.result]} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedScore}%` }}
              />
            </div>

            {/* FLAMES Result */}
            <div className="text-center mb-4">
              <span className="text-4xl">{FLAMES_EMOJIS[result.result]}</span>
              <h3
                className={`text-xl font-bold mt-2 bg-gradient-to-r ${FLAMES_COLORS[result.result]} bg-clip-text text-transparent`}
              >
                {result.result}
              </h3>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed text-center">
              {FLAMES_DESCRIPTIONS[result.result]}
            </p>

            {/* Names */}
            <div className="flex items-center justify-center gap-3 mt-4 text-sm">
              <span className="text-white font-medium">{yourName}</span>
              <span className="text-pink-400">&amp;</span>
              <span className="text-white font-medium">{partnerName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
