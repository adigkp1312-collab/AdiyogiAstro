'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import KundliWatermark from '@/components/ui/KundliWatermark';
import { generateKundliPDF } from '@/lib/kundli-pdf';

// Planets and their Vedic names
const PLANETS = [
  { name: 'Sun', vedic: 'Surya (सूर्य)', icon: '☀️', nature: 'Benefic' },
  { name: 'Moon', vedic: 'Chandra (चन्द्र)', icon: '🌙', nature: 'Benefic' },
  { name: 'Mars', vedic: 'Mangal (मंगल)', icon: '🔴', nature: 'Malefic' },
  { name: 'Mercury', vedic: 'Budh (बुध)', icon: '💚', nature: 'Neutral' },
  { name: 'Jupiter', vedic: 'Guru (गुरु)', icon: '🟡', nature: 'Benefic' },
  { name: 'Venus', vedic: 'Shukra (शुक्र)', icon: '💎', nature: 'Benefic' },
  { name: 'Saturn', vedic: 'Shani (शनि)', icon: '🪐', nature: 'Malefic' },
  { name: 'Rahu', vedic: 'Rahu (राहु)', icon: '🌑', nature: 'Malefic' },
  { name: 'Ketu', vedic: 'Ketu (केतु)', icon: '☄️', nature: 'Malefic' },
];

const HOUSES = [
  { num: 1, name: 'Lagna', meaning: 'Self, personality, appearance' },
  { num: 2, name: 'Dhana', meaning: 'Wealth, family, speech' },
  { num: 3, name: 'Sahaja', meaning: 'Siblings, courage, communication' },
  { num: 4, name: 'Sukha', meaning: 'Mother, home, comfort' },
  { num: 5, name: 'Putra', meaning: 'Children, creativity, intelligence' },
  { num: 6, name: 'Ripu', meaning: 'Health, enemies, debts' },
  { num: 7, name: 'Kalatra', meaning: 'Marriage, partnerships, business' },
  { num: 8, name: 'Ayu', meaning: 'Longevity, transformation, mystery' },
  { num: 9, name: 'Dharma', meaning: 'Luck, father, higher learning' },
  { num: 10, name: 'Karma', meaning: 'Career, status, authority' },
  { num: 11, name: 'Labha', meaning: 'Gains, income, desires' },
  { num: 12, name: 'Vyaya', meaning: 'Losses, spirituality, foreign lands' },
];

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const ZODIAC_ICONS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

// Generate mock placements based on DOB
function generatePlacements(dob: string) {
  const date = new Date(dob);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const seed = dayOfYear + date.getFullYear();

  return PLANETS.map((planet, i) => {
    const signIndex = (seed + i * 3 + Math.floor(seed / (i + 2))) % 12;
    const houseNum = ((seed + i * 5) % 12) + 1;
    const degree = ((seed * (i + 1) * 7) % 30);
    const isRetro = i > 1 && (seed + i) % 5 === 0; // Only Mars+ can be retrograde

    return {
      ...planet,
      sign: ZODIAC_SIGNS[signIndex],
      signIcon: ZODIAC_ICONS[signIndex],
      house: houseNum,
      degree: `${degree}° ${Math.floor(((seed * i) % 60))}' ${ZODIAC_SIGNS[signIndex].substring(0, 3)}`,
      retrograde: isRetro,
    };
  });
}

