'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import KundliWatermark from '@/components/ui/KundliWatermark';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getMonthData,
  REGIONAL_CALENDARS,
  type CalendarType,
  type DayPanchang,
  type Festival,
} from '@/lib/calendar-utils';
import {
  REGIONAL_MONTHS,
  REGIONAL_FESTIVALS,
  NAVRATRI_SCHEDULE,
  getRegionalMonthForDate,
  getRegionalYear,
  getRegionalYearName,
  getSankrantiDates,
  getNavratriStartDates,
  MONTH_NAMES_SHORT,
  MONTH_NAMES_FULL,
} from '@/lib/regional-calendar-data';

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

// ---- Regional Detail Panels ----

function HinduCalendarDetail({ year, month }: { year: number; month: number }) {
  const data = useMemo(() => getMonthData(year, month), [year, month]);
  const days: { day: number; panchang: DayPanchang }[] = [];
  let dayNum = 0;
  for (const d of data.days) {
    if (d) {
      dayNum++;
      days.push({ day: dayNum, panchang: d });
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold px-1">
        {MONTH_NAMES[month]} {year} — Daily Panchang
      </p>
      <div className="bg-surface/30 rounded-xl border border-border/20 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-px bg-amber-500/10 border-b border-border/20 px-3 py-2">
          <span className="text-[9px] font-bold text-amber-400 uppercase">Date</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase">Tithi</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase">Nakshatra</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase">Yoga</span>
        </div>
        {/* Rows */}
        <div className="max-h-[300px] overflow-y-auto">
          {days.map(({ day, panchang }) => (
            <div key={day} className={`grid grid-cols-4 gap-px px-3 py-1.5 border-b border-border/10 ${
              panchang.festivals.length > 0 ? 'bg-amber-500/5' : ''
            }`}>
              <span className="text-[11px] font-semibold text-text-primary">{day}</span>
              <span className="text-[10px] text-text-secondary truncate">{panchang.tithi.replace('Shukla ', 'S.').replace('Krishna ', 'K.')}</span>
              <span className="text-[10px] text-text-secondary truncate">{panchang.nakshatra}</span>
              <span className="text-[10px] text-text-secondary truncate">{panchang.yoga}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FestivalCalendarDetail({ year, filterType }: { year: number; filterType: 'major' | 'fast' }) {
  const allFestivals = useMemo(() => {
    const result: { month: number; festivals: { date: number; festival: Festival }[] }[] = [];
    for (let m = 0; m < 12; m++) {
      const data = getMonthData(year, m);
      const seen = new Set<string>();
      const filtered = data.festivals.filter(f => {
        if (f.festival.type !== filterType) return false;
        const key = `${f.date}-${f.festival.name}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      if (filtered.length > 0) {
        result.push({ month: m, festivals: filtered });
      }
    }
    return result;
  }, [year, filterType]);

  const label = filterType === 'major' ? 'Major Festivals' : 'Vrat & Fasting Days';

  return (
    <div className="space-y-3">
      <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold px-1">
        {label} — {year}
      </p>
      {allFestivals.length === 0 ? (
        <div className="text-center py-6">
          <span className="text-2xl">🕉️</span>
          <p className="text-xs text-text-secondary mt-2">No data available for {year}</p>
        </div>
      ) : (
        allFestivals.map(({ month, festivals }) => (
          <div key={month}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${filterType === 'major' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
              <span className="text-[11px] font-bold text-white">{MONTH_NAMES[month]}</span>
              <span className="text-[9px] text-text-secondary/50">{festivals.length}</span>
            </div>
            <div className="space-y-1.5 ml-3.5">
              {festivals.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-surface/30 rounded-lg px-3 py-2 border border-border/15">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    filterType === 'major'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {f.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold truncate ${f.festival.color}`}>{f.festival.name}</p>
                    <p className="text-[9px] text-text-secondary/50 truncate">{f.festival.nameHi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function RegionalCalDetail({ region, year }: { region: string; year: number }) {
  const info = REGIONAL_MONTHS[region];
  const festivals = REGIONAL_FESTIVALS[region] || [];
  if (!info) return <p className="text-xs text-text-secondary">No data available</p>;

  const regYear = getRegionalYear(region, year);
  const yearName = getRegionalYearName(region);

  return (
    <div className="space-y-4">
      {/* Regional Year */}
      <div className="flex items-center gap-2 bg-amber-500/10 rounded-xl px-4 py-2.5 border border-amber-500/20">
        <span className="text-lg">📜</span>
        <div>
          <p className="text-xs font-bold text-amber-400">{yearName} {regYear}</p>
          <p className="text-[9px] text-amber-300/60">Regional year for Gregorian {year}</p>
        </div>
      </div>

      {/* Month mapping */}
      <div>
        <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold px-1 mb-2">
          Month Names
        </p>
        <div className="bg-surface/30 rounded-xl border border-border/20 overflow-hidden">
          <div className="grid grid-cols-2 gap-px bg-amber-500/10 border-b border-border/20 px-3 py-2">
            <span className="text-[9px] font-bold text-amber-400 uppercase">Gregorian</span>
            <span className="text-[9px] font-bold text-amber-400 uppercase">Regional</span>
          </div>
          {MONTH_NAMES_SHORT.map((greg, i) => (
            <div key={i} className="grid grid-cols-2 gap-px px-3 py-1.5 border-b border-border/10">
              <span className="text-[11px] text-text-secondary">{greg}</span>
              <span className="text-[11px] font-medium text-text-primary">{getRegionalMonthForDate(region, i)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional festivals */}
      {festivals.length > 0 && (
        <div>
          <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold px-1 mb-2">
            Key Festivals
          </p>
          <div className="space-y-1.5">
            {festivals.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-surface/30 rounded-lg px-3 py-2 border border-border/15">
                <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold">
                  {f.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{f.name}</p>
                  <p className="text-[9px] text-text-secondary/50 truncate">{f.nameLocal}</p>
                </div>
                <span className="text-[9px] text-text-secondary/40">{MONTH_NAMES_SHORT[f.month - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SankrantiDetail({ year }: { year: number }) {
  const dates = getSankrantiDates();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-text-secondary/60 uppercase tracking-wider font-semibold px-1">
        Solar Transits — {year}
      </p>
      <div className="bg-surface/30 rounded-xl border border-border/20 overflow-hidden">
        <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-px bg-amber-500/10 border-b border-border/20 px-3 py-2">
          <span className="text-[9px] font-bold text-amber-400 uppercase">Date</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase">Sankranti</span>
          <span className="text-[9px] font-bold text-amber-400 uppercase">Zodiac</span>
        </div>
        {dates.map((s, i) => {
          const isCurrent = s.month === currentMonth;
          return (
            <div key={i} className={`grid grid-cols-[1fr_1.5fr_1fr] gap-px px-3 py-2 border-b border-border/10 ${
              isCurrent ? 'bg-amber-500/10' : ''
            }`}>
              <span className="text-[11px] font-semibold text-text-primary">
                {s.day} {MONTH_NAMES_SHORT[s.month - 1]}
              </span>
              <div>
                <p className="text-[11px] font-medium text-white truncate">{s.name}</p>
                <p className="text-[9px] text-text-secondary/50 truncate">{s.nameHi}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">{s.zodiacSymbol}</span>
                <span className="text-[10px] text-text-secondary truncate">{s.zodiac}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavratriDetail({ year }: { year: number }) {
  const starts = getNavratriStartDates(year);

  const formatDate = (m: number, d: number) => `${d} ${MONTH_NAMES_FULL[m - 1]}`;

  return (
    <div className="space-y-5">
      {/* Chaitra Navratri */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🌸</span>
          <div>
            <p className="text-xs font-bold text-white">Chaitra Navratri</p>
            <p className="text-[9px] text-text-secondary/50">Starts {formatDate(starts.chaitra.month, starts.chaitra.day)}, {year}</p>
          </div>
        </div>
        <NavratriTable />
      </div>

      {/* Sharad Navratri */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🔱</span>
          <div>
            <p className="text-xs font-bold text-white">Sharad Navratri</p>
            <p className="text-[9px] text-text-secondary/50">Starts {formatDate(starts.sharad.month, starts.sharad.day)}, {year}</p>
          </div>
        </div>
        <NavratriTable />
      </div>
    </div>
  );
}

function NavratriTable() {
  return (
    <div className="bg-surface/30 rounded-xl border border-border/20 overflow-hidden">
      <div className="grid grid-cols-[40px_1fr_70px] gap-px bg-red-500/10 border-b border-border/20 px-3 py-2">
        <span className="text-[9px] font-bold text-red-400 uppercase">Day</span>
        <span className="text-[9px] font-bold text-red-400 uppercase">Goddess</span>
        <span className="text-[9px] font-bold text-red-400 uppercase">Color</span>
      </div>
      {NAVRATRI_SCHEDULE.map((d) => (
        <div key={d.day} className="grid grid-cols-[40px_1fr_70px] gap-px px-3 py-2 border-b border-border/10">
          <span className="text-[11px] font-bold text-white">{d.day}</span>
          <div>
            <p className="text-[11px] font-medium text-white">{d.deity}</p>
            <p className="text-[9px] text-text-secondary/50 truncate">{d.meaning}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: d.colorHex }} />
            <span className="text-[10px] text-text-secondary">{d.color}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RegionalDetailPanel({
  cal, year, month, onClose,
}: {
  cal: CalendarType; year: number; month: number; onClose: () => void;
}) {
  // Determine content
  let content: React.ReactNode;
  switch (cal.key) {
    case 'hindu':
      content = <HinduCalendarDetail year={year} month={month} />;
      break;
    case 'festival':
      content = <FestivalCalendarDetail year={year} filterType="major" />;
      break;
    case 'fast':
      content = <FestivalCalendarDetail year={year} filterType="fast" />;
      break;
    case 'tamil': case 'bengali': case 'telugu':
    case 'gujarati': case 'kannada': case 'malayalam':
      content = <RegionalCalDetail region={cal.key} year={year} />;
      break;
    case 'sankranti':
      content = <SankrantiDetail year={year} />;
      break;
    case 'navratri':
      content = <NavratriDetail year={year} />;
      break;
    default:
      content = <p className="text-xs text-text-secondary py-4 text-center">Content coming soon</p>;
  }

  return (
    <div className="mx-4 mt-3 animate-in slide-in-from-bottom-4 duration-400">
      <div className="relative overflow-hidden bg-surface-card rounded-2xl border border-amber-500/20">
        {/* Gradient header */}
        <div className={`bg-gradient-to-r ${cal.gradient} relative h-14`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -bottom-5 left-4">
            <div className="w-10 h-10 rounded-xl bg-surface-card border-2 border-background flex items-center justify-center text-xl shadow-lg">
              {cal.icon}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 pt-7">
          {/* Title */}
          <h3 className="text-sm font-bold text-white mb-0.5">{cal.name}</h3>
          <p className="text-[10px] text-text-secondary/60 mb-4">{cal.description}</p>

          {/* Content */}
          {content}
        </div>
      </div>
    </div>
  );
}

function RegionalCalendarGrid({
  year, month, calendarGridRef,
}: {
  year: number; month: number; calendarGridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [selectedCal, setSelectedCal] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Scroll to detail panel when selected
  useEffect(() => {
    if (selectedCal && selectedCal !== 'monthly' && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [selectedCal]);

  const handleTileClick = useCallback((key: string) => {
    if (key === 'monthly') {
      // Scroll to the main calendar grid
      calendarGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedCal(null);
      return;
    }
    setSelectedCal(prev => prev === key ? null : key);
  }, [calendarGridRef]);

  const selectedCalData = selectedCal
    ? REGIONAL_CALENDARS.find(c => c.key === selectedCal)
    : null;

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
        {REGIONAL_CALENDARS.map((cal) => {
          const isSelected = selectedCal === cal.key;
          return (
            <button
              key={cal.key}
              onClick={() => handleTileClick(cal.key)}
              className={`relative group bg-surface-card rounded-2xl border overflow-hidden transition-all duration-300 text-left ${
                isSelected
                  ? 'ring-2 ring-amber-400/60 border-amber-500/40 scale-[0.97] shadow-lg shadow-amber-500/10'
                  : 'border-border/40 hover:border-amber-500/30 active:scale-[0.97]'
              }`}
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

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selectedCal && selectedCalData && (
        <div ref={detailRef}>
          <RegionalDetailPanel
            cal={selectedCalData}
            year={year}
            month={month}
            onClose={() => setSelectedCal(null)}
          />
        </div>
      )}
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
  const calendarGridRef = useRef<HTMLDivElement>(null);

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
        <div ref={calendarGridRef}>
          <CalendarGrid
            data={monthData}
            today={today}
            selectedDay={selectedDay}
            onSelectDay={(d) => setSelectedDay(selectedDay === d ? null : d)}
          />
        </div>

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
        <RegionalCalendarGrid year={viewYear} month={viewMonth} calendarGridRef={calendarGridRef} />

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
