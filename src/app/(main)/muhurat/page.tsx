'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import KundliWatermark from '@/components/ui/KundliWatermark';
import Badge from '@/components/ui/Badge';
import {
  MUHURAT_TILES,
  getTodayContext,
  computeAllMuhurats,
  type MuhuratKey,
  type MuhuratCategory,
  type MuhuratResult,
} from '@/lib/muhurat-utils';

// ---- Category Config ----
const CATEGORY_CONFIG: {
  key: MuhuratCategory;
  label: string;
  icon: string;
  accent: string;       // tailwind text/border color
  bgAccent: string;     // tailwind bg color for header
  dotColor: string;
}[] = [
  { key: 'daily-timing', label: 'Daily Timings', icon: '🕐', accent: 'text-amber-400 border-amber-500/30', bgAccent: 'bg-amber-500/10', dotColor: 'bg-amber-400' },
  { key: 'yoga-combination', label: 'Yoga & Nakshatras', icon: '✨', accent: 'text-yellow-400 border-yellow-500/30', bgAccent: 'bg-yellow-500/10', dotColor: 'bg-yellow-400' },
  { key: 'life-event', label: 'Life Events', icon: '🎊', accent: 'text-orange-400 border-orange-500/30', bgAccent: 'bg-orange-500/10', dotColor: 'bg-orange-400' },
  { key: 'timing-table', label: 'Timing Tables', icon: '📊', accent: 'text-amber-300 border-amber-400/30', bgAccent: 'bg-amber-400/10', dotColor: 'bg-amber-300' },
  { key: 'caution-period', label: 'Caution Periods', icon: '⚠️', accent: 'text-red-400 border-red-500/30', bgAccent: 'bg-red-500/10', dotColor: 'bg-red-400' },
];

// ---- Sub-components ----

