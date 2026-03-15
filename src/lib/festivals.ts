/**
 * Indian Festival Calendar Calculator (2026–2099)
 *
 * Fixed-date festivals use the Gregorian calendar.
 * Lunar festivals are computed from an accurate new-moon algorithm
 * (Jean Meeus, simplified) and mapped to the Hindu lunar calendar.
 */

// ---------------------------------------------------------------------------
// Moon-phase calculator (Meeus, simplified)
// ---------------------------------------------------------------------------

/** Julian Day of J2000.0 new-moon epoch */
const EPOCH_JD = 2451550.09766;
const SYNODIC = 29.530588861;

/** Convert a JS Date to Julian Day Number */
function dateToJD(d: Date): number {
  return d.getTime() / 86400000 + 2440587.5;
}

/** Convert Julian Day Number to JS Date (UTC) */
function jdToDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

/** Approximate Julian Day of lunation k (k=0 → Jan 6 2000 new moon) */
function newMoonJD(k: number): number {
  const T = k / 1236.85;
  return (
    EPOCH_JD +
    SYNODIC * k +
    0.00015437 * T * T -
    0.00000015 * T * T * T +
    0.00000000073 * T * T * T * T
  );
}

/** Return the lunation number closest to a given JD */
function lunationFor(jd: number): number {
  return Math.round((jd - EPOCH_JD) / SYNODIC);
}

/** Get the new-moon Date closest to (or just before) a reference Date */
function newMoonNear(ref: Date): Date {
  const k = lunationFor(dateToJD(ref));
  return jdToDate(newMoonJD(k));
}

/** Get all new-moon Dates in a given year */
function newMoonsInYear(year: number): Date[] {
  const moons: Date[] = [];
  const startK = lunationFor(dateToJD(new Date(Date.UTC(year, 0, 1))));
  for (let k = startK - 1; k < startK + 14; k++) {
    const d = jdToDate(newMoonJD(k));
    if (d.getUTCFullYear() === year) moons.push(d);
  }
  return moons;
}

/** Full moon ≈ new moon + half synodic period */
function fullMoonAfter(newMoon: Date): Date {
  return new Date(newMoon.getTime() + (SYNODIC / 2) * 86400000);
}

/** Add days to a Date */
function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86400000);
}

