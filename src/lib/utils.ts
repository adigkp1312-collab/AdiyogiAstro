export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month} '${year}`;
}

export function getPlaceholderMoonSign(dob: string): string {
  const date = new Date(dob);
  const month = date.getMonth(); // 0-11
  // Simplified: Map month to zodiac (placeholder - real calc needs ephemeris)
  const monthToSign: Record<number, string> = {
    0: 'Capricorn',   // Jan
    1: 'Aquarius',    // Feb
    2: 'Pisces',      // Mar
    3: 'Aries',       // Apr
    4: 'Taurus',      // May
    5: 'Gemini',      // Jun
    6: 'Cancer',      // Jul
    7: 'Leo',         // Aug
    8: 'Virgo',       // Sep
    9: 'Libra',       // Oct
    10: 'Scorpio',    // Nov
    11: 'Sagittarius' // Dec
  };
  return monthToSign[month] || 'Aries';
}

export function getPlaceholderDasha(): string {
  // Placeholder - real calculation needs Swiss Ephemeris
  const dashas = ['Mercury Pratyantardasha', 'Venus Pratyantardasha', 'Mars Pratyantardasha', 'Jupiter Pratyantardasha'];
  return dashas[Math.floor(Math.random() * dashas.length)];
}

export function validatePhone(phone: string): boolean {
  // Indian phone number: 10 digits starting with 6-9
  return /^[6-9]\d{9}$/.test(phone);
}

export function formatCurrency(amount: number): string {
  return `Rs.${amount.toLocaleString('en-IN')}`;
}

export function getZodiacEmoji(sign: string): string {
  const emojis: Record<string, string> = {
    'Aries': '\u2648', 'Taurus': '\u2649', 'Gemini': '\u264A',
    'Cancer': '\u264B', 'Leo': '\u264C', 'Virgo': '\u264D',
    'Libra': '\u264E', 'Scorpio': '\u264F', 'Sagittarius': '\u2650',
    'Capricorn': '\u2651', 'Aquarius': '\u2652', 'Pisces': '\u2653'
  };
  return emojis[sign] || '\u2728';
}

// ========== Sprint 2: New Utilities ==========

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const mins = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${day} ${month}, ${displayHour}:${mins} ${ampm}`;
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}
