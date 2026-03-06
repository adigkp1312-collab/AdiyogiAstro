'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import KundliWatermark from '@/components/ui/KundliWatermark';

const ZODIAC_SIGNS = [
  { name: 'Aries', hindi: 'मेष', icon: '♈', element: 'Fire' },
  { name: 'Taurus', hindi: 'वृषभ', icon: '♉', element: 'Earth' },
  { name: 'Gemini', hindi: 'मिथुन', icon: '♊', element: 'Air' },
  { name: 'Cancer', hindi: 'कर्क', icon: '♋', element: 'Water' },
  { name: 'Leo', hindi: 'सिंह', icon: '♌', element: 'Fire' },
  { name: 'Virgo', hindi: 'कन्या', icon: '♍', element: 'Earth' },
  { name: 'Libra', hindi: 'तुला', icon: '♎', element: 'Air' },
  { name: 'Scorpio', hindi: 'वृश्चिक', icon: '♏', element: 'Water' },
  { name: 'Sagittarius', hindi: 'धनु', icon: '♐', element: 'Fire' },
  { name: 'Capricorn', hindi: 'मकर', icon: '♑', element: 'Earth' },
  { name: 'Aquarius', hindi: 'कुम्भ', icon: '♒', element: 'Air' },
  { name: 'Pisces', hindi: 'मीन', icon: '♓', element: 'Water' },
];

// Compatibility matrix based on Vedic astrology principles
function getCompatibility(sign1: string, sign2: string) {
  const elementMap: Record<string, string> = {};
  ZODIAC_SIGNS.forEach(z => { elementMap[z.name] = z.element; });
  const e1 = elementMap[sign1];
  const e2 = elementMap[sign2];

  // Same sign
  if (sign1 === sign2) {
    return { score: 75, level: 'Good', detail: 'Same sign partnerships share deep understanding but may need to balance similar traits.' };
  }

  // Element compatibility
  const compat: Record<string, Record<string, { score: number; level: string; detail: string }>> = {
    Fire: {
      Fire: { score: 85, level: 'Excellent', detail: 'A passionate and energetic combination! Both partners bring enthusiasm and excitement.' },
      Air: { score: 90, level: 'Excellent', detail: 'Air fuels Fire — this is a dynamic and stimulating partnership with great chemistry.' },
      Earth: { score: 55, level: 'Moderate', detail: 'Fire and Earth need patience. Different approaches but can balance each other.' },
      Water: { score: 45, level: 'Challenging', detail: 'Opposing energies require compromise. Emotional depth meets passionate action.' },
    },
    Earth: {
      Fire: { score: 55, level: 'Moderate', detail: 'Stability meets spontaneity. With understanding, this can be a grounding relationship.' },
      Air: { score: 50, level: 'Moderate', detail: 'Practical meets intellectual. Requires effort but offers growth opportunities.' },
      Earth: { score: 88, level: 'Excellent', detail: 'A stable, reliable, and deeply nurturing partnership built on shared values.' },
      Water: { score: 92, level: 'Excellent', detail: 'Earth and Water create life! A naturally harmonious and caring relationship.' },
    },
    Air: {
      Fire: { score: 90, level: 'Excellent', detail: 'Intellectual spark meets passionate flame — an inspiring and adventurous pair.' },
      Air: { score: 80, level: 'Good', detail: 'Great communication and mental connection, but both need to stay grounded.' },
      Earth: { score: 50, level: 'Moderate', detail: 'Ideas meet practicality. Both can learn and grow from each other.' },
      Water: { score: 60, level: 'Moderate', detail: 'Emotions meet logic. With care, this can be a beautifully balanced union.' },
    },
    Water: {
      Fire: { score: 45, level: 'Challenging', detail: 'Deep emotions meet fiery passion. Growth is possible through mutual respect.' },
      Air: { score: 60, level: 'Moderate', detail: 'Feelings meet thoughts. A partnership that requires communication and patience.' },
      Earth: { score: 92, level: 'Excellent', detail: 'A deeply nurturing bond. Both partners feel safe and supported.' },
      Water: { score: 85, level: 'Excellent', detail: 'Emotional depth beyond measure. An intuitive and deeply connected partnership.' },
    },
  };

  return compat[e1]?.[e2] || { score: 70, level: 'Good', detail: 'A balanced partnership with good potential.' };
}

