// ============================================================
// Muhurat Utilities — Client-side Vedic muhurat calculations
// ============================================================

export type MuhuratStatus = 'active' | 'upcoming' | 'passed' | 'not-today';

export type MuhuratCategory =
  | 'daily-timing'
  | 'yoga-combination'
  | 'life-event'
  | 'timing-table'
  | 'caution-period';

export type MuhuratKey =
  | 'abhijitMuhurat' | 'doGhatiMuhurat' | 'brahmaMuhurat' | 'chaughadia'
  | 'guruPushyaYoga' | 'raviPushyaYoga' | 'amritSiddhiYoga' | 'sarvarthaSiddhiYoga' | 'pushyaNakshatra'
  | 'vehiclePurchase' | 'propertyPurchase' | 'namkaran' | 'mundan' | 'grihaPravesh'
  | 'lagnaTable' | 'gowriPanchangam' | 'horaCalculator'
  | 'panchak' | 'bhadra' | 'rahuKaal';

export interface MuhuratTile {
  key: MuhuratKey;
  title: string;
  subtitle: string;
  icon: string;
  category: MuhuratCategory;
  gradient: string;
}

export interface MuhuratTimeWindow {
  label?: string;
  start: string;
  end: string;
}

export interface TableRow {
  label: string;
  time: string;
  extra?: string;
  isActive?: boolean;
  isFavourable?: boolean;
}

export interface MuhuratResult {
  status: MuhuratStatus;
  timeWindows: MuhuratTimeWindow[];
  description: string;
  activities: string[];
  specialNote?: string;
  tableData?: TableRow[];
}

// ---- Tile definitions (order matches AstroSage grid) ----

export const MUHURAT_TILES: MuhuratTile[] = [
  // Daily Timings
  { key: 'abhijitMuhurat', title: 'Abhijit Muhurat', subtitle: 'Victory Time', icon: '🏆', category: 'daily-timing', gradient: 'from-orange-600 to-amber-500' },
  { key: 'doGhatiMuhurat', title: 'Do Ghati Muhurat', subtitle: 'Two-Ghati Window', icon: '⏳', category: 'daily-timing', gradient: 'from-orange-500 to-amber-500' },
  { key: 'brahmaMuhurat', title: 'Brahma Muhurat', subtitle: 'Pre-Dawn Window', icon: '🌅', category: 'daily-timing', gradient: 'from-amber-600 to-orange-500' },
  { key: 'chaughadia', title: 'Chaughadia', subtitle: 'Day/Night Periods', icon: '🔔', category: 'daily-timing', gradient: 'from-amber-500 to-yellow-600' },

  // Yoga Combinations
  { key: 'guruPushyaYoga', title: 'Guru Pushya Yoga', subtitle: 'Thursday + Pushya', icon: '🪐', category: 'yoga-combination', gradient: 'from-amber-500 to-yellow-500' },
  { key: 'raviPushyaYoga', title: 'Ravi Pushya Yoga', subtitle: 'Sunday + Pushya', icon: '☀️', category: 'yoga-combination', gradient: 'from-yellow-500 to-amber-500' },
  { key: 'amritSiddhiYoga', title: 'Amrit Siddhi Yoga', subtitle: 'Nectar of Success', icon: '💧', category: 'yoga-combination', gradient: 'from-amber-600 to-yellow-500' },
  { key: 'sarvarthaSiddhiYoga', title: 'Sarvartha Siddhi', subtitle: 'All-Purpose Success', icon: '✨', category: 'yoga-combination', gradient: 'from-yellow-600 to-amber-500' },
  { key: 'pushyaNakshatra', title: 'Pushya Nakshatra', subtitle: 'Most Auspicious Star', icon: '⭐', category: 'yoga-combination', gradient: 'from-amber-500 to-yellow-500' },

  // Life Events
  { key: 'vehiclePurchase', title: 'Vehicle Purchase', subtitle: 'Vaahan Muhurat', icon: '🚗', category: 'life-event', gradient: 'from-orange-500 to-amber-600' },
  { key: 'propertyPurchase', title: 'Property Purchase', subtitle: 'Bhoomi Muhurat', icon: '🏠', category: 'life-event', gradient: 'from-orange-600 to-amber-600' },
  { key: 'namkaran', title: 'Namkaran', subtitle: 'Naming Ceremony', icon: '👶', category: 'life-event', gradient: 'from-amber-500 to-orange-500' },
  { key: 'mundan', title: 'Mundan', subtitle: 'First Haircut', icon: '✂️', category: 'life-event', gradient: 'from-amber-600 to-orange-500' },
  { key: 'grihaPravesh', title: 'Griha Pravesh', subtitle: 'Housewarming', icon: '🏡', category: 'life-event', gradient: 'from-orange-500 to-amber-500' },

  // Timing Tables
  { key: 'lagnaTable', title: 'Lagna Table', subtitle: 'Ascendant Timings', icon: '📊', category: 'timing-table', gradient: 'from-amber-600 to-orange-500' },
  { key: 'gowriPanchangam', title: 'Gowri Panchangam', subtitle: 'Gowri Timings', icon: '🕐', category: 'timing-table', gradient: 'from-amber-500 to-yellow-600' },
  { key: 'horaCalculator', title: 'Hora Calculator', subtitle: 'Planetary Hours', icon: '🕰️', category: 'timing-table', gradient: 'from-amber-600 to-orange-500' },

  // Caution Periods
  { key: 'panchak', title: 'Panchak', subtitle: 'Five-Star Period', icon: '⚠️', category: 'caution-period', gradient: 'from-orange-700 to-red-500' },
  { key: 'bhadra', title: 'Bhadra', subtitle: 'Vishti Karana', icon: '🚫', category: 'caution-period', gradient: 'from-red-600 to-orange-600' },
  { key: 'rahuKaal', title: 'Rahu Kaal', subtitle: 'Inauspicious Period', icon: '🐍', category: 'caution-period', gradient: 'from-orange-700 to-red-600' },
];

