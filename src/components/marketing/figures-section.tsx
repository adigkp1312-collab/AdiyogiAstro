const figures = [
  {
    name: "Narendra Modi",
    title: "Prime Minister of India",
    zodiac: "Virgo - Scorpio Ascendant",
    insight: "Saturns current transit activates the 5th house, emphasizing legacy projects and diplomatic achievements.",
  },
  {
    name: "Donald Trump",
    title: "Former US President",
    zodiac: "Gemini - Leo Ascendant",
    insight: "Mars-ruled period continues to drive combative public presence. Jupiter transit may signal unexpected alliances.",
  },
  {
    name: "Elon Musk",
    title: "CEO, Tesla and SpaceX",
    zodiac: "Cancer - Virgo Ascendant",
    insight: "Rahu influence on the 10th house continues to drive unconventional ventures and public attention.",
  },
  {
    name: "Xi Jinping",
    title: "President of China",
    zodiac: "Gemini",
    insight: "Jupiters transit indicates period of consolidation. Saturns aspect suggests careful navigation of pressures.",
  },
];

export function FiguresSection() {
  return (
    <section id="figures" className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 text-center sm:mb-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Kundli Analysis</p>
        <h2 className="font-display text-3xl font-normal text-[#f0ebe3] sm:text-4xl md:text-5xl">Horoscopes for Prominent Figures</h2>
        <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((figure) => (
          <article
            key={figure.name}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold"
          >
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-elevated to-deep text-xl opacity-80">
              <span className="text-5xl">&#128100;</span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-medium text-[#f0ebe3]">{figure.name}</h3>
              <p className="mb-3 text-xs text-white/45">{figure.title}</p>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-gold-dim px-2.5 py-1 text-xs text-gold mb-3">
                {figure.zodiac}
              </div>
              <p className="text-sm leading-relaxed text-white/70">{figure.insight}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