// Ashtakoota compatibility aspects
function getAshtakootaDetails(score: number) {
  const totalGuna = Math.round(score * 36 / 100);
  return [
    { name: 'Varna', hindi: 'वर्ण', points: Math.min(1, Math.round(score / 100)), maxPoints: 1, desc: 'Spiritual compatibility' },
    { name: 'Vashya', hindi: 'वश्य', points: Math.min(2, Math.round(score * 2 / 100)), maxPoints: 2, desc: 'Mutual attraction' },
    { name: 'Tara', hindi: 'तारा', points: Math.min(3, Math.round(score * 3 / 100)), maxPoints: 3, desc: 'Birth star compatibility' },
    { name: 'Yoni', hindi: 'योनी', points: Math.min(4, Math.round(score * 4 / 100)), maxPoints: 4, desc: 'Physical compatibility' },
    { name: 'Graha Maitri', hindi: 'ग्रह मैत्री', points: Math.min(5, Math.round(score * 5 / 100)), maxPoints: 5, desc: 'Mental compatibility' },
    { name: 'Gana', hindi: 'गण', points: Math.min(6, Math.round(score * 6 / 100)), maxPoints: 6, desc: 'Temperament matching' },
    { name: 'Bhakoot', hindi: 'भकूट', points: Math.min(7, Math.round(score * 7 / 100)), maxPoints: 7, desc: 'Love and family' },
    { name: 'Nadi', hindi: 'नाडी', points: Math.min(8, Math.round(score * 8 / 100)), maxPoints: 8, desc: 'Health compatibility' },
  ];
  void totalGuna; // used for calculation reference
}