// SVG Kundli Chart (North Indian Style)
function KundliChart({ placements }: { placements: ReturnType<typeof generatePlacements> }) {
  const size = 300;
  const mid = size / 2;

  // Map planets to houses for display
  const housePlanets: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) housePlanets[i] = [];
  placements.forEach(p => {
    const abbr = p.name.substring(0, 2) + (p.retrograde ? 'ᴿ' : '');
    housePlanets[p.house].push(abbr);
  });

  // North Indian chart house positions (center x,y for text placement)
  const housePositions: Record<number, { x: number; y: number }> = {
    1: { x: mid, y: mid - 45 },
    2: { x: mid - 65, y: mid - 85 },
    3: { x: mid - 110, y: mid - 45 },
    4: { x: mid - 65, y: mid },
    5: { x: mid - 110, y: mid + 45 },
    6: { x: mid - 65, y: mid + 85 },
    7: { x: mid, y: mid + 45 },
    8: { x: mid + 65, y: mid + 85 },
    9: { x: mid + 110, y: mid + 45 },
    10: { x: mid + 65, y: mid },
    11: { x: mid + 110, y: mid - 45 },
    12: { x: mid + 65, y: mid - 85 },
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Outer rectangle */}
      <rect x="10" y="10" width={size - 20} height={size - 20} fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />

      {/* Diagonal lines forming triangles */}
      <line x1="10" y1="10" x2={mid} y2={mid} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <line x1={size - 10} y1="10" x2={mid} y2={mid} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <line x1="10" y1={size - 10} x2={mid} y2={mid} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <line x1={size - 10} y1={size - 10} x2={mid} y2={mid} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />

      {/* Cross lines */}
      <line x1={mid} y1="10" x2={mid} y2={size - 10} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <line x1="10" y1={mid} x2={size - 10} y2={mid} stroke="rgba(124,58,237,0.3)" strokeWidth="1" />

      {/* Inner diamond */}
      <polygon
        points={`${mid},10 ${size - 10},${mid} ${mid},${size - 10} 10,${mid}`}
        fill="none"
        stroke="rgba(124,58,237,0.4)"
        strokeWidth="1.5"
      />

      {/* House numbers and planets */}
      {Object.entries(housePositions).map(([house, pos]) => {
        const houseNum = parseInt(house);
        const planets = housePlanets[houseNum] || [];
        return (
          <g key={house}>
            <text x={pos.x} y={pos.y - 8} textAnchor="middle" fill="rgba(124,58,237,0.5)" fontSize="9" fontWeight="bold">
              {houseNum}
            </text>
            <text x={pos.x} y={pos.y + 8} textAnchor="middle" fill="white" fontSize="9" fontWeight="500">
              {planets.join(' ')}
            </text>
          </g>
        );
      })}

      {/* Center label */}
      <text x={mid} y={mid + 4} textAnchor="middle" fill="rgba(124,58,237,0.6)" fontSize="10" fontWeight="bold">
        KUNDLI
      </text>
    </svg>
  );
}

