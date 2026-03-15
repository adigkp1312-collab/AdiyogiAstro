/**
 * Panchang (Hindu Calendar) Calculator
 *
 * Calculates the five key elements of Panchang:
 * 1. Tithi (lunar day)
 * 2. Nakshatra (lunar mansion)
 * 3. Yoga (luni-solar combination)
 * 4. Karana (half of tithi)
 * 5. Vara (weekday)
 *
 * Plus sunrise/sunset approximations and auspicious/inauspicious times.
 */

// ─── Constants ───────────────────────────────────────────────────────

const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
];

const PAKSHA_NAMES = [
  "Shukla", "Shukla", "Shukla", "Shukla", "Shukla",
  "Shukla", "Shukla", "Shukla", "Shukla", "Shukla",
  "Shukla", "Shukla", "Shukla", "Shukla", "Shukla",
  "Krishna", "Krishna", "Krishna", "Krishna", "Krishna",
  "Krishna", "Krishna", "Krishna", "Krishna", "Krishna",
  "Krishna", "Krishna", "Krishna", "Krishna", "Krishna",
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
  "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const YOGAS = [
  "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
  "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda",
  "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
  "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
  "Indra", "Vaidhriti",
];

const KARANAS = [
  "Bava", "Balava", "Kaulava", "Taitila", "Garaja",
  "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna",
];

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const WEEKDAYS_HINDI = [
  "Ravivaar", "Somvaar", "Mangalvaar", "Budhvaar",
  "Guruvaar", "Shukravaar", "Shanivaar",
];

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

// ─── Astronomical Helpers ────────────────────────────────────────────

function toJulianDay(year: number, month: number, day: number, hour: number = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hour / 24 + B - 1524.5;
}

function toRadians(deg: number): number { return (deg * Math.PI) / 180; }
function toDegrees(rad: number): number { return (rad * 180) / Math.PI; }
function normalize(deg: number): number { return ((deg % 360) + 360) % 360; }

/**
 * Approximate Sun longitude for a given Julian Day.
 */
function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = 280.4664567 + 36000.76983 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const C = 1.9146 * Math.sin(toRadians(M)) + 0.02 * Math.sin(toRadians(2 * M));
  return normalize(L0 + C);
}

/**
 * Approximate Moon longitude for a given Julian Day.
 */
function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const L = 218.3165 + 481267.8813 * T;
  const M = 134.963 + 477198.8676 * T;
  const F = 93.272 + 483202.0175 * T;
  const correction =
    6.2888 * Math.sin(toRadians(M)) +
    1.274 * Math.sin(toRadians(2 * (L - sunLongitude(jd)) - M)) +
    0.6583 * Math.sin(toRadians(2 * (L - sunLongitude(jd)))) +
    0.2136 * Math.sin(toRadians(2 * M)) -
    0.1856 * Math.sin(toRadians(357.5291 + 35999.0503 * T)) +
    0.1143 * Math.sin(toRadians(2 * F));
  return normalize(L + correction);
}

// ─── Sunrise / Sunset Approximation ─────────────────────────────────