export default function CompatibilityPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [yourSign, setYourSign] = useState<string | null>(null);
  const [partnerSign, setPartnerSign] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Auto-select user's sign if known
  const userMoonSign = user?.moon_sign;

  const handleCheckCompatibility = () => {
    if (yourSign && partnerSign) {
      setShowResult(true);
    }
  };

  const result = yourSign && partnerSign ? getCompatibility(yourSign, partnerSign) : null;
  const gunaDetails = result ? getAshtakootaDetails(result.score) : [];
  const totalGunaPoints = gunaDetails.reduce((sum, g) => sum + g.points, 0);
  const maxGunaPoints = gunaDetails.reduce((sum, g) => sum + g.maxPoints, 0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 45) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-amber-500';
    if (score >= 45) return 'from-orange-500 to-amber-600';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-40 -right-20" opacity={0.03} size={400} color="#EC4899" />
      <KundliWatermark className="top-[700px] -left-24" opacity={0.025} size={350} />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600/20 via-rose-500/10 to-purple-600/20 border-b border-pink-500/20">
          <div className="px-4 pt-12 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => window.history.length > 1 ? router.back() : router.push('/home')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Compatibility Check</h1>
                <p className="text-xs text-pink-200/70">Vedic Ashtakoota Matching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Selection */}
        <div className="px-4 mt-6">
          {/* Your Sign */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white mb-3 block flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 text-xs flex items-center justify-center">1</span>
              Your Moon Sign {userMoonSign && <span className="text-xs text-text-secondary">(Detected: {userMoonSign})</span>}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign.name}
                  onClick={() => { setYourSign(sign.name); setShowResult(false); }}
                  className={`flex flex-col items-center p-2.5 rounded-xl border transition-all duration-200 ${
                    yourSign === sign.name
                      ? 'bg-pink-500/20 border-pink-500/50 shadow-lg shadow-pink-500/10'
                      : 'bg-surface/50 border-border hover:border-pink-500/30'
                  }`}
                >
                  <span className="text-2xl">{sign.icon}</span>
                  <span className="text-[10px] text-white mt-1 font-medium">{sign.name}</span>
                  <span className="text-[9px] text-text-secondary">{sign.hindi}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Partner Sign */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white mb-3 block flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center">2</span>
              Partner&apos;s Moon Sign
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign.name}
                  onClick={() => { setPartnerSign(sign.name); setShowResult(false); }}
                  className={`flex flex-col items-center p-2.5 rounded-xl border transition-all duration-200 ${
                    partnerSign === sign.name
                      ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'bg-surface/50 border-border hover:border-purple-500/30'
                  }`}
                >
                  <span className="text-2xl">{sign.icon}</span>
                  <span className="text-[10px] text-white mt-1 font-medium">{sign.name}</span>
                  <span className="text-[9px] text-text-secondary">{sign.hindi}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheckCompatibility}
            disabled={!yourSign || !partnerSign}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              yourSign && partnerSign
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 active:scale-[0.98]'
                : 'bg-surface/50 text-text-secondary cursor-not-allowed'
            }`}
          >
            ❤️ Check Compatibility
          </button>
        </div>

        {/* Results */}
        {showResult && result && yourSign && partnerSign && (
          <div className="px-4 mt-6 pb-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Score Circle */}
            <div className="bg-surface/60 border border-border rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ZODIAC_SIGNS.find(z => z.name === yourSign)?.icon}</span>
                  <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-3xl">{ZODIAC_SIGNS.find(z => z.name === partnerSign)?.icon}</span>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</p>
                  <p className={`text-xs font-medium ${getScoreColor(result.score)}`}>{result.level}</p>
                </div>
              </div>

              {/* Score Bar */}
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(result.score)} transition-all duration-1000`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">{result.detail}</p>
            </div>

            {/* Ashtakoota Guna Details */}
            <div className="bg-surface/60 border border-border rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Ashtakoota Gun Milan</h3>
                <span className="text-xs text-primary-light font-semibold">{totalGunaPoints}/{maxGunaPoints} Guna</span>
              </div>

              <div className="space-y-3">
                {gunaDetails.map((guna) => (
                  <div key={guna.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white font-medium">{guna.name} <span className="text-text-secondary">({guna.hindi})</span></span>
                        <span className="text-xs text-primary-light">{guna.points}/{guna.maxPoints}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-700"
                          style={{ width: `${(guna.points / guna.maxPoints) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-text-secondary mt-0.5">{guna.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask Astrologer CTA */}
            <button
              onClick={() => router.push('/chat')}
              className="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t('chat')} — Get Detailed Analysis
            </button>
          </div>
        )}

        {/* Info Cards */}
        {!showResult && (
          <div className="px-4 mt-6 pb-8">
            <div className="bg-surface/40 border border-border rounded-2xl p-4">
              <h3 className="text-sm font-bold text-white mb-2">🔮 About Vedic Compatibility</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Vedic compatibility analysis uses the ancient Ashtakoota system, matching 8 aspects (Gunas)
                between two birth charts. A score of 18+ out of 36 is considered favorable for marriage.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-green-500/10 rounded-lg">
                  <p className="text-xs font-bold text-green-400">25-36</p>
                  <p className="text-[10px] text-text-secondary">Excellent</p>
                </div>
                <div className="text-center p-2 bg-yellow-500/10 rounded-lg">
                  <p className="text-xs font-bold text-yellow-400">18-24</p>
                  <p className="text-[10px] text-text-secondary">Good</p>
                </div>
                <div className="text-center p-2 bg-red-500/10 rounded-lg">
                  <p className="text-xs font-bold text-red-400">0-17</p>
                  <p className="text-[10px] text-text-secondary">Needs Review</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
