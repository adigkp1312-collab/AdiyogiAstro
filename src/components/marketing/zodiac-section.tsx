import Link from "next/link";

const zodiacSigns = [
  { symbol: "♈", name: "Aries", dates: "Mar 21 – Apr 19", mood: "Energized" },
  { symbol: "♉", name: "Taurus", dates: "Apr 20 – May 20", mood: "Grounded" },
  { symbol: "♊", name: "Gemini", dates: "May 21 – Jun 20", mood: "Curious" },
  { symbol: "♋", name: "Cancer", dates: "Jun 21 – Jul 22", mood: "Reflective" },
  { symbol: "♌", name: "Leo", dates: "Jul 23 – Aug 22", mood: "Confident" },
  { symbol: "♍", name: "Virgo", dates: "Aug 23 – Sep 22", mood: "Analytical" },
  { symbol: "♎", name: "Libra", dates: "Sep 23 – Oct 22", mood: "Balanced" },
  { symbol: "♏", name: "Scorpio", dates: "Oct 23 – Nov 21", mood: "Intense" },
  { symbol: "♐", name: "Sagittarius", dates: "Nov 22 – Dec 21", mood: "Adventurous" },
  { symbol: "♑", name: "Capricorn", dates: "Dec 22 – Jan 19", mood: "Ambitious" },
  { symbol: "♒", name: "Aquarius", dates: "Jan 20 – Feb 18", mood: "Visionary" },
  { symbol: "♓", name: "Pisces", dates: "Feb 19 – Mar 20", mood: "Intuitive" },
];

export function ZodiacSection() {
  return (
    <section id="horoscopes" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 text-center sm:mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Daily Guidance</p>
        <h2 className="font-display text-3xl font-normal text-[#f0ebe3] sm:text-4xl md:text-5xl">Horoscope for All Signs</h2>
        <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        {zodiacSigns.map((sign) => (
          <Link
            key={sign.name}
            href={`/horoscopes/${sign.name.toLowerCase()}`}
            className="group rounded-2xl border border-white/[0.08] bg-surface p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <div className="mb-3 text-3xl sm:text-4xl">{sign.symbol}</div>
            <div className="mb-1 font-display text-lg font-medium text-[#f0ebe3]">{sign.name}</div>
            <div className="mb-3 text-xs text-white/45">{sign.dates}</div>
            <div className="inline-block rounded-lg bg-gold-dim px-3 py-1 text-[10px] font-medium text-gold sm:text-xs">
              {sign.mood}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
