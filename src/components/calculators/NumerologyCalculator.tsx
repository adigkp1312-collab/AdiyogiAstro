'use client';

import { useState, useEffect } from 'react';
import {
  calculateLifePathNumber,
  calculateDestinyNumber,
  calculateSoulUrge,
  calculatePersonality,
  LIFE_PATH_MEANINGS,
  PLANET_ATTRIBUTES,
} from '@/lib/calculator-utils';

interface NumerologyCalculatorProps {
  userDob?: string | null;
  userName?: string | null;
  userTob?: string | null;
}

interface NumerologyResult {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
}

const NUMBER_COLORS: Record<number, string> = {
  1: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  2: 'from-slate-300/20 to-gray-400/20 border-slate-300/30',
  3: 'from-yellow-500/20 to-amber-400/20 border-yellow-500/30',
  4: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
  5: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
  6: 'from-pink-500/20 to-rose-400/20 border-pink-500/30',
  7: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  8: 'from-blue-700/20 to-indigo-700/20 border-blue-700/30',
  9: 'from-red-500/20 to-rose-500/20 border-red-500/30',
  11: 'from-violet-500/20 to-purple-500/20 border-violet-500/30',
  22: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
  33: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30',
};

export default function NumerologyCalculator({ userDob, userName }: NumerologyCalculatorProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  useEffect(() => {
    if (userDob) setDob(userDob);
  }, [userDob]);

  const canCalculate = name.trim().length > 0 && dob.length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const lifePath = calculateLifePathNumber(dob);
    const destiny = calculateDestinyNumber(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    setResult({ lifePath, destiny, soulUrge, personality });
  };

  const getColorClass = (num: number) => NUMBER_COLORS[num] || NUMBER_COLORS[1];

  const renderNumberCard = (
    label: string,
    number: number,
    description: string,
  ) => {
    const meaning = LIFE_PATH_MEANINGS[number];
    const planet = PLANET_ATTRIBUTES[number <= 9 ? number : (number === 11 ? 2 : number === 22 ? 4 : 6)];

    return (
      <div
        className={`bg-gradient-to-br ${getColorClass(number)} border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01]`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">
              {label}
            </p>
            {meaning && (
              <p className="text-sm font-semibold text-white mt-0.5">{meaning.title}</p>
            )}
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: planet?.hex || '#6B7280' }}
          >
            {number}
          </div>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        {meaning && (
          <p className="text-sm text-text-secondary/80 mt-2 leading-relaxed italic">
            {meaning.meaning}
          </p>
        )}
        {planet && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-text-secondary">
              Planet: {planet.planet}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-text-secondary">
              Color: {planet.color}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-text-secondary">
              Day: {planet.day}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-text-secondary">
              Gem: {planet.gem}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="bg-surface/60 border border-border rounded-2xl p-5">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setResult(null);
              }}
              placeholder="Enter your full name"
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
          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              canCalculate
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]'
                : 'bg-surface/50 text-text-secondary cursor-not-allowed'
            }`}
          >
            Calculate Numerology
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface/60 border border-border rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">
              Your Numerology Profile
            </h3>
            <div className="space-y-4">
              {renderNumberCard(
                'Life Path Number',
                result.lifePath,
                'Derived from your date of birth, this reveals your life purpose and the path you are meant to walk.',
              )}
              {renderNumberCard(
                'Destiny Number',
                result.destiny,
                'Calculated from your full name, this shows your ultimate goals and the person you aspire to become.',
              )}
              {renderNumberCard(
                'Soul Urge Number',
                result.soulUrge,
                'Based on the vowels in your name, this reveals your inner desires, motivations, and deepest yearnings.',
              )}
              {renderNumberCard(
                'Personality Number',
                result.personality,
                'From the consonants in your name, this reflects how others perceive you and your outward persona.',
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
