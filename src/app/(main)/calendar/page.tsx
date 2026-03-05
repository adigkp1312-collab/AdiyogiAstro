'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KundliWatermark from '@/components/ui/KundliWatermark';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getMonthData,
  REGIONAL_CALENDARS,
  type DayPanchang,
  type Festival,
} from '@/lib/calendar-utils';

// IST helper
function getIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600000);
}

const MIN_YEAR = 2000;
const MAX_YEAR = 2099;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Festival type colors & badges
const FESTIVAL_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  major: { bg: 'bg-amber-500/15 border-amber-500/30', text: 'text-amber-400', label: 'Major' },
  regional: { bg: 'bg-orange-500/15 border-orange-500/30', text: 'text-orange-400', label: 'Regional' },
  fast: { bg: 'bg-cyan-500/15 border-cyan-500/30', text: 'text-cyan-400', label: 'Vrat' },
  government: { bg: 'bg-blue-500/15 border-blue-500/30', text: 'text-blue-400', label: 'National' },
};

// Moon phase icons
function moonIcon(phase: DayPanchang['moonPhase']) {
  switch (phase) {
    case 'new': return '🌑';
    case 'waxing': return '🌒';
    case 'full': return '🌕';
    case 'waning': return '🌘';
  }
}

// ---- Sub-components ----

