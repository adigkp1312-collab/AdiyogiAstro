// ============================================================
// Regional Calendar Data — Month names, festivals, sankranti, navratri
// Used by the Calendar page's regional calendar tiles
// ============================================================

// ---- Types ----
export interface RegionalCalendarInfo {
  months: string[];
  yearCalc: (year: number) => number;
  yearName: string;
}

export interface RegionalFestival {
  name: string;
  nameLocal: string;
  month: number; // 1-12 (Gregorian)
  day: number;
}

export interface SankrantiDate {
  name: string;
  nameHi: string;
  zodiac: string;
  zodiacSymbol: string;
  month: number; // 1-12
  day: number;
}

export interface NavratriDay {
  day: number;
  deity: string;
  deityHi: string;
  color: string;
  colorHex: string;
  meaning: string;
}

// ============================================================
// Regional Month Names & Year Systems
// ============================================================
export const REGIONAL_MONTHS: Record<string, RegionalCalendarInfo> = {
  tamil: {
    months: ['Chithirai', 'Vaikasi', 'Aani', 'Aadi', 'Avani', 'Purattasi', 'Aippasi', 'Karthigai', 'Margazhi', 'Thai', 'Maasi', 'Panguni'],
    yearCalc: (y) => y + 31,
    yearName: 'Thiruvalluvar',
  },
  bengali: {
    months: ['Boishakh', 'Jyoishtho', 'Asharh', 'Shrabon', 'Bhadro', 'Ashshin', 'Kartik', 'Ogrohayon', 'Poush', 'Magh', 'Phalgun', 'Choitro'],
    yearCalc: (y) => y - 593,
    yearName: 'Bangabda',
  },
  telugu: {
    months: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwayuja', 'Kartika', 'Margashira', 'Pushya', 'Magha', 'Phalguna'],
    yearCalc: (y) => y + 57,
    yearName: 'Shalivahana Shaka',
  },
  gujarati: {
    months: ['Kartik', 'Magshar', 'Posh', 'Maha', 'Fagan', 'Chaitra', 'Vaishakh', 'Jeth', 'Ashadh', 'Shravan', 'Bhadarvo', 'Aso'],
    yearCalc: (y) => y + 57,
    yearName: 'Vikram Samvat',
  },
  kannada: {
    months: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwija', 'Kartika', 'Margashira', 'Pushya', 'Magha', 'Phalguna'],
    yearCalc: (y) => y + 78,
    yearName: 'Shalivahana Shaka',
  },
  malayalam: {
    months: ['Chingam', 'Kanni', 'Thulam', 'Vrischikam', 'Dhanu', 'Makaram', 'Kumbham', 'Meenam', 'Medam', 'Edavam', 'Mithunam', 'Karkidakam'],
    yearCalc: (y) => y - 825,
    yearName: 'Kollavarsham',
  },
};

// Approximate mapping: Gregorian month (0-11) → regional month index (0-11)
// Regional calendars start mid-month, this is an approximation
const GREG_TO_REGIONAL_OFFSET: Record<string, number> = {
  tamil: 9,     // Tamil year starts mid-April (Chithirai), so Jan ≈ Thai (index 9)
  bengali: 9,   // Bengali year starts mid-April (Boishakh), so Jan ≈ Poush (index 8→9 approx)
  telugu: 10,   // Telugu year starts in Chaitra (Mar/Apr), so Jan ≈ Pushya (index 9→10)
  gujarati: 3,  // Gujarati year starts post-Diwali (Kartik ≈ Oct/Nov), so Jan ≈ Maha (index 3)
  kannada: 10,  // Same as Telugu (Shalivahana Shaka)
  malayalam: 5, // Malayalam year starts mid-Aug (Chingam), so Jan ≈ Makaram (index 5)
};

export function getRegionalMonthForDate(region: string, gregMonth: number): string {
  const info = REGIONAL_MONTHS[region];
  if (!info) return '';
  const offset = GREG_TO_REGIONAL_OFFSET[region] || 0;
  const idx = (gregMonth + offset) % 12;
  return info.months[idx];
}

export function getRegionalYear(region: string, gregYear: number): number {
  const info = REGIONAL_MONTHS[region];
  if (!info) return gregYear;
  return info.yearCalc(gregYear);
}

export function getRegionalYearName(region: string): string {
  return REGIONAL_MONTHS[region]?.yearName || '';
}