function calculateSunrise(year: number, month: number, day: number, lat: number, lon: number): { sunrise: string; sunset: string; sunriseHour: number; sunsetHour: number } {
  // Day of year
  const dt = new Date(year, month - 1, day);
  const start = new Date(year, 0, 1);
  const dayOfYear = Math.floor((dt.getTime() - start.getTime()) / 86400000) + 1;

  // Solar calculations (NOAA simplified)
  const zenith = 90.833;
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  // Approximate solar noon in fraction of day (longitude-based)
  const lngHour = lon / 15;

  // Rising time approx
  const tRise = dayOfYear + (6 - lngHour) / 24;
  const tSet = dayOfYear + (18 - lngHour) / 24;

  function calcSunTime(t: number, rising: boolean): number {
    // Sun's mean anomaly
    const M = 0.9856 * t - 3.289;
    // Sun's true longitude
    let L = M + 1.916 * Math.sin(M * D2R) + 0.02 * Math.sin(2 * M * D2R) + 282.634;
    L = ((L % 360) + 360) % 360;
    // Sun's right ascension
    let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
    RA = ((RA % 360) + 360) % 360;
    // Adjust RA to same quadrant as L
    const Lquad = Math.floor(L / 90) * 90;
    const RAquad = Math.floor(RA / 90) * 90;
    RA += Lquad - RAquad;
    RA /= 15; // convert to hours

    // Sun's declination
    const sinDec = 0.39782 * Math.sin(L * D2R);
    const cosDec = Math.cos(Math.asin(sinDec));

    // Hour angle
    const cosH = (Math.cos(zenith * D2R) - sinDec * Math.sin(lat * D2R)) / (cosDec * Math.cos(lat * D2R));
    if (cosH > 1 || cosH < -1) return rising ? 6 : 18; // fallback

    let H = R2D * Math.acos(cosH);
    if (rising) H = 360 - H;
    H /= 15;

    // Local time
    const T = H + RA - 0.06571 * t - 6.622;
    // UTC time
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    // Add IST offset (+5:30)
    let IST = UT + 5.5;
    IST = ((IST % 24) + 24) % 24;
    return IST;
  }

  const sunriseHour = calcSunTime(tRise, true);
  const sunsetHour = calcSunTime(tSet, false);

  function formatHour(h: number): string {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${h12}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  return {
    sunrise: formatHour(sunriseHour),
    sunset: formatHour(sunsetHour),
    sunriseHour,
    sunsetHour,
  };
}

// ─── Rahukaal / Yamaganda / Gulika ──────────────────────────────────

const RAHUKAAL_ORDER = [7, 1, 6, 4, 5, 3, 2]; // Sun=7th, Mon=1st, etc. (period index, 1-based)
const YAMAGANDA_ORDER = [4, 3, 2, 1, 7, 6, 5];
const GULIKA_ORDER = [6, 5, 4, 3, 2, 1, 7];

function getInauspiciousTime(dayOfWeek: number, order: number[], sunriseHour: number, sunsetHour: number): string {
  const dayLength = sunsetHour - sunriseHour;
  const slotDuration = dayLength / 8;
  const slotIndex = order[dayOfWeek] - 1;
  const startHour = sunriseHour + slotIndex * slotDuration;
  const endHour = startHour + slotDuration;

  function formatTime(h: number): string {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${h12.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  return `${formatTime(startHour)} - ${formatTime(endHour)}`;
}

// ─── Abhijit Muhurta ────────────────────────────────────────────────

function getAbhijitMuhurta(sunriseHour: number, sunsetHour: number): string {
  const dayLength = sunsetHour - sunriseHour;
  const muhurtaDuration = dayLength / 15;
  // Abhijit is the 8th muhurta (index 7)
  const start = sunriseHour + 7 * muhurtaDuration;
  const end = start + muhurtaDuration;

  function formatTime(h: number): string {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${h12.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${period}`;
  }

  return `${formatTime(start)} - ${formatTime(end)}`;
}

// ─── Main Panchang Calculator ───────────────────────────────────────

export interface PanchangData {
  date: string;
  day: string;
  dayHindi: string;
  tithi: string;
  tithiNumber: number;
  paksha: string;
  nakshatra: string;
  nakshatraNumber: number;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonSign: string;
  sunSign: string;
  rahukaal: string;
  yamaganda: string;
  gulika: string;
  abhijitMuhurta: string;
}

export function calculatePanchang(date?: Date, latitude: number = 28.6139, longitude: number = 77.2090): PanchangData {
  const d = date || new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dayOfWeek = d.getDay();

  const jd = toJulianDay(year, month, day, 6); // approx sunrise time UT

  // Sun & Moon longitudes
  const sunLon = sunLongitude(jd);
  const moonLon = moonLongitude(jd);

  // Tithi: each tithi = 12° of Moon-Sun elongation
  const elongation = normalize(moonLon - sunLon);
  const tithiIndex = Math.floor(elongation / 12);
  const tithiName = TITHIS[tithiIndex];
  const paksha = PAKSHA_NAMES[tithiIndex];

  // Nakshatra: each nakshatra = 13°20' = 13.3333° of Moon longitude
  const nakshatraIndex = Math.floor(moonLon / (360 / 27));
  const nakshatraName = NAKSHATRAS[nakshatraIndex];

  // Yoga: (Sun lon + Moon lon) / (360/27)
  const yogaAngle = normalize(sunLon + moonLon);
  const yogaIndex = Math.floor(yogaAngle / (360 / 27));
  const yogaName = YOGAS[yogaIndex];

  // Karana: each karana = 6° of elongation (half a tithi)
  const karanaRaw = Math.floor(elongation / 6);
  let karanaName: string;
  if (karanaRaw === 0) {
    karanaName = KARANAS[10]; // Kimstughna (first half of Shukla Pratipada)
  } else if (karanaRaw >= 57) {
    karanaName = KARANAS[7 + (karanaRaw - 57)]; // Shakuni, Chatushpada, Naga
  } else {
    karanaName = KARANAS[(karanaRaw - 1) % 7];
  }

  // Sun sign (sidereal, approx -23° ayanamsa)
  const ayanamsa = 24.1; // Lahiri ayanamsa approximate for 2024-2026
  const siderealSun = normalize(sunLon - ayanamsa);
  const sunSignIndex = Math.floor(siderealSun / 30);
  const sunSign = ZODIAC_SIGNS[sunSignIndex];

  // Moon sign (sidereal)
  const siderealMoon = normalize(moonLon - ayanamsa);
  const moonSignIndex = Math.floor(siderealMoon / 30);
  const moonSign = ZODIAC_SIGNS[moonSignIndex];

  // Sunrise/Sunset (using NOAA algorithm)
  const { sunrise, sunset, sunriseHour, sunsetHour } = calculateSunrise(year, month, day, latitude, longitude);

  // Inauspicious times
  const rahukaal = getInauspiciousTime(dayOfWeek, RAHUKAAL_ORDER, sunriseHour, sunsetHour);
  const yamaganda = getInauspiciousTime(dayOfWeek, YAMAGANDA_ORDER, sunriseHour, sunsetHour);
  const gulika = getInauspiciousTime(dayOfWeek, GULIKA_ORDER, sunriseHour, sunsetHour);
  const abhijitMuhurta = getAbhijitMuhurta(sunriseHour, sunsetHour);

  // Format date
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const formattedDate = `${monthNames[month - 1]} ${day}, ${year}`;

  return {
    date: formattedDate,
    day: WEEKDAYS[dayOfWeek],
    dayHindi: WEEKDAYS_HINDI[dayOfWeek],
    tithi: tithiName,
    tithiNumber: tithiIndex + 1,
    paksha,
    nakshatra: nakshatraName,
    nakshatraNumber: nakshatraIndex + 1,
    yoga: yogaName,
    karana: karanaName,
    sunrise,
    sunset,
    moonSign,
    sunSign,
    rahukaal,
    yamaganda,
    gulika,
    abhijitMuhurta,
  };
}
