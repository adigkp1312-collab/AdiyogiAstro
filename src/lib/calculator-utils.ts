// Shared calculator utilities for Vedic astrology calculators

export const ZODIAC_SIGNS = [
  { name: 'Aries', hindi: 'मेष', icon: '♈', element: 'Fire', lord: 'Mars', quality: 'Cardinal' },
  { name: 'Taurus', hindi: 'वृषभ', icon: '♉', element: 'Earth', lord: 'Venus', quality: 'Fixed' },
  { name: 'Gemini', hindi: 'मिथुन', icon: '♊', element: 'Air', lord: 'Mercury', quality: 'Mutable' },
  { name: 'Cancer', hindi: 'कर्क', icon: '♋', element: 'Water', lord: 'Moon', quality: 'Cardinal' },
  { name: 'Leo', hindi: 'सिंह', icon: '♌', element: 'Fire', lord: 'Sun', quality: 'Fixed' },
  { name: 'Virgo', hindi: 'कन्या', icon: '♍', element: 'Earth', lord: 'Mercury', quality: 'Mutable' },
  { name: 'Libra', hindi: 'तुला', icon: '♎', element: 'Air', lord: 'Venus', quality: 'Cardinal' },
  { name: 'Scorpio', hindi: 'वृश्चिक', icon: '♏', element: 'Water', lord: 'Mars', quality: 'Fixed' },
  { name: 'Sagittarius', hindi: 'धनु', icon: '♐', element: 'Fire', lord: 'Jupiter', quality: 'Mutable' },
  { name: 'Capricorn', hindi: 'मकर', icon: '♑', element: 'Earth', lord: 'Saturn', quality: 'Cardinal' },
  { name: 'Aquarius', hindi: 'कुम्भ', icon: '♒', element: 'Air', lord: 'Saturn', quality: 'Fixed' },
  { name: 'Pisces', hindi: 'मीन', icon: '♓', element: 'Water', lord: 'Jupiter', quality: 'Mutable' },
];