export default function KundliPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'houses'>('chart');
  const [downloading, setDownloading] = useState(false);

  const dob = user?.dob || '1995-06-15';
  const placements = generatePlacements(dob);

  // Determine Lagna (Ascendant) and Moon sign from placements
  const lagnaSign = placements[0]?.sign || 'Aries';
  const moonSign = user?.moon_sign || placements[1]?.sign || 'Cancer';
  const sunSign = placements[0]?.sign || 'Gemini';

  const handleDownloadPDF = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await generateKundliPDF({
        userName: user?.name || 'User',
        dob,
        lagnaSign,
        moonSign,
        sunSign,
        placements,
      });
    } finally {
      setDownloading(false);
    }
  };

  const tabs = [
    { key: 'chart' as const, label: 'Birth Chart' },
    { key: 'planets' as const, label: 'Planets' },
    { key: 'houses' as const, label: 'Houses' },
  ];

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-60 -left-20" opacity={0.04} size={400} />
      <KundliWatermark className="top-[800px] -right-24" opacity={0.025} size={350} color="#4F46E5" />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600/20 via-blue-500/10 to-purple-600/20 border-b border-indigo-500/20">
          <div className="px-4 pt-12 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => window.history.length > 1 ? router.back() : router.push('/home')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">Your Kundli</h1>
                <p className="text-xs text-indigo-200/70">Vedic Birth Chart Analysis</p>
              </div>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
                title="Download PDF"
              >
                {downloading ? (
                  <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.416" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                <p className="text-[10px] text-text-secondary">Lagna</p>
                <p className="text-sm font-bold text-white">{lagnaSign}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                <p className="text-[10px] text-text-secondary">Moon Sign</p>
                <p className="text-sm font-bold text-white">{moonSign}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                <p className="text-[10px] text-text-secondary">Sun Sign</p>
                <p className="text-sm font-bold text-white">{sunSign}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4">
          <div className="flex bg-surface/50 rounded-xl p-1 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-4 pb-8">
          {/* Chart Tab */}
          {activeTab === 'chart' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-surface/60 border border-border rounded-2xl p-4">
                <h3 className="text-sm font-bold text-white mb-1 text-center">North Indian Birth Chart</h3>
                <p className="text-[10px] text-text-secondary text-center mb-4">
                  DOB: {new Date(dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <KundliChart placements={placements} />
                <p className="text-[10px] text-text-secondary text-center mt-3">
                  ᴿ = Retrograde · Planets shown in their house positions
                </p>
              </div>

              {/* Key Yogas */}
              <div className="bg-surface/60 border border-border rounded-2xl p-4 mt-4">
                <h3 className="text-sm font-bold text-white mb-3">Key Yogas in Your Chart</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <span className="text-lg">✨</span>
                    <div>
                      <p className="text-xs font-semibold text-green-400">Gajakesari Yoga</p>
                      <p className="text-[10px] text-text-secondary">Jupiter and Moon relationship brings wisdom, fame, and prosperity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <span className="text-lg">🔱</span>
                    <div>
                      <p className="text-xs font-semibold text-amber-400">Budhaditya Yoga</p>
                      <p className="text-[10px] text-text-secondary">Sun-Mercury conjunction enhances intelligence and communication skills.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <span className="text-lg">🌟</span>
                    <div>
                      <p className="text-xs font-semibold text-purple-400">Chandra Mangal Yoga</p>
                      <p className="text-[10px] text-text-secondary">Moon-Mars relationship indicates strong will power and financial gains.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Planets Tab */}
          {activeTab === 'planets' && (
            <div className="space-y-2 animate-in fade-in duration-300">
              {placements.map((planet) => (
                <div key={planet.name} className="bg-surface/60 border border-border rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-indigo-600/30 flex items-center justify-center text-lg">
                    {planet.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{planet.name}</p>
                      {planet.retrograde && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-full font-medium">Retro</span>
                      )}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        planet.nature === 'Benefic' ? 'bg-green-500/20 text-green-400' :
                        planet.nature === 'Malefic' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{planet.nature}</span>
                    </div>
                    <p className="text-[10px] text-text-secondary">{planet.vedic}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-primary-light">{planet.signIcon} {planet.sign}</p>
                    <p className="text-[10px] text-text-secondary">House {planet.house} · {planet.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Houses Tab */}
          {activeTab === 'houses' && (
            <div className="space-y-2 animate-in fade-in duration-300">
              {HOUSES.map((house) => {
                const planetsInHouse = placements.filter(p => p.house === house.num);
                return (
                  <div key={house.num} className="bg-surface/60 border border-border rounded-xl p-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{house.num}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{house.name} Bhava</p>
                          <p className="text-[10px] text-text-secondary">{house.meaning}</p>
                        </div>
                      </div>
                    </div>
                    {planetsInHouse.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 ml-11">
                        {planetsInHouse.map(p => (
                          <span key={p.name} className="text-[10px] px-2 py-1 bg-primary/20 text-primary-light rounded-full font-medium">
                            {p.icon} {p.name} {p.retrograde ? '(R)' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Ask Astrologer */}
          <button
            onClick={() => router.push('/chat')}
            className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-indigo-600 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('chat')} — Analyze My Kundli
          </button>
        </div>
      </div>
    </div>
  );
}