// ---- Helpers ----

function getIST(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600000);
}

function minutesToTime(m: number): string {
  const totalMins = ((m % 1440) + 1440) % 1440;
  const h = Math.floor(totalMins / 60);
  const mins = Math.round(totalMins % 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${mins.toString().padStart(2, '0')} ${period}`;
}

const ZODIAC_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Moola', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];

// Chaldean order for Hora
const HORA_PLANETS = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
const HORA_PLANET_ICONS: Record<string, string> = {
  Sun: '☀️', Moon: '🌙', Mars: '♂️', Mercury: '☿️', Jupiter: '♃', Venus: '♀️', Saturn: '♄',
};

// Day lords (Sun=0 index)
const DAY_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

// Chaughadia names
const CHAUGHADIA_NAMES = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'];
const CHAUGHADIA_TYPE: Record<string, 'good' | 'bad' | 'neutral'> = {
  Amrit: 'good', Shubh: 'good', Labh: 'good', Char: 'neutral',
  Rog: 'bad', Kaal: 'bad', Udveg: 'bad',
};
// Starting chaughadia index for each day (Sun=0)
const CHAUGHADIA_DAY_START = [0, 3, 6, 2, 5, 1, 4]; // Udveg, Amrit, Rog, Labh, Shubh, Char, Kaal

// Gowri Panchangam slot names
const GOWRI_NAMES = ['Shubha', 'Labha', 'Amruta', 'Kala', 'Rogam', 'Udvega', 'Charam', 'Laabha'];
const GOWRI_TYPE: Record<string, boolean> = {
  Shubha: true, Labha: true, Amruta: true, Laabha: true,
  Kala: false, Rogam: false, Udvega: false, Charam: false,
};
// Gowri day rotation offsets (Sun=0)
const GOWRI_DAY_OFFSET = [0, 3, 6, 1, 4, 7, 2];

// Rahu Kaal by day of week
const RAHU_KAAL: Record<number, [number, number]> = {
  0: [16 * 60 + 30, 18 * 60],      // Sun: 4:30 PM - 6:00 PM
  1: [7 * 60 + 30, 9 * 60],         // Mon: 7:30 AM - 9:00 AM
  2: [15 * 60, 16 * 60 + 30],       // Tue: 3:00 PM - 4:30 PM
  3: [12 * 60, 13 * 60 + 30],       // Wed: 12:00 PM - 1:30 PM
  4: [13 * 60 + 30, 15 * 60],       // Thu: 1:30 PM - 3:00 PM
  5: [10 * 60 + 30, 12 * 60],       // Fri: 10:30 AM - 12:00 PM
  6: [9 * 60, 10 * 60 + 30],        // Sat: 9:00 AM - 10:30 AM
};

// Amrit Siddhi Yoga: day -> nakshatra index
const AMRIT_SIDDHI_PAIRS: [number, number][] = [
  [0, 12], // Sunday + Hasta
  [1, 12], // Monday + Hasta
  [2, 0],  // Tuesday + Ashwini
  [3, 16], // Wednesday + Anuradha
  [4, 7],  // Thursday + Pushya
  [5, 26], // Friday + Revati
  [6, 3],  // Saturday + Rohini
];

// Sarvartha Siddhi Yoga: day -> array of nakshatra indices
const SARVARTHA_SIDDHI: Record<number, number[]> = {
  0: [7, 12, 11, 20, 25, 0],              // Sun: Pushya, Hasta, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Ashwini
  1: [3, 4, 7, 16, 21, 12],               // Mon: Rohini, Mrigashira, Pushya, Anuradha, Shravana, Hasta
  2: [0, 11, 2, 16],                       // Tue: Ashwini, Uttara Phalguni, Krittika, Anuradha
  3: [3, 16, 12, 26],                      // Wed: Rohini, Anuradha, Hasta, Revati
  4: [0, 6, 7, 26, 16, 12],               // Thu: Ashwini, Punarvasu, Pushya, Revati, Anuradha, Hasta
  5: [0, 6, 16, 26, 21],                   // Fri: Ashwini, Punarvasu, Anuradha, Revati, Shravana
  6: [3, 14, 21],                           // Sat: Rohini, Swati, Shravana
};

// Life event muhurat criteria
interface EventCriteria {
  tithis: number[];       // favorable tithi indices (0-29)
  nakshatras: number[];   // favorable nakshatra indices (0-26)
  days: number[];         // favorable day of week (0-6)
}

const VEHICLE_CRITERIA: EventCriteria = {
  tithis: [1, 2, 4, 6, 9, 10, 11, 12],      // Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Dwadashi, Trayodashi
  nakshatras: [0, 3, 4, 7, 12, 14, 16, 26],   // Ashwini, Rohini, Mrigashira, Pushya, Hasta, Swati, Anuradha, Revati
  days: [1, 3, 4, 5],                           // Mon, Wed, Thu, Fri
};

const PROPERTY_CRITERIA: EventCriteria = {
  tithis: [1, 2, 4, 6, 9, 10, 11, 12],
  nakshatras: [3, 4, 11, 12, 13, 14, 16, 25, 26], // Rohini, Mrigashira, Uttara Phalguni, Hasta, Chitra, Swati, Anuradha, Uttara Bhadrapada, Revati
  days: [1, 3, 4, 5],
};

const NAMKARAN_CRITERIA: EventCriteria = {
  tithis: [1, 2, 4, 6, 9, 11],
  nakshatras: [0, 3, 4, 6, 7, 12, 13, 14, 16, 21, 22, 25, 26],
  days: [1, 3, 4, 5],
};

const MUNDAN_CRITERIA: EventCriteria = {
  tithis: [1, 2, 4, 6, 9, 11, 12],
  nakshatras: [0, 4, 7, 12, 13, 14, 17, 21, 22, 26],
  days: [1, 3, 4, 5],
};

const GRIHA_PRAVESH_CRITERIA: EventCriteria = {
  tithis: [1, 2, 4, 6, 9, 10, 11, 12],
  nakshatras: [3, 4, 11, 12, 14, 16, 20, 21, 22, 25, 26],
  days: [1, 3, 4, 5],
};

// ---- Today's Context ----

export interface TodayContext {
  now: Date;
  dayOfWeek: number;
  dayOfYear: number;
  sunriseMinutes: number;
  sunsetMinutes: number;
  currentMinutes: number;
  dayDuration: number;
  nightDuration: number;
  nakshatraIndex: number;
  tithiIndex: number;
  yogaIndex: number;
  karanaIndex: number;
}

export function getTodayContext(): TodayContext {
  const now = getIST();
  const dayOfWeek = now.getDay();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);

  // Sunrise/sunset approximation for India (~6:15 AM / 6:42 PM with seasonal variation)
  const seasonalOffset = Math.sin((dayOfYear / 365) * Math.PI) * 30; // +/- 30 min
  const sunriseMinutes = 6 * 60 + 15 - Math.round(seasonalOffset * 0.5);
  const sunsetMinutes = 18 * 60 + 42 + Math.round(seasonalOffset * 0.5);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const dayDuration = sunsetMinutes - sunriseMinutes;
  const nightDuration = 1440 - dayDuration;

  const nakshatraIndex = dayOfYear % 27;
  const tithiIndex = dayOfYear % 30;
  const yogaIndex = (dayOfYear + 5) % 27;
  const karanaIndex = (dayOfYear * 2) % 11;

  return {
    now, dayOfWeek, dayOfYear,
    sunriseMinutes, sunsetMinutes, currentMinutes,
    dayDuration, nightDuration,
    nakshatraIndex, tithiIndex, yogaIndex, karanaIndex,
  };
}

// ---- Individual Muhurat Calculators ----

function calcAbhijitMuhurat(ctx: TodayContext): MuhuratResult {
  const muhurtaDuration = ctx.dayDuration / 15;
  const start = ctx.sunriseMinutes + 7 * muhurtaDuration;
  const end = start + muhurtaDuration;
  const status: MuhuratStatus = ctx.currentMinutes >= start && ctx.currentMinutes < end ? 'active'
    : ctx.currentMinutes < start ? 'upcoming' : 'passed';

  return {
    status,
    timeWindows: [{ start: minutesToTime(start), end: minutesToTime(end) }],
    description: 'The 8th muhurta of the day, ruled by Lord Vishnu. Most auspicious time for starting any new venture, considered victorious for all activities.',
    activities: ['New ventures', 'Signing contracts', 'Travel', 'Investments', 'Important meetings'],
    specialNote: ctx.dayOfWeek === 3 ? 'Some traditions consider Abhijit Muhurat less effective on Wednesdays.' : undefined,
  };
}

function calcDoGhatiMuhurat(ctx: TodayContext): MuhuratResult {
  const midday = (ctx.sunriseMinutes + ctx.sunsetMinutes) / 2;
  const start = midday - 24;
  const end = midday + 24;
  const status: MuhuratStatus = ctx.currentMinutes >= start && ctx.currentMinutes < end ? 'active'
    : ctx.currentMinutes < start ? 'upcoming' : 'passed';

  return {
    status,
    timeWindows: [{ start: minutesToTime(start), end: minutesToTime(end) }],
    description: 'A 48-minute window (2 Ghatis) centered around local noon. Considered highly auspicious for starting important tasks.',
    activities: ['Puja & rituals', 'Starting new work', 'Important decisions', 'Charitable acts'],
  };
}

function calcBrahmaMuhurat(ctx: TodayContext): MuhuratResult {
  const start = ctx.sunriseMinutes - 96;
  const end = ctx.sunriseMinutes - 48;
  const status: MuhuratStatus = ctx.currentMinutes >= start && ctx.currentMinutes < end ? 'active'
    : ctx.currentMinutes < start ? 'upcoming' : 'passed';

  return {
    status,
    timeWindows: [{ start: minutesToTime(start), end: minutesToTime(end) }],
    description: 'The divine hour before dawn (2 muhurtas before sunrise). Sattvic energy is at its peak. Ideal for spiritual practices, meditation, and study.',
    activities: ['Meditation', 'Yoga & Pranayama', 'Study & learning', 'Mantra chanting', 'Self-reflection'],
  };
}

function calcChaughadia(ctx: TodayContext): MuhuratResult {
  const daySlotDuration = ctx.dayDuration / 8;
  const nightSlotDuration = ctx.nightDuration / 8;
  const startIdx = CHAUGHADIA_DAY_START[ctx.dayOfWeek];
  const table: TableRow[] = [];
  let activeSlot = '';

  // Day Chaughadia (8 slots)
  for (let i = 0; i < 8; i++) {
    const slotStart = ctx.sunriseMinutes + i * daySlotDuration;
    const slotEnd = slotStart + daySlotDuration;
    const nameIdx = (startIdx + i) % 7;
    const name = CHAUGHADIA_NAMES[nameIdx];
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeSlot = name;
    table.push({
      label: `${name} (Day)`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: CHAUGHADIA_TYPE[name] === 'good' ? 'Auspicious' : CHAUGHADIA_TYPE[name] === 'bad' ? 'Inauspicious' : 'Neutral',
      isActive,
      isFavourable: CHAUGHADIA_TYPE[name] === 'good',
    });
  }

  // Night Chaughadia (8 slots) — starts from sunset, different rotation
  const nightStartIdx = (startIdx + 4) % 7;
  for (let i = 0; i < 8; i++) {
    const slotStart = ctx.sunsetMinutes + i * nightSlotDuration;
    const slotEnd = slotStart + nightSlotDuration;
    const nameIdx = (nightStartIdx + i) % 7;
    const name = CHAUGHADIA_NAMES[nameIdx];
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeSlot = name;
    table.push({
      label: `${name} (Night)`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: CHAUGHADIA_TYPE[name] === 'good' ? 'Auspicious' : CHAUGHADIA_TYPE[name] === 'bad' ? 'Inauspicious' : 'Neutral',
      isActive,
      isFavourable: CHAUGHADIA_TYPE[name] === 'good',
    });
  }

  return {
    status: activeSlot ? 'active' : 'upcoming',
    timeWindows: [],
    description: `Day and night divided into 8 periods each. Current period: ${activeSlot || 'calculating...'}. Amrit, Shubh, and Labh are auspicious; Rog, Kaal, and Udveg are inauspicious.`,
    activities: ['Plan activities during Amrit/Shubh/Labh', 'Avoid new work during Rog/Kaal/Udveg'],
    tableData: table,
  };
}

function calcGuruPushyaYoga(ctx: TodayContext): MuhuratResult {
  const isActive = ctx.dayOfWeek === 4 && ctx.nakshatraIndex === 7;
  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: minutesToTime(ctx.sunriseMinutes), end: minutesToTime(ctx.sunsetMinutes) }] : [],
    description: isActive
      ? 'Guru Pushya Yoga is active today! This rare combination of Thursday (Jupiter\'s day) and Pushya Nakshatra is highly auspicious for all activities.'
      : 'Occurs when Thursday falls on Pushya Nakshatra. One of the most auspicious yogas in Vedic astrology, perfect for buying gold, starting education, or any major venture.',
    activities: ['Buying gold & jewelry', 'Starting education', 'Business ventures', 'Investments', 'Spiritual initiation'],
    specialNote: isActive ? undefined : 'This yoga occurs approximately once every 6 months.',
  };
}

function calcRaviPushyaYoga(ctx: TodayContext): MuhuratResult {
  const isActive = ctx.dayOfWeek === 0 && ctx.nakshatraIndex === 7;
  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: minutesToTime(ctx.sunriseMinutes), end: minutesToTime(ctx.sunsetMinutes) }] : [],
    description: isActive
      ? 'Ravi Pushya Yoga is active today! Sunday (Sun\'s day) combined with Pushya Nakshatra creates an excellent combination for success.'
      : 'Occurs when Sunday falls on Pushya Nakshatra. This powerful yoga combines solar energy with the nourishing Pushya star for success and prosperity.',
    activities: ['Government work', 'Authority-related tasks', 'Health remedies', 'Starting new projects', 'Leadership roles'],
    specialNote: isActive ? undefined : 'This yoga occurs approximately once every 6 months.',
  };
}

function calcAmritSiddhiYoga(ctx: TodayContext): MuhuratResult {
  const isActive = AMRIT_SIDDHI_PAIRS.some(([d, n]) => d === ctx.dayOfWeek && n === ctx.nakshatraIndex);
  const todayPair = AMRIT_SIDDHI_PAIRS.find(([d]) => d === ctx.dayOfWeek);
  const requiredNakshatra = todayPair ? NAKSHATRA_NAMES[todayPair[1]] : '';

  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: minutesToTime(ctx.sunriseMinutes), end: minutesToTime(ctx.sunsetMinutes) }] : [],
    description: isActive
      ? 'Amrit Siddhi Yoga is active today! This day-nakshatra combination brings the nectar of success to all activities.'
      : `Today's required nakshatra for Amrit Siddhi is ${requiredNakshatra} (current: ${NAKSHATRA_NAMES[ctx.nakshatraIndex]}). This yoga forms when specific day-nakshatra pairs align.`,
    activities: ['All auspicious activities', 'Marriage ceremonies', 'New ventures', 'Travel', 'Important purchases'],
    tableData: AMRIT_SIDDHI_PAIRS.map(([d, n]) => ({
      label: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d],
      time: NAKSHATRA_NAMES[n],
      isActive: d === ctx.dayOfWeek && n === ctx.nakshatraIndex,
      isFavourable: true,
    })),
  };
}