export const NAKSHATRAS = [
  { name: 'Ashwini', hindi: 'अश्विनी', deity: 'Ashwini Kumaras', lord: 'Ketu', symbol: 'Horse head', traits: 'Quick, pioneering, healing abilities' },
  { name: 'Bharani', hindi: 'भरणी', deity: 'Yama', lord: 'Venus', symbol: 'Yoni', traits: 'Creative, responsible, nurturing' },
  { name: 'Krittika', hindi: 'कृत्तिका', deity: 'Agni', lord: 'Sun', symbol: 'Razor/Flame', traits: 'Sharp, courageous, purifying' },
  { name: 'Rohini', hindi: 'रोहिणी', deity: 'Brahma', lord: 'Moon', symbol: 'Chariot', traits: 'Beautiful, artistic, materialistic' },
  { name: 'Mrigashira', hindi: 'मृगशिरा', deity: 'Soma', lord: 'Mars', symbol: 'Deer head', traits: 'Curious, searching, gentle' },
  { name: 'Ardra', hindi: 'आर्द्रा', deity: 'Rudra', lord: 'Rahu', symbol: 'Teardrop', traits: 'Transformative, intense, intellectual' },
  { name: 'Punarvasu', hindi: 'पुनर्वसु', deity: 'Aditi', lord: 'Jupiter', symbol: 'Bow & quiver', traits: 'Optimistic, regenerative, wise' },
  { name: 'Pushya', hindi: 'पुष्य', deity: 'Brihaspati', lord: 'Saturn', symbol: 'Flower', traits: 'Nourishing, generous, prosperous' },
  { name: 'Ashlesha', hindi: 'आश्लेषा', deity: 'Naga', lord: 'Mercury', symbol: 'Coiled serpent', traits: 'Mystical, perceptive, hypnotic' },
  { name: 'Magha', hindi: 'मघा', deity: 'Pitris', lord: 'Ketu', symbol: 'Royal throne', traits: 'Regal, ambitious, traditional' },
  { name: 'Purva Phalguni', hindi: 'पूर्वा फाल्गुनी', deity: 'Bhaga', lord: 'Venus', symbol: 'Front legs of bed', traits: 'Creative, romantic, luxurious' },
  { name: 'Uttara Phalguni', hindi: 'उत्तरा फाल्गुनी', deity: 'Aryaman', lord: 'Sun', symbol: 'Back legs of bed', traits: 'Generous, kind, leadership' },
  { name: 'Hasta', hindi: 'हस्त', deity: 'Savitar', lord: 'Moon', symbol: 'Hand/Fist', traits: 'Skillful, clever, crafty' },
  { name: 'Chitra', hindi: 'चित्रा', deity: 'Vishwakarma', lord: 'Mars', symbol: 'Bright jewel', traits: 'Artistic, elegant, charismatic' },
  { name: 'Swati', hindi: 'स्वाति', deity: 'Vayu', lord: 'Rahu', symbol: 'Shoot of plant', traits: 'Independent, flexible, diplomatic' },
  { name: 'Vishakha', hindi: 'विशाखा', deity: 'Indra-Agni', lord: 'Jupiter', symbol: 'Triumphal arch', traits: 'Determined, focused, ambitious' },
  { name: 'Anuradha', hindi: 'अनुराधा', deity: 'Mitra', lord: 'Saturn', symbol: 'Lotus', traits: 'Devoted, friendly, successful' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठा', deity: 'Indra', lord: 'Mercury', symbol: 'Circular amulet', traits: 'Protective, senior, responsible' },
  { name: 'Moola', hindi: 'मूल', deity: 'Nirriti', lord: 'Ketu', symbol: 'Bunch of roots', traits: 'Research-oriented, deep, transformative' },
  { name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', deity: 'Apas', lord: 'Venus', symbol: 'Elephant tusk', traits: 'Invincible, confident, purifying' },
  { name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', deity: 'Vishve Devas', lord: 'Sun', symbol: 'Small bed', traits: 'Universal, leadership, righteous' },
  { name: 'Shravana', hindi: 'श्रवण', deity: 'Vishnu', lord: 'Moon', symbol: 'Three footprints', traits: 'Learned, connected, listening' },
  { name: 'Dhanishta', hindi: 'धनिष्ठा', deity: 'Eight Vasus', lord: 'Mars', symbol: 'Drum', traits: 'Musical, wealthy, adaptable' },
  { name: 'Shatabhisha', hindi: 'शतभिषा', deity: 'Varuna', lord: 'Rahu', symbol: 'Empty circle', traits: 'Healing, secretive, truthful' },
  { name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपद', deity: 'Aja Ekapada', lord: 'Jupiter', symbol: 'Sword', traits: 'Passionate, fiery, spiritual' },
  { name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपद', deity: 'Ahir Budhnya', lord: 'Saturn', symbol: 'Twin', traits: 'Wise, compassionate, deep' },
  { name: 'Revati', hindi: 'रेवती', deity: 'Pushan', lord: 'Mercury', symbol: 'Fish/Drum', traits: 'Nurturing, creative, prosperous' },
];

// Reduce digits to single (master numbers 11, 22, 33 preserved)
export function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((a, d) => a + parseInt(d), 0);
  }
  return num;
}

// Life Path Number from DOB
export function calculateLifePathNumber(dob: string): number {
  const digits = dob.replace(/\D/g, '');
  const sum = digits.split('').reduce((a, d) => a + parseInt(d), 0);
  return reduceToSingle(sum);
}

// Destiny Number from name
export function calculateDestinyNumber(name: string): number {
  const letterValues: Record<string, number> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((ch, i) => {
    letterValues[ch] = (i % 9) + 1;
  });
  const sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('')
    .reduce((a, ch) => a + (letterValues[ch] || 0), 0);
  return reduceToSingle(sum);
}

// Soul Urge (vowels only)
export function calculateSoulUrge(name: string): number {
  const vowels = 'AEIOU';
  const letterValues: Record<string, number> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((ch, i) => {
    letterValues[ch] = (i % 9) + 1;
  });
  const sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('')
    .filter(ch => vowels.includes(ch))
    .reduce((a, ch) => a + (letterValues[ch] || 0), 0);
  return reduceToSingle(sum);
}

// Personality Number (consonants only)
export function calculatePersonality(name: string): number {
  const vowels = 'AEIOU';
  const letterValues: Record<string, number> = {};
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((ch, i) => {
    letterValues[ch] = (i % 9) + 1;
  });
  const sum = name.toUpperCase().replace(/[^A-Z]/g, '').split('')
    .filter(ch => !vowels.includes(ch))
    .reduce((a, ch) => a + (letterValues[ch] || 0), 0);
  return reduceToSingle(sum);
}

// Moon sign from DOB (approximate sidereal)
export function calculateMoonSignIndex(dob: string): number {
  const date = new Date(dob);
  const refDate = new Date('2000-01-06'); // known reference
  const daysDiff = (date.getTime() - refDate.getTime()) / 86400000;
  const moonCycle = 27.3216;
  const daysInCycle = ((daysDiff % moonCycle) + moonCycle) % moonCycle;
  return Math.floor(daysInCycle / (moonCycle / 12)) % 12;
}

// Nakshatra from DOB (approximate)
export function calculateNakshatraIndex(dob: string): number {
  const date = new Date(dob);
  const refDate = new Date('2000-01-06');
  const daysDiff = (date.getTime() - refDate.getTime()) / 86400000;
  const moonCycle = 27.3216;
  const daysInCycle = ((daysDiff % moonCycle) + moonCycle) % moonCycle;
  return Math.floor(daysInCycle / (moonCycle / 27)) % 27;
}

// Sidereal Sun sign from DOB (Vedic dates shifted ~23 days from Western)
export function calculateSunSignIndex(dob: string): number {
  const date = new Date(dob);
  const m = date.getMonth() + 1;
  const d = date.getDate();
  // Sidereal zodiac start dates (approximate)
  const ranges: [number, number][] = [
    [4, 14], [5, 15], [6, 15], [7, 16], [8, 17], [9, 17],
    [10, 17], [11, 16], [12, 16], [1, 14], [2, 13], [3, 15],
  ];
  for (let i = 0; i < 12; i++) {
    const [sm, sd] = ranges[i];
    const [em, ed] = ranges[(i + 1) % 12];
    if (em > sm) {
      if ((m === sm && d >= sd) || (m > sm && m < em) || (m === em && d < ed)) return i;
    } else {
      if ((m === sm && d >= sd) || m > sm || m < em || (m === em && d < ed)) return i;
    }
  }
  return 0;
}

// Chinese Zodiac
export const CHINESE_ANIMALS = [
  { animal: 'Rat', emoji: '🐀', traits: 'Quick-witted, resourceful, versatile, kind', compatible: 'Dragon, Monkey, Ox', incompatible: 'Horse, Goat' },
  { animal: 'Ox', emoji: '🐂', traits: 'Diligent, dependable, strong, determined', compatible: 'Rat, Snake, Rooster', incompatible: 'Tiger, Dragon, Horse, Goat' },
  { animal: 'Tiger', emoji: '🐅', traits: 'Brave, competitive, confident, unpredictable', compatible: 'Dragon, Horse, Pig', incompatible: 'Ox, Tiger, Snake, Monkey' },
  { animal: 'Rabbit', emoji: '🐇', traits: 'Quiet, elegant, kind, responsible', compatible: 'Goat, Monkey, Dog, Pig', incompatible: 'Snake, Rooster' },
  { animal: 'Dragon', emoji: '🐉', traits: 'Confident, intelligent, enthusiastic, ambitious', compatible: 'Rooster, Rat, Monkey', incompatible: 'Ox, Goat, Dog' },
  { animal: 'Snake', emoji: '🐍', traits: 'Enigmatic, intelligent, wise, graceful', compatible: 'Dragon, Rooster', incompatible: 'Tiger, Rabbit, Snake, Pig' },
  { animal: 'Horse', emoji: '🐎', traits: 'Animated, active, energetic, quick', compatible: 'Tiger, Goat, Rabbit', incompatible: 'Rat, Ox, Rooster' },
  { animal: 'Goat', emoji: '🐐', traits: 'Calm, gentle, creative, sympathetic', compatible: 'Rabbit, Horse, Pig', incompatible: 'Ox, Tiger, Dog' },
  { animal: 'Monkey', emoji: '🐒', traits: 'Sharp, smart, curious, mischievous', compatible: 'Ox, Rabbit', incompatible: 'Tiger, Pig' },
  { animal: 'Rooster', emoji: '🐓', traits: 'Observant, hardworking, courageous, talented', compatible: 'Ox, Snake', incompatible: 'Rat, Rabbit, Horse, Rooster, Dog' },
  { animal: 'Dog', emoji: '🐕', traits: 'Loyal, honest, amiable, kind, prudent', compatible: 'Rabbit', incompatible: 'Dragon, Goat, Rooster' },
  { animal: 'Pig', emoji: '🐖', traits: 'Compassionate, generous, diligent, easy-going', compatible: 'Tiger, Rabbit, Goat', incompatible: 'Snake, Monkey' },
];

export const CHINESE_ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export function calculateChineseZodiac(year: number) {
  const animalIndex = ((year - 4) % 12 + 12) % 12;
  const elementIndex = Math.floor(((year - 4) % 10) / 2);
  const yinYang = year % 2 === 0 ? 'Yang' : 'Yin';
  return { ...CHINESE_ANIMALS[animalIndex], yearElement: CHINESE_ELEMENTS[elementIndex], yinYang };
}

// Numerology meanings
export const LIFE_PATH_MEANINGS: Record<number, { title: string; meaning: string }> = {
  1: { title: 'The Leader', meaning: 'Independent, innovative, and determined. Natural born leaders who forge their own path.' },
  2: { title: 'The Peacemaker', meaning: 'Diplomatic, sensitive, and cooperative. Excel at creating harmony and partnerships.' },
  3: { title: 'The Creative', meaning: 'Expressive, artistic, and joyful. Natural communicators with vibrant energy.' },
  4: { title: 'The Builder', meaning: 'Practical, reliable, and hardworking. Create strong foundations for lasting success.' },
  5: { title: 'The Adventurer', meaning: 'Dynamic, freedom-loving, and versatile. Thrive on change and new experiences.' },
  6: { title: 'The Nurturer', meaning: 'Responsible, caring, and protective. Find purpose in serving family and community.' },
  7: { title: 'The Seeker', meaning: 'Analytical, introspective, and spiritual. Drawn to knowledge and inner wisdom.' },
  8: { title: 'The Powerhouse', meaning: 'Ambitious, authoritative, and successful. Excel in business and material achievement.' },
  9: { title: 'The Humanitarian', meaning: 'Compassionate, generous, and idealistic. Inspired to serve a higher purpose.' },
  11: { title: 'The Intuitive (Master)', meaning: 'Highly intuitive, inspirational, and visionary. A spiritual messenger with great potential.' },
  22: { title: 'The Master Builder', meaning: 'Visionary, disciplined, and practical. Can turn the biggest dreams into reality.' },
  33: { title: 'The Master Teacher', meaning: 'Selfless, spiritual guide. Devoted to uplifting humanity with compassion and wisdom.' },
};

// Planet -> Lucky attributes
export const PLANET_ATTRIBUTES: Record<number, { planet: string; color: string; hex: string; day: string; gem: string }> = {
  1: { planet: 'Sun', color: 'Gold / Orange', hex: '#F59E0B', day: 'Sunday', gem: 'Ruby' },
  2: { planet: 'Moon', color: 'White / Silver', hex: '#D1D5DB', day: 'Monday', gem: 'Pearl' },
  3: { planet: 'Jupiter', color: 'Yellow', hex: '#EAB308', day: 'Thursday', gem: 'Yellow Sapphire' },
  4: { planet: 'Rahu', color: 'Blue', hex: '#3B82F6', day: 'Saturday', gem: 'Hessonite' },
  5: { planet: 'Mercury', color: 'Green', hex: '#10B981', day: 'Wednesday', gem: 'Emerald' },
  6: { planet: 'Venus', color: 'Pink / White', hex: '#EC4899', day: 'Friday', gem: 'Diamond' },
  7: { planet: 'Ketu', color: 'Grey / Smoky', hex: '#6B7280', day: 'Monday', gem: "Cat's Eye" },
  8: { planet: 'Saturn', color: 'Dark Blue', hex: '#1E40AF', day: 'Saturday', gem: 'Blue Sapphire' },
  9: { planet: 'Mars', color: 'Red', hex: '#EF4444', day: 'Tuesday', gem: 'Red Coral' },
};