// ============================================================
// Regional Festivals (key festivals per region)
// ============================================================
export const REGIONAL_FESTIVALS: Record<string, RegionalFestival[]> = {
  tamil: [
    { name: 'Pongal / Thai Pongal', nameLocal: 'பொங்கல்', month: 1, day: 14 },
    { name: 'Mattu Pongal', nameLocal: 'மாட்டுப் பொங்கல்', month: 1, day: 15 },
    { name: 'Thaipusam', nameLocal: 'தைப்பூசம்', month: 1, day: 25 },
    { name: 'Tamil New Year', nameLocal: 'தமிழ்ப் புத்தாண்டு', month: 4, day: 14 },
    { name: 'Chithirai Thiruvizha', nameLocal: 'சித்திரை திருவிழா', month: 4, day: 14 },
    { name: 'Aadi Perukku', nameLocal: 'ஆடிப்பெருக்கு', month: 7, day: 18 },
    { name: 'Vinayaka Chaturthi', nameLocal: 'விநாயக சதுர்த்தி', month: 9, day: 14 },
    { name: 'Navaratri', nameLocal: 'நவராத்திரி', month: 10, day: 11 },
    { name: 'Deepavali', nameLocal: 'தீபாவளி', month: 11, day: 8 },
    { name: 'Karthigai Deepam', nameLocal: 'கார்த்திகை தீபம்', month: 12, day: 10 },
  ],
  bengali: [
    { name: 'Saraswati Puja', nameLocal: 'সরস্বতী পূজা', month: 1, day: 23 },
    { name: 'Poila Boishakh', nameLocal: 'পয়লা বৈশাখ', month: 4, day: 14 },
    { name: 'Rabindra Jayanti', nameLocal: 'রবীন্দ্র জয়ন্তী', month: 5, day: 7 },
    { name: 'Rath Yatra', nameLocal: 'রথযাত্রা', month: 7, day: 16 },
    { name: 'Janmashtami', nameLocal: 'জন্মাষ্টমী', month: 9, day: 4 },
    { name: 'Durga Puja (Shashti)', nameLocal: 'দুর্গা পূজা', month: 10, day: 15 },
    { name: 'Durga Puja (Dashami)', nameLocal: 'বিজয়া দশমী', month: 10, day: 20 },
    { name: 'Lakshmi Puja', nameLocal: 'লক্ষ্মী পূজা', month: 10, day: 29 },
    { name: 'Kali Puja / Diwali', nameLocal: 'কালী পূজা', month: 11, day: 8 },
    { name: 'Bhai Phonta', nameLocal: 'ভাইফোঁটা', month: 11, day: 10 },
  ],
  telugu: [
    { name: 'Bhogi', nameLocal: 'భోగి', month: 1, day: 13 },
    { name: 'Sankranti', nameLocal: 'సంక్రాంతి', month: 1, day: 14 },
    { name: 'Maha Shivaratri', nameLocal: 'మహా శివరాత్రి', month: 2, day: 15 },
    { name: 'Ugadi', nameLocal: 'ఉగాది', month: 3, day: 19 },
    { name: 'Sri Rama Navami', nameLocal: 'శ్రీ రామ నవమి', month: 3, day: 26 },
    { name: 'Vinayaka Chavithi', nameLocal: 'వినాయక చవితి', month: 9, day: 14 },
    { name: 'Bathukamma', nameLocal: 'బతుకమ్మ', month: 10, day: 11 },
    { name: 'Dussehra', nameLocal: 'దసరా', month: 10, day: 20 },
    { name: 'Deepavali', nameLocal: 'దీపావళి', month: 11, day: 8 },
    { name: 'Kartika Purnima', nameLocal: 'కార్తీక పౌర్ణమి', month: 11, day: 24 },
  ],
  gujarati: [
    { name: 'Uttarayan / Makar Sankranti', nameLocal: 'ઉત્તરાયણ', month: 1, day: 14 },
    { name: 'Maha Shivaratri', nameLocal: 'મહા શિવરાત્રી', month: 2, day: 15 },
    { name: 'Holi', nameLocal: 'હોળી', month: 3, day: 4 },
    { name: 'Gudi Padwa', nameLocal: 'ગુડી પાડવો', month: 3, day: 19 },
    { name: 'Rath Yatra', nameLocal: 'રથયાત્રા', month: 7, day: 16 },
    { name: 'Raksha Bandhan', nameLocal: 'રક્ષાબંધન', month: 8, day: 28 },
    { name: 'Janmashtami', nameLocal: 'જન્માષ્ટમી', month: 9, day: 4 },
    { name: 'Navratri (Garba)', nameLocal: 'નવરાત્રી', month: 10, day: 11 },
    { name: 'Diwali / Bestu Varas', nameLocal: 'દિવાળી / બેસ્તુ વરસ', month: 11, day: 8 },
    { name: 'Gujarati New Year', nameLocal: 'ગુજરાતી નવું વર્ષ', month: 11, day: 9 },
  ],
  kannada: [
    { name: 'Sankranti', nameLocal: 'ಸಂಕ್ರಾಂತಿ', month: 1, day: 14 },
    { name: 'Maha Shivaratri', nameLocal: 'ಮಹಾ ಶಿವರಾತ್ರಿ', month: 2, day: 15 },
    { name: 'Ugadi', nameLocal: 'ಯುಗಾದಿ', month: 3, day: 19 },
    { name: 'Ram Navami', nameLocal: 'ಶ್ರೀ ರಾಮ ನವಮಿ', month: 3, day: 26 },
    { name: 'Varamahalakshmi', nameLocal: 'ವರಮಹಾಲಕ್ಷ್ಮಿ', month: 8, day: 22 },
    { name: 'Ganesh Chaturthi', nameLocal: 'ಗಣೇಶ ಚತುರ್ಥಿ', month: 9, day: 14 },
    { name: 'Dasara', nameLocal: 'ದಸರಾ', month: 10, day: 20 },
    { name: 'Deepavali', nameLocal: 'ದೀಪಾವಳಿ', month: 11, day: 8 },
    { name: 'Rajyotsava', nameLocal: 'ರಾಜ್ಯೋತ್ಸವ', month: 11, day: 1 },
    { name: 'Hampi Utsav', nameLocal: 'ಹಂಪಿ ಉತ್ಸವ', month: 11, day: 3 },
  ],
  malayalam: [
    { name: 'Vishu', nameLocal: 'വിഷു', month: 4, day: 14 },
    { name: 'Thrissur Pooram', nameLocal: 'തൃശ്ശൂർ പൂരം', month: 5, day: 12 },
    { name: 'Onam (Thiruvonam)', nameLocal: 'ഓണം', month: 8, day: 25 },
    { name: 'First Onam (Uthradam)', nameLocal: 'ഉത്രാടം', month: 8, day: 24 },
    { name: 'Navaratri', nameLocal: 'നവരാത്രി', month: 10, day: 11 },
    { name: 'Dussehra / Vidyarambham', nameLocal: 'വിജയദശമി', month: 10, day: 20 },
    { name: 'Deepavali', nameLocal: 'ദീപാവലി', month: 11, day: 8 },
    { name: 'Mandala Pooja', nameLocal: 'മണ്ഡല പൂജ', month: 12, day: 26 },
    { name: 'Makaravilakku', nameLocal: 'മകരവിളക്ക്', month: 1, day: 14 },
    { name: 'Attukal Pongala', nameLocal: 'ആറ്റുകാൽ പൊങ്കാല', month: 3, day: 7 },
  ],
};