function calcSarvarthaSiddhiYoga(ctx: TodayContext): MuhuratResult {
  const todayNakshatras = SARVARTHA_SIDDHI[ctx.dayOfWeek] || [];
  const isActive = todayNakshatras.includes(ctx.nakshatraIndex);

  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: minutesToTime(ctx.sunriseMinutes), end: minutesToTime(ctx.sunsetMinutes) }] : [],
    description: isActive
      ? 'Sarvartha Siddhi Yoga is active today! All endeavors are favored — success in any direction.'
      : `Today (${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][ctx.dayOfWeek]}) needs nakshatra: ${todayNakshatras.map(i => NAKSHATRA_NAMES[i]).join(', ')}. Current: ${NAKSHATRA_NAMES[ctx.nakshatraIndex]}.`,
    activities: ['All types of work', 'Business expansion', 'Property deals', 'Marriage discussions', 'Travel planning'],
  };
}

function calcPushyaNakshatra(ctx: TodayContext): MuhuratResult {
  const isActive = ctx.nakshatraIndex === 7;
  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: minutesToTime(ctx.sunriseMinutes), end: minutesToTime(ctx.sunsetMinutes) }] : [],
    description: isActive
      ? 'Pushya Nakshatra is active today! The most auspicious of all 27 nakshatras, ruled by Saturn and deity Brihaspati.'
      : `Current nakshatra: ${NAKSHATRA_NAMES[ctx.nakshatraIndex]}. Pushya is the 8th nakshatra, considered the king of nakshatras for its nourishing and protective qualities.`,
    activities: ['Buying gold', 'Starting businesses', 'Spiritual practices', 'Education', 'Healing activities'],
  };
}

