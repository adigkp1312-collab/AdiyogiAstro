// ============================================================
// Calendar Utilities — Hindu calendar, festivals, panchang per day
// Year-aware festival database with correct lunar dates
// ============================================================

export interface Festival {
  name: string;
  nameHi: string;
  type: 'major' | 'regional' | 'fast' | 'government';
  color: string; // tailwind color class
}

export interface DayPanchang {
  tithi: string;
  paksha: 'Shukla' | 'Krishna';
  nakshatra: string;
  yoga: string;
  festivals: Festival[];
  isAuspicious: boolean;
  moonPhase: 'new' | 'waxing' | 'full' | 'waning';
}

export interface MonthData {
  year: number;
  month: number; // 0-11
  hinduMonth: string;
  hinduMonthHi: string;
  days: (DayPanchang | null)[]; // null for padding, indexed 0-41 (6 weeks)
  startDay: number; // 0=Sun
  totalDays: number;
  festivals: { date: number; festival: Festival }[];
}

// ---- Constants ----

const TITHIS = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya',
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Moola', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];

const YOGAS = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti',
];

const HINDU_MONTHS = [
  { en: 'Chaitra', hi: 'चैत्र' },
  { en: 'Vaishakha', hi: 'वैशाख' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठ' },
  { en: 'Ashadha', hi: 'आषाढ़' },
  { en: 'Shravana', hi: 'श्रावण' },
  { en: 'Bhadrapada', hi: 'भाद्रपद' },
  { en: 'Ashwin', hi: 'अश्विन' },
  { en: 'Kartik', hi: 'कार्तिक' },
  { en: 'Margashirsha', hi: 'मार्गशीर्ष' },
  { en: 'Pausha', hi: 'पौष' },
  { en: 'Magha', hi: 'माघ' },
  { en: 'Phalguna', hi: 'फाल्गुन' },
];

// ---- Festival Helpers ----
function f(name: string, nameHi: string, type: Festival['type'], color: string): Festival {
  return { name, nameHi, type, color };
}

// ============================================================
// FIXED FESTIVALS — Same date every year (solar / government)
// Key: "M-D" (month 1-12, day)
// ============================================================
const FIXED_FESTIVALS: Record<string, Festival[]> = {
  '1-1':  [f('New Year', 'नव वर्ष', 'government', 'text-blue-400')],
  '1-14': [f('Makar Sankranti', 'मकर संक्रांति', 'major', 'text-amber-400'),
           f('Pongal', 'पोंगल', 'regional', 'text-orange-400')],
  '1-26': [f('Republic Day', 'गणतंत्र दिवस', 'government', 'text-blue-400')],
  '4-14': [f('Ambedkar Jayanti', 'अम्बेडकर जयंती', 'government', 'text-blue-400')],
  '5-1':  [f('May Day', 'मई दिवस', 'government', 'text-blue-400')],
  '6-21': [f('Yoga Day', 'योग दिवस', 'government', 'text-blue-400')],
  '8-15': [f('Independence Day', 'स्वतंत्रता दिवस', 'government', 'text-blue-400')],
  '10-2': [f('Gandhi Jayanti', 'गांधी जयंती', 'government', 'text-blue-400')],
  '12-25': [f('Christmas', 'क्रिसमस', 'major', 'text-red-400')],
};

// ============================================================
// LUNAR FESTIVALS — Year-specific dates (change every year)
// Key: year → { "M-D": Festival[] }
// ============================================================
const YEARLY_FESTIVALS: Record<number, Record<string, Festival[]>> = {
  2025: {
    '1-13': [f('Lohri', 'लोहड़ी', 'regional', 'text-orange-400')],
    '2-2':  [f('Basant Panchami', 'बसंत पंचमी', 'major', 'text-yellow-400')],
    '2-26': [f('Maha Shivaratri', 'महा शिवरात्रि', 'major', 'text-amber-400')],
    '3-13': [f('Holika Dahan', 'होलिका दहन', 'major', 'text-amber-400')],
    '3-14': [f('Holi', 'होली', 'major', 'text-pink-400')],
    '3-30': [f('Ugadi / Gudi Padwa', 'उगादि / गुड़ी पड़वा', 'major', 'text-amber-400'),
             f('Chaitra Navratri Begins', 'चैत्र नवरात्रि', 'major', 'text-amber-400')],
    '4-6':  [f('Ram Navami', 'राम नवमी', 'major', 'text-amber-400')],
    '4-13': [f('Baisakhi', 'बैसाखी', 'regional', 'text-orange-400')],
    '4-15': [f('Hanuman Jayanti', 'हनुमान जयंती', 'major', 'text-orange-400')],
    '4-18': [f('Good Friday', 'गुड फ्राइडे', 'government', 'text-blue-400')],
    '4-30': [f('Akshaya Tritiya', 'अक्षय तृतीया', 'major', 'text-yellow-400')],
    '5-12': [f('Buddha Purnima', 'बुद्ध पूर्णिमा', 'major', 'text-amber-400')],
    '6-10': [f('Nirjala Ekadashi', 'निर्जला एकादशी', 'fast', 'text-cyan-400')],
    '6-27': [f('Jagannath Rath Yatra', 'जगन्नाथ रथ यात्रा', 'major', 'text-amber-400')],
    '7-10': [f('Guru Purnima', 'गुरु पूर्णिमा', 'major', 'text-amber-400')],
    '7-29': [f('Nag Panchami', 'नाग पंचमी', 'major', 'text-amber-400')],
    '8-9':  [f('Raksha Bandhan', 'रक्षा बंधन', 'major', 'text-pink-400')],
    '8-16': [f('Janmashtami', 'जन्माष्टमी', 'major', 'text-amber-400')],
    '8-27': [f('Ganesh Chaturthi', 'गणेश चतुर्थी', 'major', 'text-amber-400')],
    '9-6':  [f('Anant Chaturdashi', 'अनंत चतुर्दशी', 'major', 'text-amber-400')],
    '9-17': [f('Pitru Paksha Begins', 'पितृ पक्ष', 'fast', 'text-cyan-400')],
    '10-2': [f('Sharad Navratri Begins', 'शरद नवरात्रि', 'major', 'text-amber-400')],
    '10-11': [f('Dussehra', 'दशहरा', 'major', 'text-amber-400')],
    '10-18': [f('Dhanteras', 'धनतेरस', 'major', 'text-yellow-400')],
    '10-20': [f('Diwali', 'दिवाली', 'major', 'text-yellow-400')],
    '10-21': [f('Karwa Chauth', 'करवा चौथ', 'fast', 'text-pink-400'),
              f('Govardhan Puja', 'गोवर्धन पूजा', 'major', 'text-amber-400')],
    '10-23': [f('Bhai Dooj', 'भाई दूज', 'major', 'text-pink-400')],
    '10-26': [f('Chhath Puja', 'छठ पूजा', 'major', 'text-orange-400')],
    '11-5':  [f('Dev Diwali', 'देव दीपावली', 'major', 'text-amber-400')],
  },

  2026: {
    // January
    '1-13': [f('Lohri', 'लोहड़ी', 'regional', 'text-orange-400')],
    '1-23': [f('Basant Panchami', 'बसंत पंचमी', 'major', 'text-yellow-400')],
    // February
    '2-15': [f('Maha Shivaratri', 'महा शिवरात्रि', 'major', 'text-amber-400')],
    // March
    '3-3':  [f('Holika Dahan', 'होलिका दहन', 'major', 'text-amber-400')],
    '3-4':  [f('Holi', 'होली', 'major', 'text-pink-400')],
    '3-19': [f('Ugadi / Gudi Padwa', 'उगादि / गुड़ी पड़वा', 'major', 'text-amber-400'),
             f('Chaitra Navratri Begins', 'चैत्र नवरात्रि', 'major', 'text-amber-400')],
    '3-26': [f('Ram Navami', 'राम नवमी', 'major', 'text-amber-400')],
    // April
    '4-2':  [f('Hanuman Jayanti', 'हनुमान जयंती', 'major', 'text-orange-400')],
    '4-3':  [f('Good Friday', 'गुड फ्राइडे', 'government', 'text-blue-400')],
    '4-14': [f('Baisakhi', 'बैसाखी', 'regional', 'text-orange-400')],
    '4-19': [f('Akshaya Tritiya', 'अक्षय तृतीया', 'major', 'text-yellow-400')],
    // May
    '5-1':  [f('Buddha Purnima', 'बुद्ध पूर्णिमा', 'major', 'text-amber-400')],
    // June
    '6-25': [f('Nirjala Ekadashi', 'निर्जला एकादशी', 'fast', 'text-cyan-400')],
    // July
    '7-16': [f('Jagannath Rath Yatra', 'जगन्नाथ रथ यात्रा', 'major', 'text-amber-400')],
    '7-29': [f('Guru Purnima', 'गुरु पूर्णिमा', 'major', 'text-amber-400')],
    // August
    '8-17': [f('Nag Panchami', 'नाग पंचमी', 'major', 'text-amber-400')],
    '8-28': [f('Raksha Bandhan', 'रक्षा बंधन', 'major', 'text-pink-400')],
    // September
    '9-4':  [f('Janmashtami', 'जन्माष्टमी', 'major', 'text-amber-400')],
    '9-14': [f('Ganesh Chaturthi', 'गणेश चतुर्थी', 'major', 'text-amber-400')],
    '9-25': [f('Anant Chaturdashi', 'अनंत चतुर्दशी', 'major', 'text-amber-400')],
    '9-27': [f('Pitru Paksha Begins', 'पितृ पक्ष', 'fast', 'text-cyan-400')],
    // October
    '10-11': [f('Sharad Navratri Begins', 'शरद नवरात्रि', 'major', 'text-amber-400')],
    '10-20': [f('Dussehra', 'दशहरा', 'major', 'text-amber-400')],
    '10-29': [f('Karwa Chauth', 'करवा चौथ', 'fast', 'text-pink-400')],
    // November
    '11-6':  [f('Dhanteras', 'धनतेरस', 'major', 'text-yellow-400')],
    '11-8':  [f('Diwali', 'दिवाली', 'major', 'text-yellow-400')],
    '11-9':  [f('Govardhan Puja', 'गोवर्धन पूजा', 'major', 'text-amber-400')],
    '11-10': [f('Bhai Dooj', 'भाई दूज', 'major', 'text-pink-400')],
    '11-15': [f('Chhath Puja', 'छठ पूजा', 'major', 'text-orange-400')],
    '11-24': [f('Dev Diwali', 'देव दीपावली', 'major', 'text-amber-400')],
  },
};

// ============================================================
// Get festivals for a specific date, combining fixed + yearly
// ============================================================
function getFestivalsForDate(year: number, month1: number, day: number): Festival[] {
  const key = `${month1}-${day}`;
  const festivals: Festival[] = [];

  // Fixed festivals (same every year)
  if (FIXED_FESTIVALS[key]) {
    festivals.push(...FIXED_FESTIVALS[key]);
  }

  // Year-specific lunar festivals
  const yearData = YEARLY_FESTIVALS[year];
  if (yearData && yearData[key]) {
    festivals.push(...yearData[key]);
  }

  return festivals;
}

// Ekadashi dates — approximate, recurring every ~15 days
function getEkadashiInfo(dayOfMonth: number): Festival | null {
  // Approximate ekadashi occurrences (11th and 26th of each month roughly)
  if (dayOfMonth === 11 || dayOfMonth === 26) {
    const name = dayOfMonth === 11 ? 'Shukla Ekadashi' : 'Krishna Ekadashi';
    return { name, nameHi: dayOfMonth === 11 ? 'शुक्ल एकादशी' : 'कृष्ण एकादशी', type: 'fast', color: 'text-cyan-400' };
  }
  return null;
}

// Purnima / Amavasya
function getMoonEvent(dayOfMonth: number): Festival | null {
  if (dayOfMonth === 15) {
    return { name: 'Purnima', nameHi: 'पूर्णिमा', type: 'fast', color: 'text-indigo-400' };
  }
  if (dayOfMonth === 30 || dayOfMonth === 29) {
    return { name: 'Amavasya', nameHi: 'अमावस्या', type: 'fast', color: 'text-gray-400' };
  }
  return null;
}

// ---- Calendar Calculation ----

export function getMonthData(year: number, month: number): MonthData {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0=Sun
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Hindu month approximation (shifted by ~1 month)
  const hinduMonthIndex = (month + 11) % 12;
  const hinduMonth = HINDU_MONTHS[hinduMonthIndex];

  const days: (DayPanchang | null)[] = [];
  const monthFestivals: { date: number; festival: Festival }[] = [];

  // Pad start
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Check if this year has lunar festival data
  const hasYearData = !!YEARLY_FESTIVALS[year];

  // Each day
  for (let d = 1; d <= totalDays; d++) {
    const dayOfYear = Math.floor((new Date(year, month, d).getTime() - new Date(year, 0, 0).getTime()) / 86400000);

    const tithiIndex = dayOfYear % 30;
    const tithiName = TITHIS[tithiIndex % 15];
    const paksha: 'Shukla' | 'Krishna' = tithiIndex < 15 ? 'Shukla' : 'Krishna';
    const nakshatraIndex = dayOfYear % 27;
    const yogaIndex = (dayOfYear + 5) % 27;

    // Moon phase
    let moonPhase: 'new' | 'waxing' | 'full' | 'waning';
    if (tithiIndex === 14) moonPhase = 'full';
    else if (tithiIndex === 29) moonPhase = 'new';
    else if (tithiIndex < 14) moonPhase = 'waxing';
    else moonPhase = 'waning';

    // Collect festivals from combined fixed + yearly DB
    const festivals: Festival[] = getFestivalsForDate(year, month + 1, d);

    // Only add approximate ekadashi/purnima/amavasya if no year-specific data
    if (!hasYearData) {
      const ekadashi = getEkadashiInfo(d);
      if (ekadashi) festivals.push(ekadashi);
      const moonEvent = getMoonEvent(d);
      if (moonEvent) festivals.push(moonEvent);
    }

    // Track month festivals
    festivals.forEach(fest => monthFestivals.push({ date: d, festival: fest }));

    // Auspiciousness — shukla paksha dates 2,3,5,7,10,11,12,13 are generally favorable
    const favorableTithis = [1, 2, 4, 6, 9, 10, 11, 12];
    const isAuspicious = favorableTithis.includes(tithiIndex % 15);

    days.push({
      tithi: `${paksha} ${tithiName}`,
      paksha,
      nakshatra: NAKSHATRAS[nakshatraIndex],
      yoga: YOGAS[yogaIndex],
      festivals,
      isAuspicious,
      moonPhase,
    });
  }

  // Pad end to fill to multiple of 7
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return {
    year,
    month,
    hinduMonth: hinduMonth.en,
    hinduMonthHi: hinduMonth.hi,
    days,
    startDay,
    totalDays,
    festivals: monthFestivals,
  };
}

// Regional calendar types (for the AstroSage-style grid)
export interface CalendarType {
  key: string;
  name: string;
  nameHi: string;
  icon: string;
  gradient: string;
  description: string;
}

export const REGIONAL_CALENDARS: CalendarType[] = [
  { key: 'hindu', name: 'Hindu Calendar', nameHi: 'हिंदू पंचांग', icon: '🕉️', gradient: 'from-orange-600 to-amber-500', description: 'Vikram Samvat with tithis & festivals' },
  { key: 'monthly', name: 'Monthly Calendar', nameHi: 'मासिक कैलेंडर', icon: '📅', gradient: 'from-amber-500 to-yellow-500', description: 'Month-wise view with panchang' },
  { key: 'festival', name: 'Festival Calendar', nameHi: 'त्योहार कैलेंडर', icon: '🎊', gradient: 'from-pink-600 to-rose-500', description: 'All major Hindu festivals' },
  { key: 'fast', name: 'Vrat Calendar', nameHi: 'व्रत कैलेंडर', icon: '🙏', gradient: 'from-cyan-600 to-teal-500', description: 'Ekadashi, Pradosh, Purnima fasts' },
  { key: 'tamil', name: 'Tamil Calendar', nameHi: 'तमिल कैलेंडर', icon: '🏛️', gradient: 'from-red-600 to-orange-500', description: 'Tamil Panchangam & festivals' },
  { key: 'bengali', name: 'Bengali Calendar', nameHi: 'बंगाली कैलेंडर', icon: '🪷', gradient: 'from-yellow-600 to-amber-500', description: 'Bangla calendar with festivals' },
  { key: 'telugu', name: 'Telugu Calendar', nameHi: 'तेलुगु कैलेंडर', icon: '🌺', gradient: 'from-amber-600 to-orange-500', description: 'Telugu Panchangam & events' },
  { key: 'gujarati', name: 'Gujarati Calendar', nameHi: 'गुजराती कैलेंडर', icon: '🪔', gradient: 'from-orange-500 to-red-500', description: 'Gujarati Vikram Samvat' },
  { key: 'kannada', name: 'Kannada Calendar', nameHi: 'कन्नड कैलेंडर', icon: '🌼', gradient: 'from-yellow-500 to-orange-500', description: 'Kannada Panchangam & festivals' },
  { key: 'malayalam', name: 'Malayalam Calendar', nameHi: 'मलयालम कैलेंडर', icon: '🥥', gradient: 'from-green-600 to-emerald-500', description: 'Kollavarsham calendar' },
  { key: 'sankranti', name: 'Sankranti Dates', nameHi: 'संक्रांति तिथि', icon: '☀️', gradient: 'from-amber-500 to-yellow-600', description: 'Solar transit dates' },
  { key: 'navratri', name: 'Navratri Calendar', nameHi: 'नवरात्रि कैलेंडर', icon: '🔱', gradient: 'from-red-500 to-pink-500', description: 'Chaitra & Sharad Navratri' },
];
