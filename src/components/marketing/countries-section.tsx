const countries = [
  {
    flag: "🇮🇳",
    name: "India",
    prediction:
      "Saturn's transit through the 10th house signals governmental restructuring. Economic policies undergo revision. Defense and infrastructure receive heightened focus through 2027.",
    tags: ["Economy", "Governance", "Infrastructure"],
  },
  {
    flag: "🇺🇸",
    name: "United States",
    prediction:
      "Pluto's continued journey through Aquarius transforms technology regulation and social contracts. Leadership transitions marked by generational shifts.",
    tags: ["Technology", "Politics", "Society"],
  },
  {
    flag: "🇨🇳",
    name: "China",
    prediction:
      "Jupiter's aspect brings expansion in maritime and trade corridors. Internal economic rebalancing accelerates. Diplomatic relations see strategic recalibration.",
    tags: ["Trade", "Economy", "Diplomacy"],
  },
  {
    flag: "🇷🇺",
    name: "Russia",
    prediction:
      "Mars influence intensifies geopolitical positioning. Energy sector faces transformation. Saturn demands restructuring of long-term strategic alliances.",
    tags: ["Energy", "Geopolitics", "Alliances"],
  },
];

export function CountriesSection() {
  return (
    <section id="countries" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 text-center sm:mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Mundane Astrology</p>
        <h2 className="font-display text-3xl font-normal text-[#f0ebe3] sm:text-4xl md:text-5xl">Horoscopes for Nations</h2>
        <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {countries.map((country) => (
          <article
            key={country.name}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-surface to-elevated p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15]"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">{country.flag}</span>
              <h3 className="font-display text-xl font-medium text-[#f0ebe3]">{country.name}</h3>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-white/70">{country.prediction}</p>

            <div className="flex flex-wrap gap-2">
              {country.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.08] bg-deep px-2.5 py-1 text-[10px] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