function calcLifeEventMuhurat(ctx: TodayContext, criteria: EventCriteria, eventName: string, eventActivities: string[]): MuhuratResult {
  const tithiMatch = criteria.tithis.includes(ctx.tithiIndex % 15);
  const nakshatraMatch = criteria.nakshatras.includes(ctx.nakshatraIndex);
  const dayMatch = criteria.days.includes(ctx.dayOfWeek);
  const score = (tithiMatch ? 1 : 0) + (nakshatraMatch ? 1 : 0) + (dayMatch ? 1 : 0);

  let status: MuhuratStatus;
  let description: string;

  if (score >= 2) {
    status = 'active';
    description = `Today is favorable for ${eventName}! ${score === 3 ? 'Excellent — all three factors (tithi, nakshatra, day) align.' : 'Two of three factors align. Good time to proceed.'}`;
  } else if (score === 1) {
    status = 'upcoming';
    description = `Partially favorable for ${eventName}. One factor aligns: ${tithiMatch ? 'Tithi' : nakshatraMatch ? 'Nakshatra' : 'Day'}. Consider combining with Abhijit Muhurat for better results.`;
  } else {
    status = 'not-today';
    description = `Not recommended for ${eventName} today. Wait for a day when favorable tithi, nakshatra, and weekday align.`;
  }

  const details: TableRow[] = [
    { label: 'Tithi', time: tithiMatch ? 'Favorable' : 'Not favorable', isFavourable: tithiMatch, isActive: false },
    { label: 'Nakshatra', time: nakshatraMatch ? 'Favorable' : 'Not favorable', isFavourable: nakshatraMatch, isActive: false },
    { label: 'Day', time: dayMatch ? 'Favorable' : 'Not favorable', isFavourable: dayMatch, isActive: false },
    { label: 'Overall', time: score >= 2 ? 'Auspicious' : score === 1 ? 'Partial' : 'Not auspicious', isFavourable: score >= 2, isActive: true },
  ];

  return {
    status,
    timeWindows: score >= 2 ? [{ label: 'Best time', start: '11:50 AM', end: '12:38 PM' }] : [],
    description,
    activities: eventActivities,
    specialNote: score >= 2 ? 'Use Abhijit Muhurat (around noon) for the best results.' : 'Consult a pandit for personalized muhurat selection.',
    tableData: details,
  };
}