function TodaySummaryCard({ results }: { results: Record<MuhuratKey, MuhuratResult> }) {
  const activeAuspicious = Object.entries(results).filter(
    ([key, r]) => r.status === 'active' && !['panchak', 'bhadra', 'rahuKaal'].includes(key)
  ).length;
  const activeCaution = Object.entries(results).filter(
    ([key, r]) => r.status === 'active' && ['panchak', 'bhadra', 'rahuKaal'].includes(key)
  ).length;
  const upcomingCount = Object.values(results).filter(r => r.status === 'upcoming').length;

  return (
    <div className="mx-4 mt-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-yellow-600/15 rounded-2xl border border-amber-500/20 p-4">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-500/10 rounded-full blur-xl" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🕉️</span>
            <h3 className="text-sm font-bold text-white">Today&apos;s Overview</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Auspicious */}
            <div className="text-center bg-green-500/10 rounded-xl py-2.5 px-2 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{activeAuspicious}</div>
              <div className="text-[10px] text-green-300/80 font-medium mt-0.5">Auspicious</div>
            </div>
            {/* Upcoming */}
            <div className="text-center bg-amber-500/10 rounded-xl py-2.5 px-2 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">{upcomingCount}</div>
              <div className="text-[10px] text-amber-300/80 font-medium mt-0.5">Upcoming</div>
            </div>
            {/* Caution */}
            <div className="text-center bg-red-500/10 rounded-xl py-2.5 px-2 border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{activeCaution}</div>
              <div className="text-[10px] text-red-300/80 font-medium mt-0.5">Caution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MuhuratTileCard({
  tile,
  result,
  isSelected,
  onSelect,
}: {
  tile: typeof MUHURAT_TILES[0];
  result: MuhuratResult;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isCaution = tile.category === 'caution-period';
  const isActiveOrUpcoming = result.status === 'active' || result.status === 'upcoming';

  return (
    <button
      onClick={onSelect}
      className={`relative group bg-surface-card rounded-2xl border overflow-hidden text-left transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-amber-400/60 border-amber-500/40 scale-[0.97] shadow-lg shadow-amber-500/10'
          : 'border-border/40 hover:border-amber-500/30 active:scale-[0.97]'
      }`}
    >
      {/* Top colored strip */}
      <div className={`h-1 bg-gradient-to-r ${tile.gradient}`} />

      <div className="p-3.5">
        {/* Icon + Status Row */}
        <div className="flex items-start justify-between mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center text-xl shadow-md`}
            style={{ boxShadow: isActiveOrUpcoming ? '0 0 12px rgba(245,158,11,0.25)' : undefined }}
          >
            {tile.icon}
          </div>
          {/* Status indicator */}
          {result.status === 'active' && (
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              isCaution ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {isCaution ? 'CAUTION' : 'ACTIVE'}
            </span>
          )}
          {result.status === 'upcoming' && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              SOON
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-white font-bold text-[13px] leading-tight">{tile.title}</h3>
        <p className="text-text-secondary text-[11px] mt-0.5">{tile.subtitle}</p>

        {/* Time preview for time-based muhurats */}
        {result.timeWindows.length > 0 && result.timeWindows[0].end && (
          <div className="mt-2 flex items-center gap-1">
            <svg className="w-3 h-3 text-amber-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] text-amber-400/70 font-medium">
              {result.timeWindows[0].start} - {result.timeWindows[0].end}
            </span>
          </div>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
      )}
    </button>
  );
}

function MuhuratDetailPanel({ result, tile, onClose }: {
  result: MuhuratResult;
  tile: typeof MUHURAT_TILES[0];
  onClose: () => void;
}) {
  const isCaution = tile.category === 'caution-period';
  const statusVariant = result.status === 'active'
    ? (isCaution ? 'unfavourable' as const : 'favourable' as const)
    : result.status === 'upcoming' ? 'neutral' as const : 'info' as const;
  const statusLabel = result.status === 'active'
    ? (isCaution ? 'Active - Caution' : 'Active Now')
    : result.status === 'upcoming' ? 'Upcoming Today'
    : result.status === 'passed' ? 'Passed Today' : 'Not Active Today';

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden bg-surface/60 border border-border rounded-2xl">
        {/* Top gradient banner */}
        <div className={`h-16 bg-gradient-to-r ${tile.gradient} relative`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -bottom-6 left-5">
            <div className="w-12 h-12 rounded-xl bg-surface-card border-2 border-background flex items-center justify-center text-2xl shadow-lg">
              {tile.icon}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 pt-8">
          {/* Title + Status */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">{tile.title}</h3>
              <p className="text-xs text-text-secondary">{tile.subtitle}</p>
            </div>
            <Badge variant={statusVariant} size="sm">{statusLabel}</Badge>
          </div>

          {/* Time Windows */}
          {result.timeWindows.length > 0 && (
            <div className="space-y-2 mb-4">
              {result.timeWindows.map((tw, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 rounded-xl px-4 py-3 border border-amber-500/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs text-text-secondary">{tw.label || 'Time Window'}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-400">
                    {tw.end ? `${tw.start} - ${tw.end}` : tw.start}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Table Data */}
          {result.tableData && result.tableData.length > 0 && (
            <div className="mb-4">
              <div className="bg-surface-card rounded-xl border border-border/30 overflow-hidden">
                <div className="max-h-[280px] overflow-y-auto">
                  {result.tableData.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3.5 py-2 border-b border-border/15 last:border-b-0 transition-colors ${
                        row.isActive
                          ? 'bg-amber-500/15 border-l-[3px] border-l-amber-400'
                          : 'border-l-[3px] border-l-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {row.isFavourable !== undefined && (
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.isFavourable ? 'bg-green-400' : 'bg-red-400'}`} />
                        )}
                        <span className={`text-xs truncate ${row.isActive ? 'text-white font-bold' : 'text-text-secondary'}`}>
                          {row.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-[11px] ${row.isActive ? 'text-amber-400 font-bold' : 'text-text-primary'}`}>
                          {row.time}
                        </span>
                        {row.extra && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                            row.isFavourable ? 'bg-green-500/15 text-green-300' : 'bg-red-500/15 text-red-300'
                          }`}>
                            {row.extra}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-surface/40 rounded-xl p-3.5 mb-4 border border-border/20">
            <p className="text-xs text-text-secondary leading-relaxed">{result.description}</p>
          </div>

          {/* Activities */}
          {result.activities.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                <span>{isCaution && result.status === 'active' ? '🛑' : '✅'}</span>
                {isCaution && result.status === 'active' ? 'Precautions' : 'Recommended Activities'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.activities.map((activity, i) => (
                  <span
                    key={i}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium ${
                      activity.startsWith('Avoid')
                        ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Note */}
          {result.specialNote && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mt-3 flex gap-2">
              <span className="text-sm flex-shrink-0">💡</span>
              <p className="text-amber-400/80 text-xs leading-relaxed">
                {result.specialNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Main Page ----

export default function MuhuratPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeMuhurat, setActiveMuhurat] = useState<MuhuratKey | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const context = useMemo(() => getTodayContext(), []);
  const allResults = useMemo(() => computeAllMuhurats(context), [context]);

  const todayDate = context.now.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const handleSelect = (key: MuhuratKey) => {
    if (activeMuhurat === key) {
      setActiveMuhurat(null);
      return;
    }
    setActiveMuhurat(key);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const activeTile = MUHURAT_TILES.find(t => t.key === activeMuhurat);

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-40 -right-20" opacity={0.03} size={400} color="#F59E0B" />
      <KundliWatermark className="top-[800px] -left-24" opacity={0.025} size={350} color="#D97706" />
      <KundliWatermark className="top-[1400px] -right-16" opacity={0.02} size={300} color="#EA580C" />

      <div className="relative z-10">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600/25 via-amber-500/15 to-red-600/20 border-b border-amber-500/20">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-orange-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-lg" />

          <div className="relative px-4 pt-12 pb-5">
            <div className="flex items-center gap-3">
              <button onClick={() => window.history.length > 1 ? router.back() : router.push('/home')} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{t('shubhMuhurat')}</h1>
                <p className="text-[11px] text-amber-200/60 mt-0.5">{todayDate} (IST)</p>
              </div>
              {/* Decorative Om */}
              <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <span className="text-amber-400 text-lg font-bold" style={{ fontFamily: 'serif' }}>Om</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Summary Card */}
        <TodaySummaryCard results={allResults} />

        {/* Categorized Grid */}
        <div className="px-4 mt-5 space-y-6">
          {CATEGORY_CONFIG.map((cat) => {
            const tiles = MUHURAT_TILES.filter(t => t.category === cat.key);
            if (tiles.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Category Header */}
                <div className={`flex items-center gap-2.5 mb-3 pb-2 border-b ${cat.accent}`}>
                  <span className="text-base">{cat.icon}</span>
                  <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'inherit' }}>
                    {cat.label}
                  </h2>
                  {/* Count badge */}
                  <div className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.bgAccent}`}>
                    {tiles.filter(t => allResults[t.key].status === 'active').length > 0
                      ? `${tiles.filter(t => allResults[t.key].status === 'active').length} active`
                      : `${tiles.length} items`
                    }
                  </div>
                </div>

                {/* Tiles Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {tiles.map((tile) => (
                    <MuhuratTileCard
                      key={tile.key}
                      tile={tile}
                      result={allResults[tile.key]}
                      isSelected={activeMuhurat === tile.key}
                      onSelect={() => handleSelect(tile.key)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Muhurat Detail */}
        {activeMuhurat && activeTile && (
          <div ref={detailRef} className="px-4 mt-5 pb-4">
            <MuhuratDetailPanel
              result={allResults[activeMuhurat]}
              tile={activeTile}
              onClose={() => setActiveMuhurat(null)}
            />
          </div>
        )}

        {/* Info section when nothing selected */}
        {!activeMuhurat && (
          <div className="px-4 mt-5 pb-4">
            <div className="relative overflow-hidden bg-gradient-to-br from-surface/60 to-surface/30 border border-border/40 rounded-2xl p-5">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔮</span>
                  <h3 className="text-sm font-bold text-white">About Shubh Muhurat</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Tap any muhurat above to see today&apos;s details. Shubh Muhurat helps you find the most
                  auspicious times for important activities based on Vedic astrology — including tithi,
                  nakshatra, yoga, karana, and planetary positions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-4 pb-8">
          <button
            onClick={() => router.push('/chat')}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('chat')} — Get Personalized Muhurat Advice
          </button>

          <p className="text-[10px] text-text-secondary text-center mt-3 px-4">
            Approximate times for general guidance. For precise muhurat, consult a Vedic astrologer.
          </p>
        </div>
      </div>
    </div>
  );
}