/** Format Date as YYYY-MM-DD */
function fmt(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ---------------------------------------------------------------------------
// Hindu month mapping
// ---------------------------------------------------------------------------

const HINDU_MONTHS = [
  "Chaitra",      // 0  Mar/Apr
  "Vaishakha",    // 1  Apr/May
  "Jyeshtha",     // 2  May/Jun
  "Ashadha",      // 3  Jun/Jul
  "Shravana",     // 4  Jul/Aug
  "Bhadrapada",   // 5  Aug/Sep
  "Ashwin",       // 6  Sep/Oct
  "Kartik",       // 7  Oct/Nov
  "Margashirsha", // 8  Nov/Dec
  "Pausha",       // 9  Dec/Jan
  "Magha",        // 10 Jan/Feb
  "Phalguna",     // 11 Feb/Mar
] as const;

/**
 * Find the new moon that starts Chaitra for a given Hindu year.
 * Chaitra starts at the new moon nearest to the spring equinox (~Mar 21).
 */
function chaitraNewMoon(year: number): Date {
  const equinox = new Date(Date.UTC(year, 2, 21)); // ~Mar 21
  const k = lunationFor(dateToJD(equinox));
  // pick the new moon closest to equinox
  const a = jdToDate(newMoonJD(k));
  const b = jdToDate(newMoonJD(k - 1));
  const c = jdToDate(newMoonJD(k + 1));
  const candidates = [b, a, c];
  let best = a;
  let bestDiff = Infinity;
  for (const cand of candidates) {
    const diff = Math.abs(cand.getTime() - equinox.getTime());
    if (diff < bestDiff) {
      bestDiff = diff;
      best = cand;
    }
  }
  return best;
}

/**
 * Returns an array of 12 new-moon Dates, one per Hindu month
 * (Chaitra through Phalguna) for a given year.
 */
function hinduMonthNewMoons(year: number): Date[] {
  const chaitra = chaitraNewMoon(year);
  const k0 = lunationFor(dateToJD(chaitra));
  const moons: Date[] = [];
  for (let i = 0; i < 12; i++) {
    moons.push(jdToDate(newMoonJD(k0 + i)));
  }
  return moons;
}

// ---------------------------------------------------------------------------
// Festival types & definitions
// ---------------------------------------------------------------------------

export type FestivalType =
  | "national"
  | "hindu"
  | "sikh"
  | "buddhist"
  | "jain"
  | "islamic"
  | "christian"
  | "regional";

export interface Festival {
  name: string;
  date: string;        // YYYY-MM-DD
  type: FestivalType;
  description: string;
  month: string;       // display month name
  region?: string;
}

// ---------------------------------------------------------------------------
// Fixed-date (solar / national) festivals
// ---------------------------------------------------------------------------

function fixedFestivals(year: number): Festival[] {
  return [
    {
      name: "New Year's Day",
      date: `${year}-01-01`,
      type: "national",
      description: "The first day of the Gregorian calendar year, celebrated across India.",
      month: "January",
    },
    {
      name: "Makar Sankranti",
      date: `${year}-01-14`,
      type: "hindu",
      description: "Marks the Sun's transit into Makara (Capricorn). Celebrated with kite flying, bonfires, and sesame sweets.",
      month: "January",
    },
    {
      name: "Pongal",
      date: `${year}-01-15`,
      type: "hindu",
      description: "Tamil harvest festival dedicated to the Sun God. Celebrated over four days with special rice dishes.",
      month: "January",
      region: "Tamil Nadu",
    },
    {
      name: "Republic Day",
      date: `${year}-01-26`,
      type: "national",
      description: "Commemorates the adoption of the Indian Constitution on January 26, 1950. Grand parade in New Delhi.",
      month: "January",
    },
    {
      name: "Baisakhi",
      date: `${year}-04-13`,
      type: "sikh",
      description: "Sikh New Year and harvest festival of Punjab. Marks the founding of the Khalsa in 1699 by Guru Gobind Singh.",
      month: "April",
      region: "Punjab",
    },
    {
      name: "May Day / Labour Day",
      date: `${year}-05-01`,
      type: "national",
      description: "International Workers' Day, celebrating the contributions of workers and the labour movement.",
      month: "May",
    },
    {
      name: "Independence Day",
      date: `${year}-08-15`,
      type: "national",
      description: "Celebrates India's independence from British rule on August 15, 1947. Flag hoisting and patriotic events.",
      month: "August",
    },
    {
      name: "Gandhi Jayanti",
      date: `${year}-10-02`,
      type: "national",
      description: "Birth anniversary of Mahatma Gandhi, Father of the Nation. A national holiday promoting peace and non-violence.",
      month: "October",
    },
    {
      name: "Children's Day",
      date: `${year}-11-14`,
      type: "national",
      description: "Birth anniversary of Jawaharlal Nehru, first Prime Minister of India. Schools organize special events for children.",
      month: "November",
    },
    {
      name: "Christmas",
      date: `${year}-12-25`,
      type: "christian",
      description: "Celebrates the birth of Jesus Christ. Midnight masses, carols, and festive decorations across India.",
      month: "December",
    },
  ];
}

// ---------------------------------------------------------------------------
// Lunar / Hindu calendar festivals
// ---------------------------------------------------------------------------

function lunarFestivals(year: number): Festival[] {
  const months = hinduMonthNewMoons(year);
  const festivals: Festival[] = [];

  const add = (
    name: string,
    date: Date,
    type: FestivalType,
    description: string,
    region?: string
  ) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    festivals.push({
      name,
      date: fmt(date),
      type,
      description,
      month: monthNames[date.getUTCMonth()],
      region,
    });
  };

  // --- Magha (index 10) — falls in previous year's Chaitra cycle sometimes ---
  // We need Magha from the *current* year. Magha starts ~Jan/Feb.
  // Use the Hindu months from the previous year's Chaitra for Magha & Phalguna
  const prevMonths = hinduMonthNewMoons(year - 1);

  // Basant Panchami — Shukla Panchami (5th) of Magha
  const magha = prevMonths[10] ?? months[10];
  if (magha) {
    const basant = addDays(magha, 5);
    if (basant.getUTCFullYear() === year) {
      add("Basant Panchami", basant, "hindu",
        "Festival of spring honoring Goddess Saraswati. People wear yellow, fly kites, and seek blessings for knowledge and arts.");
    }
  }

  // Maha Shivaratri — Krishna Chaturdashi (14th of waning) of Phalguna
  // ≈ 14 days before the Phalguna full moon, or new moon - 1 day
  const phalguna = prevMonths[11] ?? months[11];
  if (phalguna) {
    // Shivaratri is the 14th tithi of Krishna Paksha = day before new moon of Phalguna
    // Actually: the new moon that starts Chaitra is the END of Phalguna.
    // Shivaratri = Chaitra new moon - 1 day (approximately)
    const chaitraNM = chaitraNewMoon(year);
    const shivaratri = addDays(chaitraNM, -1);
    if (shivaratri.getUTCFullYear() === year) {
      add("Maha Shivaratri", shivaratri, "hindu",
        "The Great Night of Shiva. Devotees fast, meditate, and worship Lord Shiva through the night. One of the most significant Hindu festivals.");
    }
  }

  // Holi — Full moon of Phalguna
  if (phalguna) {
    const chaitraNM = chaitraNewMoon(year);
    // Phalguna full moon is ~15 days before Chaitra new moon
    const holiFM = addDays(chaitraNM, -Math.round(SYNODIC / 2));
    if (holiFM.getUTCFullYear() === year) {
      add("Holi", holiFM, "hindu",
        "Festival of Colors celebrating the triumph of good over evil. People play with colored powders, dance, and enjoy festive sweets.");
      add("Holika Dahan", addDays(holiFM, -1), "hindu",
        "Eve of Holi. Bonfires are lit to symbolize the burning of demoness Holika and victory of devotee Prahlad.");
    }
  }

  // Chaitra festivals (index 0)
  const chaitra = months[0];
  if (chaitra) {
    // Ugadi / Gudi Padwa — Chaitra Shukla Pratipada (1st day of Chaitra)
    const ugadi = addDays(chaitra, 1);
    add("Ugadi / Gudi Padwa", ugadi, "hindu",
      "Hindu New Year celebrated in South and West India. New beginnings, special dishes like Ugadi Pachadi, and decorating home entrances.",
      "South & West India");

    // Chaitra Navratri starts — Chaitra Shukla Pratipada
    add("Chaitra Navratri Begins", ugadi, "hindu",
      "Nine nights of worship dedicated to Goddess Durga's nine forms. Fasting, prayers, and spiritual practices for divine blessings.");

    // Ram Navami — Chaitra Shukla Navami (9th)
    const ramNavami = addDays(chaitra, 9);
    add("Ram Navami", ramNavami, "hindu",
      "Celebrates the birth of Lord Rama, the seventh avatar of Vishnu. Temple celebrations, processions, and recitation of Ramayana.");

    // Hanuman Jayanti — Chaitra Purnima (full moon)
    const chaitraFM = fullMoonAfter(chaitra);
    add("Hanuman Jayanti", chaitraFM, "hindu",
      "Birth anniversary of Lord Hanuman. Devotees visit temples, recite Hanuman Chalisa, and offer prayers for strength and protection.");
  }

  // Vaishakha (index 1)
  const vaishakha = months[1];
  if (vaishakha) {
    // Akshaya Tritiya — Vaishakha Shukla Tritiya (3rd)
    const akshaya = addDays(vaishakha, 3);
    add("Akshaya Tritiya", akshaya, "hindu",
      "Considered one of the most auspicious days. People buy gold, start new ventures, and perform charitable deeds. Associated with eternal prosperity.");

    // Buddha Purnima — Vaishakha Purnima
    const buddhaPurnima = fullMoonAfter(vaishakha);
    add("Buddha Purnima", buddhaPurnima, "buddhist",
      "Celebrates the birth, enlightenment, and death of Gautama Buddha. Prayers, meditation, and acts of kindness at Buddhist monasteries.");
  }

  // Ashadha (index 3)
  const ashadha = months[3];
  if (ashadha) {
    // Rath Yatra — Ashadha Shukla Dwitiya (2nd)
    const rathYatra = addDays(ashadha, 2);
    add("Rath Yatra", rathYatra, "hindu",
      "Grand chariot procession of Lord Jagannath in Puri, Odisha. Massive wooden chariots are pulled through the streets by devotees.",
      "Odisha");

    // Guru Purnima — Ashadha Purnima
    const guruPurnima = fullMoonAfter(ashadha);
    add("Guru Purnima", guruPurnima, "hindu",
      "Day to honor spiritual and academic gurus (teachers). Celebrated by Hindus, Jains, and Buddhists. Students express gratitude to their teachers.");
  }

  // Shravana (index 4)
  const shravana = months[4];
  if (shravana) {
    // Nag Panchami — Shravana Shukla Panchami (5th)
    const nagPanchami = addDays(shravana, 5);
    add("Nag Panchami", nagPanchami, "hindu",
      "Worship of serpent deities (Nagas). Devotees offer milk and prayers to snake idols for protection from snake bites and evil.");

    // Raksha Bandhan — Shravana Purnima
    const rakshabandhan = fullMoonAfter(shravana);
    add("Raksha Bandhan", rakshabandhan, "hindu",
      "Sisters tie a sacred thread (rakhi) on brothers' wrists symbolizing love and protection. Brothers give gifts and vow to protect their sisters.");
  }

  // Bhadrapada (index 5)
  const bhadrapada = months[5];
  if (bhadrapada) {
    // Krishna Janmashtami — Bhadrapada Krishna Ashtami
    // = 8 days after the Shravana full moon, or equivalently
    //   Bhadrapada new moon - ~7 days (8th of waning from previous full moon)
    // More precisely: the full moon of Shravana + 8 days
    const janmashtami = addDays(fullMoonAfter(shravana!), 8);
    add("Krishna Janmashtami", janmashtami, "hindu",
      "Birth anniversary of Lord Krishna. Midnight celebrations, Dahi Handi, devotional songs, fasting, and temple decorations across India.");

    // Ganesh Chaturthi — Bhadrapada Shukla Chaturthi (4th)
    const ganesh = addDays(bhadrapada, 4);
    add("Ganesh Chaturthi", ganesh, "hindu",
      "Birth of Lord Ganesha. Elaborate clay idols are installed, worshipped for 10 days, and immersed in water (Visarjan). Major celebration in Maharashtra.",
      "Maharashtra");

    // Anant Chaturdashi — Bhadrapada Shukla Chaturdashi (14th)
    const anant = addDays(bhadrapada, 14);
    add("Anant Chaturdashi", anant, "hindu",
      "Last day of Ganesh Chaturthi celebrations. Grand processions for Ganesh Visarjan (immersion). Also worship of Lord Vishnu's Anant form.");

    // Onam — approximately in Bhadrapada, based on Malayalam solar calendar
    // Onam falls around Aug/Sep. We approximate it around Bhadrapada Shukla 12th
    const onam = addDays(bhadrapada, 12);
    add("Onam", onam, "hindu",
      "Kerala's harvest festival celebrating King Mahabali's return. Pookalam (flower carpet), Onasadya (feast), Vallam Kali (boat race), and folk dances.",
      "Kerala");
  }

  // Ashwin (index 6)
  const ashwin = months[6];
  if (ashwin) {
    // Sharad Navratri — Ashwin Shukla Pratipada to Navami (1st to 9th)
    const navratriStart = addDays(ashwin, 1);
    add("Navratri Begins", navratriStart, "hindu",
      "Nine nights of worship of Goddess Durga's nine forms (Navadurga). Includes Garba and Dandiya Raas dances, fasting, and elaborate pujas.");

    // Durga Ashtami — Ashwin Shukla Ashtami (8th)
    const durgaAshtami = addDays(ashwin, 8);
    add("Durga Ashtami / Maha Ashtami", durgaAshtami, "hindu",
      "Eighth day of Navratri. Special pujas, Kanya Pujan (worship of young girls as Goddess), and Sandhi Puja at the juncture of Ashtami and Navami.");

    // Maha Navami — Ashwin Shukla Navami (9th)
    const mahaNavami = addDays(ashwin, 9);
    add("Maha Navami", mahaNavami, "hindu",
      "Ninth day of Navratri. Ayudha Puja (worship of tools and instruments). Final day of Durga Puja celebrations in Bengal.");

    // Dussehra / Vijayadashami — Ashwin Shukla Dashami (10th)
    const dussehra = addDays(ashwin, 10);
    add("Dussehra / Vijayadashami", dussehra, "hindu",
      "Victory of Lord Rama over Ravana and Goddess Durga over Mahishasura. Burning of Ravana effigies, Durga idol immersion, and grand celebrations.");

    // Karwa Chauth — Kartik Krishna Chaturthi (4th of waning in Kartik)
    // Actually it falls ~4 days after Ashwin full moon
    const ashwinFM = fullMoonAfter(ashwin);
    const karwaChauth = addDays(ashwinFM, 4);
    add("Karwa Chauth", karwaChauth, "hindu",
      "Married Hindu women fast from sunrise to moonrise for the longevity and prosperity of their husbands. They break the fast after sighting the moon.",
      "North India");
  }

  // Kartik (index 7)
  const kartik = months[7];
  if (kartik) {
    // Dhanteras — Kartik Krishna Trayodashi ≈ 2 days before Kartik Amavasya
    const dhanteras = addDays(kartik, -2);
    add("Dhanteras", dhanteras, "hindu",
      "First day of the five-day Diwali festival. People buy gold, silver, and utensils. Worship of Lord Dhanvantari (God of Ayurveda) and Goddess Lakshmi.");

    // Narak Chaturdashi / Chhoti Diwali — day before Diwali
    const chhotiDiwali = addDays(kartik, -1);
    add("Narak Chaturdashi / Chhoti Diwali", chhotiDiwali, "hindu",
      "Eve of Diwali. Celebrates Lord Krishna's victory over demon Narakasura. Early morning oil bath rituals and lighting of diyas.");

    // Diwali — Kartik Amavasya (new moon)
    add("Diwali", kartik, "hindu",
      "Festival of Lights. Victory of light over darkness, good over evil. Lakshmi Puja, lighting diyas and candles, fireworks, sweets, and family gatherings.");

    // Govardhan Puja — Kartik Shukla Pratipada (1st)
    const govardhan = addDays(kartik, 1);
    add("Govardhan Puja / Annakut", govardhan, "hindu",
      "Celebrates Lord Krishna lifting Govardhan Hill. Devotees prepare a mountain of food (Annakut) as offering. Also celebrated as the first day of Vikram Samvat.");

    // Bhai Dooj — Kartik Shukla Dwitiya (2nd)
    const bhaiDooj = addDays(kartik, 2);
    add("Bhai Dooj", bhaiDooj, "hindu",
      "Sisters pray for their brothers' long and happy lives. Brothers visit sisters and exchange gifts. Similar to Raksha Bandhan in spirit.");

    // Chhath Puja — Kartik Shukla Shashthi (6th)
    const chhath = addDays(kartik, 6);
    add("Chhath Puja", chhath, "hindu",
      "Ancient Vedic festival dedicated to the Sun God (Surya) and Chhathi Maiya. Devotees stand in water and offer prayers to the rising and setting Sun.",
      "Bihar & Eastern India");

    // Dev Diwali — Kartik Purnima
    const devDiwali = fullMoonAfter(kartik);
    add("Dev Diwali / Kartik Purnima", devDiwali, "hindu",
      "Diwali of the Gods. Ghats of Varanasi are illuminated with thousands of diyas. Also celebrated as Guru Nanak Jayanti by Sikhs.");

    // Guru Nanak Jayanti — Kartik Purnima
    add("Guru Nanak Jayanti", devDiwali, "sikh",
      "Birth anniversary of Guru Nanak Dev Ji, founder of Sikhism. Prabhat Pheris, Akhand Path, Nagar Kirtan processions, and Langar (community meal).");
  }

  // --- Additional festivals from early months of NEXT Hindu year ---

  // Mauni Amavasya — Magha Amavasya (Magha new moon)
  // For current Gregorian year, Magha falls in Jan/Feb
  // We already handled Magha from prevMonths above

  // Magh Purnima
  if (magha) {
    const maghPurnima = fullMoonAfter(magha);
    if (maghPurnima.getUTCFullYear() === year) {
      add("Magh Purnima", maghPurnima, "hindu",
        "Sacred full moon of Magha month. Holy dip in rivers like Ganga, Yamuna, and Sangam at Prayagraj. Considered highly auspicious for charity.");
    }
  }

  // Mahavir Jayanti — Chaitra Shukla Trayodashi (13th)
  if (chaitra) {
    const mahavir = addDays(chaitra, 13);
    add("Mahavir Jayanti", mahavir, "jain",
      "Birth anniversary of Lord Mahavir, the 24th Tirthankara of Jainism. Processions, temple worship, and teachings of non-violence and truth.");
  }

  return festivals;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const MONTH_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Returns all Indian festivals for a given year, sorted by date.
 */
export function getFestivalsForYear(year: number): Festival[] {
  const all = [...fixedFestivals(year), ...lunarFestivals(year)];

  // De-duplicate by name+date
  const seen = new Set<string>();
  const unique = all.filter((f) => {
    const key = `${f.name}::${f.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by date
  unique.sort((a, b) => a.date.localeCompare(b.date));
  return unique;
}

/**
 * Group festivals by month for display.
 */
export function groupByMonth(
  festivals: Festival[]
): { month: string; festivals: Festival[] }[] {
  const groups: Record<string, Festival[]> = {};
  for (const f of festivals) {
    if (!groups[f.month]) groups[f.month] = [];
    groups[f.month].push(f);
  }
  return MONTH_ORDER.filter((m) => groups[m]).map((m) => ({
    month: m,
    festivals: groups[m],
  }));
}

/**
 * Type badge colors for display.
 */
export const TYPE_COLORS: Record<FestivalType, { bg: string; text: string }> = {
  national: { bg: "bg-blue-100", text: "text-blue-800" },
  hindu: { bg: "bg-orange-100", text: "text-orange-800" },
  sikh: { bg: "bg-yellow-100", text: "text-yellow-800" },
  buddhist: { bg: "bg-purple-100", text: "text-purple-800" },
  jain: { bg: "bg-emerald-100", text: "text-emerald-800" },
  islamic: { bg: "bg-green-100", text: "text-green-800" },
  christian: { bg: "bg-red-100", text: "text-red-800" },
  regional: { bg: "bg-pink-100", text: "text-pink-800" },
};