function calcLagnaTable(ctx: TodayContext): MuhuratResult {
  const slotDuration = ctx.dayDuration / 12;
  const table: TableRow[] = [];
  let activeLagna = '';

  for (let i = 0; i < 12; i++) {
    const slotStart = ctx.sunriseMinutes + i * slotDuration;
    const slotEnd = slotStart + slotDuration;
    const signIndex = (i + Math.floor(ctx.dayOfYear / 30)) % 12;
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeLagna = ZODIAC_NAMES[signIndex];

    table.push({
      label: ZODIAC_NAMES[signIndex],
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      isActive,
      isFavourable: [0, 1, 4, 8, 10].includes(signIndex), // Aries, Taurus, Leo, Sagittarius, Aquarius — generally favorable
    });
  }

  return {
    status: activeLagna ? 'active' : 'upcoming',
    timeWindows: [],
    description: `Current rising sign (Lagna): ${activeLagna || 'calculating...'}. The Lagna table shows which zodiac sign is ascending at each time of the day. Choose a favorable lagna for important activities.`,
    activities: ['Select auspicious lagna for ceremonies', 'Plan events around favorable ascendants'],
    tableData: table,
    specialNote: 'Approximate table based on equal house division. For precise lagna times, use location-specific calculations.',
  };
}