// ============================================================
// Sankranti (Solar Transit) Dates
// Approximate dates — same every year with ±1 day variation
// ============================================================
const SANKRANTI_DEFAULT: SankrantiDate[] = [
  { name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', zodiac: 'Capricorn', zodiacSymbol: '♑', month: 1, day: 14 },
  { name: 'Kumbha Sankranti', nameHi: 'कुंभ संक्रांति', zodiac: 'Aquarius', zodiacSymbol: '♒', month: 2, day: 13 },
  { name: 'Meena Sankranti', nameHi: 'मीन संक्रांति', zodiac: 'Pisces', zodiacSymbol: '♓', month: 3, day: 14 },
  { name: 'Mesha Sankranti', nameHi: 'मेष संक्रांति', zodiac: 'Aries', zodiacSymbol: '♈', month: 4, day: 14 },
  { name: 'Vrishabha Sankranti', nameHi: 'वृषभ संक्रांति', zodiac: 'Taurus', zodiacSymbol: '♉', month: 5, day: 15 },
  { name: 'Mithuna Sankranti', nameHi: 'मिथुन संक्रांति', zodiac: 'Gemini', zodiacSymbol: '♊', month: 6, day: 15 },
  { name: 'Karka Sankranti', nameHi: 'कर्क संक्रांति', zodiac: 'Cancer', zodiacSymbol: '♋', month: 7, day: 16 },
  { name: 'Simha Sankranti', nameHi: 'सिंह संक्रांति', zodiac: 'Leo', zodiacSymbol: '♌', month: 8, day: 17 },
  { name: 'Kanya Sankranti', nameHi: 'कन्या संक्रांति', zodiac: 'Virgo', zodiacSymbol: '♍', month: 9, day: 17 },
  { name: 'Tula Sankranti', nameHi: 'तुला संक्रांति', zodiac: 'Libra', zodiacSymbol: '♎', month: 10, day: 17 },
  { name: 'Vrischika Sankranti', nameHi: 'वृश्चिक संक्रांति', zodiac: 'Scorpio', zodiacSymbol: '♏', month: 11, day: 16 },
  { name: 'Dhanu Sankranti', nameHi: 'धनु संक्रांति', zodiac: 'Sagittarius', zodiacSymbol: '♐', month: 12, day: 16 },
];

export function getSankrantiDates(): SankrantiDate[] {
  // Solar transits are approximately fixed — ±1 day variation
  return SANKRANTI_DEFAULT;
}

// ============================================================
// Navratri 9-Day Schedule
// ============================================================
export const NAVRATRI_SCHEDULE: NavratriDay[] = [
  { day: 1, deity: 'Shailaputri', deityHi: 'शैलपुत्री', color: 'Orange', colorHex: '#F97316', meaning: 'Daughter of the Mountain — devotion & courage' },
  { day: 2, deity: 'Brahmacharini', deityHi: 'ब्रह्मचारिणी', color: 'White', colorHex: '#F8FAFC', meaning: 'One who practices penance — knowledge & wisdom' },
  { day: 3, deity: 'Chandraghanta', deityHi: 'चंद्रघंटा', color: 'Red', colorHex: '#EF4444', meaning: 'Moon-bell adorned — bravery & grace' },
  { day: 4, deity: 'Kushmanda', deityHi: 'कुष्मांडा', color: 'Royal Blue', colorHex: '#3B82F6', meaning: 'Creator of the universe — energy & light' },
  { day: 5, deity: 'Skandamata', deityHi: 'स्कंदमाता', color: 'Yellow', colorHex: '#EAB308', meaning: 'Mother of Skanda — motherly love' },
  { day: 6, deity: 'Katyayani', deityHi: 'कात्यायनी', color: 'Green', colorHex: '#22C55E', meaning: 'Born to sage Katyayan — warrior spirit' },
  { day: 7, deity: 'Kalaratri', deityHi: 'कालरात्रि', color: 'Grey', colorHex: '#9CA3AF', meaning: 'Destroyer of darkness — fearlessness' },
  { day: 8, deity: 'Mahagauri', deityHi: 'महागौरी', color: 'Purple', colorHex: '#A855F7', meaning: 'Great radiance — purity & peace' },
  { day: 9, deity: 'Siddhidatri', deityHi: 'सिद्धिदात्री', color: 'Peacock Green', colorHex: '#14B8A6', meaning: 'Bestower of perfections — fulfillment' },
];

// Navratri start dates (Chaitra & Sharad) for specific years
const NAVRATRI_STARTS: Record<number, { chaitra: { month: number; day: number }; sharad: { month: number; day: number } }> = {
  2025: { chaitra: { month: 3, day: 30 }, sharad: { month: 10, day: 2 } },
  2026: { chaitra: { month: 3, day: 19 }, sharad: { month: 10, day: 11 } },
};

export function getNavratriStartDates(year: number): { chaitra: { month: number; day: number }; sharad: { month: number; day: number } } {
  if (NAVRATRI_STARTS[year]) return NAVRATRI_STARTS[year];
  // Fallback approximate dates
  return { chaitra: { month: 3, day: 22 }, sharad: { month: 10, day: 7 } };
}

// ============================================================
// Hindu Calendar Panchang — month mapping
// ============================================================
const HINDU_MONTH_NAMES = [
  'Pausha', 'Magha', 'Phalguna', 'Chaitra', 'Vaishakha', 'Jyeshtha',
  'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha',
];

export function getHinduMonth(gregMonth: number): string {
  return HINDU_MONTH_NAMES[gregMonth] || '';
}

// ============================================================
// Gregorian month names (short) for display
// ============================================================
export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const MONTH_NAMES_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