function YearMonthPicker({
  year, month, onSelect, onClose,
}: {
  year: number; month: number;
  onSelect: (y: number, m: number) => void;
  onClose: () => void;
}) {
  const [pickerYear, setPickerYear] = useState(year);
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const yearGridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll to current decade when year grid opens
  useEffect(() => {
    if (mode === 'year' && yearGridRef.current) {
      const decadeRow = Math.floor((pickerYear - MIN_YEAR) / 5);
      const scrollTarget = Math.max(0, decadeRow * 40 - 80);
      yearGridRef.current.scrollTop = scrollTarget;
    }
  }, [mode, pickerYear]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleDecadeNav = (delta: number) => {
    const next = pickerYear + delta * 10;
    if (next >= MIN_YEAR && next <= MAX_YEAR) setPickerYear(next);
    else if (next < MIN_YEAR) setPickerYear(MIN_YEAR);
    else setPickerYear(MAX_YEAR);
  };

  // Years grid: show all years from MIN_YEAR to MAX_YEAR
  const allYears: number[] = [];
  for (let y = MIN_YEAR; y <= MAX_YEAR; y++) allYears.push(y);

  return (
    <div className="absolute left-0 right-0 top-full mt-1 z-50 px-4">
      <div
        ref={panelRef}
        className="bg-surface-card border border-amber-500/25 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-in slide-in-from-top-2 duration-300"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/20 bg-gradient-to-r from-amber-600/10 to-orange-600/10">
          {mode === 'month' ? (
            <>
              <button onClick={() => setPickerYear(Math.max(MIN_YEAR, pickerYear - 1))} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => setMode('year')} className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors px-3 py-1 rounded-lg hover:bg-amber-500/10">
                {pickerYear}
              </button>
              <button onClick={() => setPickerYear(Math.min(MAX_YEAR, pickerYear + 1))} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleDecadeNav(-1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-bold text-amber-400">{MIN_YEAR} — {MAX_YEAR}</span>
              <button onClick={() => handleDecadeNav(1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-90 transition-all">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Month grid */}
        {mode === 'month' && (
          <div className="grid grid-cols-3 gap-1.5 p-3">
            {MONTH_SHORT.map((m, i) => {
              const isActive = pickerYear === year && i === month;
              return (
                <button
                  key={m}
                  onClick={() => { onSelect(pickerYear, i); onClose(); }}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                      : 'text-text-secondary hover:bg-amber-500/10 hover:text-amber-400 active:scale-95'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        )}

        {/* Year grid */}
        {mode === 'year' && (
          <div ref={yearGridRef} className="max-h-[240px] overflow-y-auto p-3 scrollbar-thin">
            <div className="grid grid-cols-5 gap-1.5">
              {allYears.map((y) => {
                const isActive = y === year;
                const isSelected = y === pickerYear;
                return (
                  <button
                    key={y}
                    onClick={() => { setPickerYear(y); setMode('month'); }}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                        : isSelected
                        ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40'
                        : 'text-text-secondary hover:bg-amber-500/10 hover:text-amber-400 active:scale-95'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer with year range info */}
        <div className="px-4 py-2 border-t border-border/15 flex items-center justify-between">
          <span className="text-[9px] text-text-secondary/50">Years {MIN_YEAR}–{MAX_YEAR}</span>
          <button onClick={onClose} className="text-[10px] text-amber-400 font-semibold hover:text-amber-300 transition-colors px-2 py-0.5 rounded-lg hover:bg-amber-500/10">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function MonthHeader({
  year, month, hinduMonth, onPrev, onNext, onToday, onYearMonthSelect,
}: {
  year: number; month: number; hinduMonth: string;
  onPrev: () => void; onNext: () => void; onToday: () => void;
  onYearMonthSelect: (y: number, m: number) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const canGoPrev = year > MIN_YEAR || month > 0;
  const canGoNext = year < MAX_YEAR || month < 11;

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className={`w-9 h-9 flex items-center justify-center rounded-full bg-surface-card border border-border/30 active:scale-90 transition-transform ${!canGoPrev ? 'opacity-30 pointer-events-none' : ''}`}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center flex flex-col items-center">
          {/* Tappable month/year — opens picker */}
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="group flex items-center gap-1.5"
          >
            <h2 className="text-base font-bold text-white group-active:text-amber-400 transition-colors">
              {MONTH_NAMES[month]} {year}
            </h2>
            <svg className={`w-3.5 h-3.5 text-amber-400/70 transition-transform duration-300 ${showPicker ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[10px] text-amber-400/70 font-medium">{hinduMonth} Month</p>
            <button
              onClick={onToday}
              className="text-[9px] font-bold text-primary-light bg-primary/15 px-2 py-0.5 rounded-full border border-primary/25 hover:bg-primary/25 active:scale-95 transition-all"
            >
              Today
            </button>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`w-9 h-9 flex items-center justify-center rounded-full bg-surface-card border border-border/30 active:scale-90 transition-transform ${!canGoNext ? 'opacity-30 pointer-events-none' : ''}`}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Year/Month Picker */}
      {showPicker && (
        <YearMonthPicker
          year={year}
          month={month}
          onSelect={(y, m) => { onYearMonthSelect(y, m); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

function CalendarGrid({
  data, today, selectedDay, onSelectDay,
}: {
  data: ReturnType<typeof getMonthData>;
  today: { y: number; m: number; d: number };
  selectedDay: number | null;
  onSelectDay: (d: number) => void;
}) {
  let dayNum = 0;

  return (
    <div className="mx-4">
      <div className="bg-surface-card rounded-2xl border border-border/30 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border/20">
          {DAY_HEADERS.map((d, i) => (
            <div key={d} className={`py-2 text-center text-[10px] font-bold uppercase tracking-wider ${
              i === 0 ? 'text-red-400/80' : 'text-text-secondary/60'
            }`}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {data.days.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="aspect-square border-b border-r border-border/10" />;
            }
            dayNum++;
            const d = dayNum;
            const isToday = data.year === today.y && data.month === today.m && d === today.d;
            const isSelected = selectedDay === d;
            const isSunday = idx % 7 === 0;
            const hasFestival = day.festivals.length > 0;
            const hasMajorFestival = day.festivals.some(f => f.type === 'major');

            return (
              <button
                key={`day-${d}`}
                onClick={() => onSelectDay(d)}
                className={`relative aspect-square flex flex-col items-center justify-center border-b border-r border-border/10 transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500/20 ring-1 ring-amber-400/40 z-10'
                    : isToday
                    ? 'bg-primary/15'
                    : 'hover:bg-surface/50 active:bg-surface/70'
                }`}
              >
                {/* Date number */}
                <span className={`text-sm font-semibold leading-none ${
                  isToday
                    ? 'text-primary-light'
                    : isSunday
                    ? 'text-red-400'
                    : 'text-text-primary'
                }`}>
                  {d}
                </span>

                {/* Tithi abbreviation */}
                <span className="text-[7px] text-text-secondary/50 mt-0.5 leading-none truncate max-w-[90%]">
                  {day.tithi.replace('Shukla ', 'S.').replace('Krishna ', 'K.')}
                </span>

                {/* Festival indicator dots */}
                {hasFestival && (
                  <div className="flex gap-0.5 mt-0.5">
                    {hasMajorFestival && <div className="w-1 h-1 rounded-full bg-amber-400" />}
                    {day.festivals.some(f => f.type === 'fast') && <div className="w-1 h-1 rounded-full bg-cyan-400" />}
                    {day.festivals.some(f => f.type === 'government') && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                    {day.festivals.some(f => f.type === 'regional') && <div className="w-1 h-1 rounded-full bg-orange-400" />}
                  </div>
                )}

                {/* Today ring */}
                {isToday && (
                  <div className="absolute inset-0.5 border-2 border-primary/40 rounded-lg pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2.5 px-2">
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-[9px] text-text-secondary/60">Major</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span className="text-[9px] text-text-secondary/60">Vrat</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /><span className="text-[9px] text-text-secondary/60">National</span></div>
        <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span className="text-[9px] text-text-secondary/60">Regional</span></div>
      </div>
    </div>
  );
}

function DayDetailCard({
  day, dateNum, monthName, year, onClose,
}: {
  day: DayPanchang; dateNum: number; monthName: string; year: number; onClose: () => void;
}) {
  return (
    <div className="mx-4 mt-3 animate-in slide-in-from-bottom-4 duration-400">
      <div className="relative overflow-hidden bg-surface-card rounded-2xl border border-amber-500/20">
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-amber-600/25 via-orange-500/15 to-yellow-600/15 px-4 py-3 flex items-center justify-between border-b border-amber-500/15">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{moonIcon(day.moonPhase)}</span>
            <div>
              <h3 className="text-sm font-bold text-white">{dateNum} {monthName} {year}</h3>
              <p className="text-[10px] text-amber-200/60">{day.tithi} &bull; {day.paksha} Paksha</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Panchang row */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Nakshatra', value: day.nakshatra, icon: '⭐' },
              { label: 'Yoga', value: day.yoga, icon: '🔮' },
              { label: 'Tithi', value: day.tithi, icon: '🌙' },
              { label: 'Moon Phase', value: day.moonPhase.charAt(0).toUpperCase() + day.moonPhase.slice(1), icon: moonIcon(day.moonPhase) },
            ].map((item) => (
              <div key={item.label} className="bg-surface/50 rounded-xl px-3 py-2 border border-border/20">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">{item.icon}</span>
                  <span className="text-[9px] text-text-secondary/60 uppercase tracking-wider font-semibold">{item.label}</span>
                </div>
                <p className="text-xs font-semibold text-text-primary truncate">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Auspiciousness */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
            day.isAuspicious
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-orange-500/10 border-orange-500/20'
          }`}>
            <div className={`w-2 h-2 rounded-full ${day.isAuspicious ? 'bg-green-400' : 'bg-orange-400'}`} />
            <span className={`text-xs font-medium ${day.isAuspicious ? 'text-green-400' : 'text-orange-400'}`}>
              {day.isAuspicious ? 'Generally Auspicious Day' : 'Mixed Auspiciousness'}
            </span>
          </div>

          {/* Festivals for this day */}
          {day.festivals.length > 0 && (
            <div>
              <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold mb-2">Festivals & Events</p>
              <div className="space-y-1.5">
                {day.festivals.map((f, i) => {
                  const badge = FESTIVAL_BADGE[f.type];
                  return (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-xl border ${badge.bg}`}>
                      <span className={`text-xs font-semibold ${f.color}`}>{f.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FestivalList({ festivals }: { festivals: { date: number; festival: Festival }[] }) {
  if (festivals.length === 0) {
    return (
      <div className="mx-4 mt-4 bg-surface-card rounded-2xl border border-border/30 p-6 text-center">
        <span className="text-3xl">🕉️</span>
        <p className="text-xs text-text-secondary mt-2">No festivals this month</p>
      </div>
    );
  }

  // Group & deduplicate
  const seen = new Set<string>();
  const unique = festivals.filter(f => {
    const key = `${f.date}-${f.festival.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🎊</span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
          Festivals & Events
        </h3>
        <div className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          {unique.length}
        </div>
      </div>

      <div className="space-y-2">
        {unique.map((f, i) => {
          const badge = FESTIVAL_BADGE[f.festival.type];
          return (
            <div key={i} className="bg-surface-card rounded-xl border border-border/30 px-3.5 py-2.5 flex items-center gap-3">
              {/* Date circle */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/15 border border-amber-500/20 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-amber-400 leading-none">{f.date}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${f.festival.color} truncate`}>{f.festival.name}</p>
                <p className="text-[10px] text-text-secondary/60 truncate">{f.festival.nameHi}</p>
              </div>

              {/* Type badge */}
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${badge.bg} ${badge.text}`}>
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RegionalCalendarGrid() {
  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">📅</span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
          Regional Calendars
        </h3>
        <div className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
          {REGIONAL_CALENDARS.length}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {REGIONAL_CALENDARS.map((cal) => (
          <div
            key={cal.key}
            className="relative group bg-surface-card rounded-2xl border border-border/40 overflow-hidden transition-all duration-300 hover:border-amber-500/30 active:scale-[0.97]"
          >
            {/* Top gradient strip */}
            <div className={`h-1 bg-gradient-to-r ${cal.gradient}`} />

            <div className="p-3.5">
              {/* Icon & Title */}
              <div className="flex items-start gap-2.5 mb-1.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cal.gradient} flex items-center justify-center text-lg shadow-md flex-shrink-0`}>
                  {cal.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[12px] font-bold text-white leading-tight truncate">{cal.name}</h4>
                  <p className="text-[10px] text-text-secondary/70 truncate">{cal.nameHi}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[10px] text-text-secondary/50 leading-relaxed line-clamp-2 mt-1">
                {cal.description}
              </p>
            </div>

            {/* Coming soon overlay */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-bold text-amber-400 bg-surface-card/90 px-3 py-1 rounded-full border border-amber-500/30">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main Page ----

export default function CalendarPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const ist = useMemo(() => getIST(), []);

  const [viewYear, setViewYear] = useState(ist.getFullYear());
  const [viewMonth, setViewMonth] = useState(ist.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const today = useMemo(() => ({
    y: ist.getFullYear(),
    m: ist.getMonth(),
    d: ist.getDate(),
  }), [ist]);

  const monthData = useMemo(() => getMonthData(viewYear, viewMonth), [viewYear, viewMonth]);

  // Navigation
  const goToPrev = () => {
    if (viewMonth === 0) {
      if (viewYear > MIN_YEAR) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      }
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
  };

  const goToNext = () => {
    if (viewMonth === 11) {
      if (viewYear < MAX_YEAR) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      }
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setViewYear(today.y);
    setViewMonth(today.m);
    setSelectedDay(today.d);
  };

  const goToYearMonth = (y: number, m: number) => {
    setViewYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, y)));
    setViewMonth(m);
    setSelectedDay(null);
  };

  // Get selected day's panchang
  const selectedDayPanchang = selectedDay
    ? monthData.days[monthData.startDay + selectedDay - 1]
    : null;

  // Count festivals by type for month summary
  const majorCount = monthData.festivals.filter(f => f.festival.type === 'major').length;
  const vratCount = monthData.festivals.filter(f => f.festival.type === 'fast').length;
  const totalFestivals = new Set(monthData.festivals.map(f => f.festival.name)).size;

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-40 -right-20" opacity={0.03} size={400} color="#F59E0B" />
      <KundliWatermark className="top-[900px] -left-24" opacity={0.025} size={350} color="#D97706" />
      <KundliWatermark className="top-[1600px] -right-16" opacity={0.02} size={300} color="#EA580C" />

      <div className="relative z-10">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-yellow-600/15 border-b border-amber-500/20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-orange-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-lg" />

          <div className="relative px-4 pt-12 pb-5">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white">{t('calendar')}</h1>
                <p className="text-[11px] text-amber-200/60 mt-0.5">Hindu Panchang & Festivals</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Month Summary */}
        <div className="mx-4 mt-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-600/15 via-surface-card to-orange-600/10 rounded-2xl border border-amber-500/20 p-4">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="relative grid grid-cols-3 gap-2">
              <div className="text-center bg-amber-500/10 rounded-xl py-2.5 px-2 border border-amber-500/20">
                <div className="text-xl font-bold text-amber-400">{totalFestivals}</div>
                <div className="text-[9px] text-amber-300/70 font-medium mt-0.5">Festivals</div>
              </div>
              <div className="text-center bg-orange-500/10 rounded-xl py-2.5 px-2 border border-orange-500/20">
                <div className="text-xl font-bold text-orange-400">{majorCount}</div>
                <div className="text-[9px] text-orange-300/70 font-medium mt-0.5">Major</div>
              </div>
              <div className="text-center bg-cyan-500/10 rounded-xl py-2.5 px-2 border border-cyan-500/20">
                <div className="text-xl font-bold text-cyan-400">{vratCount}</div>
                <div className="text-[9px] text-cyan-300/70 font-medium mt-0.5">Vrat Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <MonthHeader
          year={viewYear}
          month={viewMonth}
          hinduMonth={monthData.hinduMonth}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
          onYearMonthSelect={goToYearMonth}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          data={monthData}
          today={today}
          selectedDay={selectedDay}
          onSelectDay={(d) => setSelectedDay(selectedDay === d ? null : d)}
        />

        {/* Selected Day Detail */}
        {selectedDay && selectedDayPanchang && (
          <DayDetailCard
            day={selectedDayPanchang}
            dateNum={selectedDay}
            monthName={MONTH_NAMES[viewMonth]}
            year={viewYear}
            onClose={() => setSelectedDay(null)}
          />
        )}

        {/* Festival List */}
        <FestivalList festivals={monthData.festivals} />

        {/* Regional Calendar Grid */}
        <RegionalCalendarGrid />

        {/* CTA */}
        <div className="px-4 pt-6 pb-8">
          <button
            onClick={() => router.push('/chat')}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-transform"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t('chat')} — Ask About Festivals & Muhurats
          </button>

          <p className="text-[10px] text-text-secondary text-center mt-3 px-4">
            Festival dates are approximate. For precise Panchang, consult a Vedic astrologer.
          </p>
        </div>
      </div>
    </div>
  );
}
