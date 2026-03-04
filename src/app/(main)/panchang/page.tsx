'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import KundliWatermark from '@/components/ui/KundliWatermark';

// Get current time in IST (UTC+5:30)
function getIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 3600000);
}

// Helper to get today's Panchang data (mock/calculated)
function getTodayPanchang() {
  const now = getIST();
  const dayNames = ['Ravivaar (Sun)', 'Somvaar (Mon)', 'Mangalvaar (Tue)', 'Budhvaar (Wed)', 'Guruvaar (Thu)', 'Shukravaar (Fri)', 'Shanivaar (Sat)'];
  const dayIndex = now.getDay();

  // Tithi cycles through 30 tithis in a lunar month
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const tithiIndex = dayOfYear % 30;
  const tithis = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya',
  ];
  const paksha = tithiIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha';

  // Nakshatra (27 nakshatras)
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Moola', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati',
  ];
  const nakshatraIndex = dayOfYear % 27;

  // Yoga (27 yogas)
  const yogas = [
    'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
    'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
    'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
    'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
    'Indra', 'Vaidhriti',
  ];
  const yogaIndex = (dayOfYear + 5) % 27;

  // Karana (11 karanas rotating)
  const karanas = [
    'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija',
    'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Nagava', 'Kimstughna',
  ];
  const karanaIndex = (dayOfYear * 2) % 11;

  // Hindu month names
  const hinduMonths = [
    'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana',
    'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha', 'Pausha',
    'Magha', 'Phalguna',
  ];
  const hinduMonthIndex = (now.getMonth() + 11) % 12;

  // Rahu Kaal times based on day of week
  const rahuKaalTimes = [
    '4:30 PM - 6:00 PM', // Sunday
    '7:30 AM - 9:00 AM', // Monday
    '3:00 PM - 4:30 PM', // Tuesday
    '12:00 PM - 1:30 PM', // Wednesday
    '1:30 PM - 3:00 PM', // Thursday
    '10:30 AM - 12:00 PM', // Friday
    '9:00 AM - 10:30 AM', // Saturday
  ];

  // Sunrise/sunset approximation for India
  const sunriseHour = 6 + Math.floor(Math.sin((dayOfYear / 365) * Math.PI) * 0.5);
  const sunsetHour = 18 + Math.floor(Math.sin((dayOfYear / 365) * Math.PI) * 0.5);

  return {
    date: now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' }),
    var: dayNames[dayIndex],
    hinduMonth: hinduMonths[hinduMonthIndex],
    paksha,
    tithi: tithis[tithiIndex],
    nakshatra: nakshatras[nakshatraIndex],
    yoga: yogas[yogaIndex],
    karana: karanas[karanaIndex],
    sunrise: `${sunriseHour}:15 AM`,
    sunset: `${sunsetHour}:42 PM`,
    rahuKaal: rahuKaalTimes[dayIndex],
    moonSign: nakshatras[nakshatraIndex],
    inauspicious: [
      { name: 'Rahu Kaal', time: rahuKaalTimes[dayIndex] },
      { name: 'Yamaganda', time: dayIndex % 2 === 0 ? '9:00 AM - 10:30 AM' : '1:30 PM - 3:00 PM' },
      { name: 'Gulika', time: dayIndex % 2 === 0 ? '3:00 PM - 4:30 PM' : '6:00 AM - 7:30 AM' },
    ],
    auspicious: [
      { name: 'Abhijit Muhurat', time: '11:50 AM - 12:38 PM' },
      { name: 'Amrit Kaal', time: '2:15 PM - 3:45 PM' },
    ],
  };
}