function calcGowriPanchangam(ctx: TodayContext): MuhuratResult {
  const daySlotDuration = ctx.dayDuration / 8;
  const nightSlotDuration = ctx.nightDuration / 8;
  const offset = GOWRI_DAY_OFFSET[ctx.dayOfWeek];
  const table: TableRow[] = [];
  let activeSlot = '';

  // Day slots
  for (let i = 0; i < 8; i++) {
    const slotStart = ctx.sunriseMinutes + i * daySlotDuration;
    const slotEnd = slotStart + daySlotDuration;
    const nameIdx = (offset + i) % 8;
    const name = GOWRI_NAMES[nameIdx];
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeSlot = name;

    table.push({
      label: `${name} (Day)`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: GOWRI_TYPE[name] ? 'Good' : 'Avoid',
      isActive,
      isFavourable: GOWRI_TYPE[name],
    });
  }

  // Night slots
  for (let i = 0; i < 8; i++) {
    const slotStart = ctx.sunsetMinutes + i * nightSlotDuration;
    const slotEnd = slotStart + nightSlotDuration;
    const nameIdx = (offset + 4 + i) % 8;
    const name = GOWRI_NAMES[nameIdx];
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeSlot = name;

    table.push({
      label: `${name} (Night)`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: GOWRI_TYPE[name] ? 'Good' : 'Avoid',
      isActive,
      isFavourable: GOWRI_TYPE[name],
    });
  }

  return {
    status: activeSlot ? 'active' : 'upcoming',
    timeWindows: [],
    description: `Current Gowri period: ${activeSlot || 'calculating...'}. Gowri Panchangam divides day and night into 8 slots each, named after qualities. Shubha, Labha, Amruta, and Laabha are auspicious.`,
    activities: ['Schedule auspicious events during good periods', 'Avoid important work during Kala/Rogam/Udvega'],
    tableData: table,
  };
}