export default function PanchangPage() {
  const panchang = getTodayPanchang();
  const [showInauspicious, setShowInauspicious] = useState(false);

  return (
    <div className="bg-background min-h-screen starfield">
      <KundliWatermark className="top-20 -left-20" opacity={0.03} size={400} />
      <KundliWatermark className="top-[600px] -right-16" opacity={0.02} size={350} color="#F59E0B" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-lg font-bold text-text-primary mb-1">Panchang</h1>
          <p className="text-xs text-text-secondary">{panchang.date}</p>
          <p className="text-[10px] text-text-secondary/60 mt-0.5">All times in IST (Indian Standard Time)</p>
        </div>

        {/* Hindu Calendar Info */}
        <div className="mx-4 mt-3 bg-gradient-to-r from-accent/10 via-surface-card to-accent/5 rounded-card p-4 border border-accent/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30">
              <span className="text-xl">📅</span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">{panchang.hinduMonth} | {panchang.paksha}</p>
              <p className="text-xs text-accent font-medium">{panchang.var}</p>
            </div>
          </div>
        </div>

        {/* Sunrise / Sunset */}
        <div className="mx-4 mt-3 grid grid-cols-2 gap-3">
          <div className="bg-surface-card rounded-card p-3 border border-border/30 text-center">
            <span className="text-xl">🌅</span>
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mt-1">Sunrise</p>
            <p className="text-sm font-bold text-accent">{panchang.sunrise}</p>
          </div>
          <div className="bg-surface-card rounded-card p-3 border border-border/30 text-center">
            <span className="text-xl">🌇</span>
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold mt-1">Sunset</p>
            <p className="text-sm font-bold text-accent">{panchang.sunset}</p>
          </div>
        </div>

        {/* Main Panchang Elements */}
        <div className="px-4 mt-4">
          <h3 className="text-sm uppercase tracking-widest text-text-secondary font-semibold mb-3 text-center">
            Panch Ang (Five Limbs)
          </h3>
          <div className="space-y-2">
            {[
              {
                label: 'Tithi',
                value: panchang.tithi,
                desc: 'Lunar day - determines auspiciousness of activities',
                icon: '🌙',
              },
              {
                label: 'Nakshatra',
                value: panchang.nakshatra,
                desc: 'Lunar mansion - influences mood and energy',
                icon: '⭐',
              },
              {
                label: 'Yoga',
                value: panchang.yoga,
                desc: 'Sun-Moon angular relationship',
                icon: '🔮',
              },
              {
                label: 'Karana',
                value: panchang.karana,
                desc: 'Half of a Tithi - affects short-term activities',
                icon: '☯️',
              },
              {
                label: 'Var',
                value: panchang.var,
                desc: 'Day of the week and its ruling planet',
                icon: '📿',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-surface-card rounded-card px-4 py-3 border border-border/30 flex items-center gap-3 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <span className="text-sm">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold">{item.label}</p>
                    <p className="text-sm font-bold text-primary-light">{item.value}</p>
                  </div>
                  <p className="text-[10px] text-text-secondary/70 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auspicious Times */}
        <div className="px-4 mt-5">
          <h3 className="text-sm uppercase tracking-widest text-text-secondary font-semibold mb-3 text-center">
            Shubh Muhurat
          </h3>
          <div className="space-y-2">
            {panchang.auspicious.map((item) => (
              <div
                key={item.name}
                className="bg-surface-card rounded-card px-4 py-3 border border-positive/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-positive shadow-sm" />
                  <p className="text-xs font-semibold text-text-primary">{item.name}</p>
                </div>
                <Badge variant="favourable" size="sm">{item.time}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Inauspicious Times */}
        <div className="px-4 mt-4 pb-8">
          <button
            onClick={() => setShowInauspicious(!showInauspicious)}
            className="w-full flex items-center justify-center gap-2 mb-3"
          >
            <h3 className="text-sm uppercase tracking-widest text-text-secondary font-semibold text-center">
              Inauspicious Times
            </h3>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${showInauspicious ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showInauspicious && (
            <div className="space-y-2 animate-fade-in">
              {panchang.inauspicious.map((item) => (
                <div
                  key={item.name}
                  className="bg-surface-card rounded-card px-4 py-3 border border-negative/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-negative shadow-sm" />
                    <p className="text-xs font-semibold text-text-primary">{item.name}</p>
                  </div>
                  <Badge variant="unfavourable" size="sm">{item.time}</Badge>
                </div>
              ))}
              <p className="text-[10px] text-text-secondary/60 text-center mt-2 px-4">
                Avoid starting new ventures, travel, or important tasks during these periods
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