function calcHoraCalculator(ctx: TodayContext): MuhuratResult {
  const dayHoraDuration = ctx.dayDuration / 12;
  const nightHoraDuration = ctx.nightDuration / 12;
  const dayLord = DAY_LORDS[ctx.dayOfWeek];
  const dayLordHoraIdx = HORA_PLANETS.indexOf(dayLord);
  const table: TableRow[] = [];
  let activeHora = '';

  // Day horas (12)
  for (let i = 0; i < 12; i++) {
    const slotStart = ctx.sunriseMinutes + i * dayHoraDuration;
    const slotEnd = slotStart + dayHoraDuration;
    const planetIdx = (dayLordHoraIdx + i) % 7;
    const planet = HORA_PLANETS[planetIdx];
    const icon = HORA_PLANET_ICONS[planet] || '';
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeHora = planet;

    table.push({
      label: `${icon} ${planet}`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: 'Day',
      isActive,
      isFavourable: ['Jupiter', 'Venus', 'Mercury'].includes(planet),
    });
  }

  // Night horas (12)
  for (let i = 0; i < 12; i++) {
    const slotStart = ctx.sunsetMinutes + i * nightHoraDuration;
    const slotEnd = slotStart + nightHoraDuration;
    const planetIdx = (dayLordHoraIdx + 12 + i) % 7;
    const planet = HORA_PLANETS[planetIdx];
    const icon = HORA_PLANET_ICONS[planet] || '';
    const isActive = ctx.currentMinutes >= slotStart && ctx.currentMinutes < slotEnd;
    if (isActive) activeHora = planet;

    table.push({
      label: `${icon} ${planet}`,
      time: `${minutesToTime(slotStart)} - ${minutesToTime(slotEnd)}`,
      extra: 'Night',
      isActive,
      isFavourable: ['Jupiter', 'Venus', 'Mercury'].includes(planet),
    });
  }

  return {
    status: activeHora ? 'active' : 'upcoming',
    timeWindows: [],
    description: `Current Hora ruler: ${activeHora || 'calculating...'}. Each hour of the day is ruled by a planet in Chaldean order. Jupiter, Venus, and Mercury horas are generally auspicious.`,
    activities: ['Sun Hora: Authority tasks', 'Moon Hora: Travel, emotions', 'Mars Hora: Courage, disputes', 'Mercury Hora: Trade, study', 'Jupiter Hora: Wisdom, finance', 'Venus Hora: Love, arts', 'Saturn Hora: Labor, discipline'],
    tableData: table,
  };
}

function calcPanchak(ctx: TodayContext): MuhuratResult {
  const isActive = ctx.nakshatraIndex >= 22;
  const currentNakshatra = NAKSHATRA_NAMES[ctx.nakshatraIndex];

  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive ? [{ start: 'All Day', end: '' }] : [],
    description: isActive
      ? `Panchak is active! Moon is in ${currentNakshatra} (one of the last 5 nakshatras). Activities related to south direction, wood, fire, and death rites should be avoided.`
      : `Panchak is not active today. Current nakshatra: ${currentNakshatra}. Panchak activates when the Moon transits through Dhanishta, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, or Revati.`,
    activities: isActive
      ? ['Avoid: Travel south', 'Avoid: Buying wood/iron', 'Avoid: Roof construction', 'Avoid: Cremation']
      : ['Normal activities can proceed', 'No Panchak restrictions today'],
    specialNote: isActive ? 'Panchak lasts approximately 5 days during each lunar cycle.' : undefined,
  };
}

function calcBhadra(ctx: TodayContext): MuhuratResult {
  const isActive = ctx.karanaIndex === 6;
  const firstHalf = (ctx.dayOfYear * 2) % 2 === 0;

  return {
    status: isActive ? 'active' : 'not-today',
    timeWindows: isActive
      ? [{ start: firstHalf ? minutesToTime(ctx.sunriseMinutes) : minutesToTime((ctx.sunriseMinutes + ctx.sunsetMinutes) / 2), end: firstHalf ? minutesToTime((ctx.sunriseMinutes + ctx.sunsetMinutes) / 2) : minutesToTime(ctx.sunsetMinutes) }]
      : [],
    description: isActive
      ? 'Bhadra (Vishti Karana) is active today. This is one of the 11 karanas and is considered inauspicious. Avoid starting important activities during this period.'
      : 'Bhadra (Vishti Karana) is not active today. Vishti is one of the 11 karanas and occurs when the Moon is in specific positions relative to the Sun.',
    activities: isActive
      ? ['Avoid: New ventures', 'Avoid: Marriages', 'Avoid: Travel', 'Avoid: Important decisions']
      : ['No Bhadra restrictions today', 'All activities can proceed normally'],
    specialNote: isActive ? 'Bhadra occurs 7 times in a lunar month, lasting approximately half a tithi each time.' : undefined,
  };
}

function calcRahuKaal(ctx: TodayContext): MuhuratResult {
  const [start, end] = RAHU_KAAL[ctx.dayOfWeek];
  const status: MuhuratStatus = ctx.currentMinutes >= start && ctx.currentMinutes < end ? 'active'
    : ctx.currentMinutes < start ? 'upcoming' : 'passed';

  return {
    status,
    timeWindows: [{ start: minutesToTime(start), end: minutesToTime(end) }],
    description: 'Rahu Kaal is a daily inauspicious period lasting approximately 90 minutes. Ruled by the shadow planet Rahu, it is considered unfavorable for starting new activities.',
    activities: ['Avoid: Starting new work', 'Avoid: Important meetings', 'Avoid: Signing documents', 'Avoid: Travel departures'],
    specialNote: 'Ongoing work can continue during Rahu Kaal. Only avoid initiating new activities.',
  };
}

// ---- Master Calculator ----

export function computeAllMuhurats(ctx: TodayContext): Record<MuhuratKey, MuhuratResult> {
  return {
    abhijitMuhurat: calcAbhijitMuhurat(ctx),
    doGhatiMuhurat: calcDoGhatiMuhurat(ctx),
    brahmaMuhurat: calcBrahmaMuhurat(ctx),
    chaughadia: calcChaughadia(ctx),
    guruPushyaYoga: calcGuruPushyaYoga(ctx),
    raviPushyaYoga: calcRaviPushyaYoga(ctx),
    amritSiddhiYoga: calcAmritSiddhiYoga(ctx),
    sarvarthaSiddhiYoga: calcSarvarthaSiddhiYoga(ctx),
    pushyaNakshatra: calcPushyaNakshatra(ctx),
    vehiclePurchase: calcLifeEventMuhurat(ctx, VEHICLE_CRITERIA, 'Vehicle Purchase', ['Buying cars', 'Buying bikes', 'Vehicle registration', 'First ride']),
    propertyPurchase: calcLifeEventMuhurat(ctx, PROPERTY_CRITERIA, 'Property Purchase', ['Buying land', 'Buying house', 'Property registration', 'Real estate deals']),
    namkaran: calcLifeEventMuhurat(ctx, NAMKARAN_CRITERIA, 'Namkaran (Naming Ceremony)', ['Baby naming', 'Naming ceremony', 'Name registration']),
    mundan: calcLifeEventMuhurat(ctx, MUNDAN_CRITERIA, 'Mundan (First Haircut)', ['First haircut ceremony', 'Tonsure ritual', 'Head shaving ceremony']),
    grihaPravesh: calcLifeEventMuhurat(ctx, GRIHA_PRAVESH_CRITERIA, 'Griha Pravesh (Housewarming)', ['Entering new home', 'Housewarming puja', 'New house ceremony']),
    lagnaTable: calcLagnaTable(ctx),
    gowriPanchangam: calcGowriPanchangam(ctx),
    horaCalculator: calcHoraCalculator(ctx),
    panchak: calcPanchak(ctx),
    bhadra: calcBhadra(ctx),
    rahuKaal: calcRahuKaal(ctx),
  };
}
