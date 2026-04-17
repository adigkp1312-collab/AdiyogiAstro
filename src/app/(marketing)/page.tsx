import "../hero-animations.css";
import "../mandir-darpan.css";
import { Hero } from "@/components/marketing/hero";

export default function HomePage() {
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const zodiacSigns = [
    { name: "Aries", hi: "मेष", symbol: "♈" },
    { name: "Taurus", hi: "वृषभ", symbol: "♉" },
    { name: "Gemini", hi: "मिथुन", symbol: "♊" },
    { name: "Cancer", hi: "कर्क", symbol: "♋" },
    { name: "Leo", hi: "सिंह", symbol: "♌" },
    { name: "Virgo", hi: "कन्या", symbol: "♍" },
    { name: "Libra", hi: "तुला", symbol: "♎" },
    { name: "Scorpio", hi: "वृश्चिक", symbol: "♏" },
    { name: "Sagittarius", hi: "धनु", symbol: "♐" },
    { name: "Capricorn", hi: "मकर", symbol: "♑" },
    { name: "Aquarius", hi: "कुम्भ", symbol: "♒" },
    { name: "Pisces", hi: "मीन", symbol: "♓" },
  ];

  const planets = [
    { name: "Sun", hi: "सूर्य", tag: "SOUL", desc: "Governs identity, ego, father, authority, and vitality." },
    { name: "Moon", hi: "चंद्र", tag: "MIND", desc: "Rules emotions, mother, intuition, and public life." },
    { name: "Mars", hi: "मंगल", tag: "ENERGY", desc: "Commands courage, property, siblings, and drive." },
    { name: "Mercury", hi: "बुध", tag: "INTELLECT", desc: "Governs communication, trade, and analytical mind." },
    { name: "Jupiter", hi: "गुरु", tag: "WISDOM", desc: "The great benefic — wisdom, wealth, children, dharma." },
    { name: "Venus", hi: "शुक्र", tag: "LOVE", desc: "Rules relationships, beauty, arts, and luxury." },
    { name: "Saturn", hi: "शनि", tag: "KARMA", desc: "Lord of karma — discipline, delays, and liberation." },
    { name: "Rahu", hi: "राहु", tag: "DESIRE", desc: "North Node — amplifies and brings worldly desires." },
    { name: "Ketu", hi: "केतु", tag: "MOKSHA", desc: "South Node — spirituality, detachment, past-life karma." },
  ];

  const horoscopes = [
    { sign: "Aries", hi: "मेष", note: "Mars energises your 1st house. Bold moves pay off this week.", emoji: "♈" },
    { sign: "Taurus", hi: "वृषभ", note: "Venus exalted in Pisces blesses your 12th house. Dream boldly.", emoji: "♉" },
    { sign: "Gemini", hi: "मिथुन", note: "Jupiter in your 1st promises expansion. Launch new projects now.", emoji: "♊" },
    { sign: "Cancer", hi: "कर्क", note: "Moon in Taurus stabilises emotions. Excellent week for family.", emoji: "♋" },
  ];

  const articles = [
    { title: "Understanding Rahu-Ketu Axis in Your Chart", cat: "Nodes", desc: "The shadow planets reveal karmic wounds and soul contracts across lifetimes." },
    { title: "Jupiter Return: The 12-Year Cycle of Growth", cat: "Transits", desc: "Every 12 years, Jupiter completes its orbit and returns to your natal position — a time of renewal." },
    { title: "The Power of the Navamsa Chart (D9)", cat: "Divisional Charts", desc: "Beyond the birth chart — the D9 holds the secrets of marriage, dharma, and soul purpose." },
    { title: "Saturn Sade Sati: 7.5 Years of Transformation", cat: "Saturn", desc: "When Saturn transits over your Moon sign, a profound period of restructuring and growth begins." },
    { title: "Exalted and Debilitated Planets", cat: "Planetary Dignity", desc: "Planets in their exaltation signs express their highest qualities — understanding this unlocks your chart." },
    { title: "The 12 Houses: A Complete Guide", cat: "Birth Chart", desc: "From self to moksha — each house governs a unique domain of your life experience." },
  ];

  return (
    <>
      {/* ── Full-bleed Solar System Hero ── */}
      <Hero />

      <div className="mandir-darpan">
      <div className="newspaper">

        {/* ── Topbar ── */}
        <div className="topbar">
          <div className="left">
            <span>Vol. I, No. 1</span>
            <span>·</span>
            <span>{today}</span>
          </div>
          <div className="center">दैविक वाणी — DAIVIK VANI</div>
          <div className="right">
            <span>Cosmic Intelligence · Ancient Wisdom</span>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="ticker-wrap">
          <div className="ticker-label">TODAY</div>
          <div className="ticker">
            <div className="ticker-track">
              <span>Sun in Aries · Tithi: Panchami · Nakshatra: Rohini · Yoga: Siddhi · Karana: Bava</span>
              <span>Mercury stations direct — 14 May 2026 · New Moon in Taurus this weekend</span>
              <span>Jupiter transits Gemini · Saturn retrograde begins 1 June 2026</span>
              <span>Shubh Muhurta today: 06:00–07:30 and 14:30–16:00</span>
              <span>Rahu in Pisces · Ketu in Virgo · Venus in Pisces — exalted</span>
              {/* duplicate for seamless CSS loop */}
              <span>Sun in Aries · Tithi: Panchami · Nakshatra: Rohini · Yoga: Siddhi · Karana: Bava</span>
              <span>Mercury stations direct — 14 May 2026 · New Moon in Taurus this weekend</span>
              <span>Jupiter transits Gemini · Saturn retrograde begins 1 June 2026</span>
              <span>Shubh Muhurta today: 06:00–07:30 and 14:30–16:00</span>
              <span>Rahu in Pisces · Ketu in Virgo · Venus in Pisces — exalted</span>
            </div>
          </div>
        </div>

        {/* ── 3-Column Main Grid ── */}
        <div className="main-grid">

          {/* LEFT COLUMN */}
          <div className="left-col">

            <div className="box">
              <div className="box-title">
                आज का पंचांग <small>Panchang</small>
              </div>
              <div className="box-content">
                <ul className="info-list">
                  <li><strong>Tithi</strong><span>Panchami</span></li>
                  <li><strong>Nakshatra</strong><span>Rohini</span></li>
                  <li><strong>Yoga</strong><span>Siddhi</span></li>
                  <li><strong>Karana</strong><span>Bava</span></li>
                  <li><strong>Sunrise</strong><span>06:12 IST</span></li>
                  <li><strong>Sunset</strong><span>18:47 IST</span></li>
                  <li><strong>Rahu Kalam</strong><span>07:30–09:00</span></li>
                </ul>
              </div>
            </div>

            <div className="box">
              <div className="box-title">
                ग्रह स्थिति <small>Planet Positions</small>
              </div>
              <div className="box-content">
                <ul className="temple-list">
                  {[
                    ["☉", "Sun", "Aries"],
                    ["☽", "Moon", "Taurus"],
                    ["♂", "Mars", "Gemini"],
                    ["☿", "Mercury", "Pisces Rx"],
                    ["♃", "Jupiter", "Gemini"],
                    ["♀", "Venus", "Pisces"],
                    ["♄", "Saturn", "Aquarius"],
                    ["☊", "Rahu", "Pisces"],
                    ["☋", "Ketu", "Virgo"],
                  ].map(([sym, planet, sign]) => (
                    <li key={planet}>
                      <span><span className="num">{sym}</span>{planet}</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="box">
              <div className="box-title">
                सेवाएं <small>Services</small>
              </div>
              <div className="box-content">
                <ul className="temple-list">
                  {[
                    ["/birth-chart/new", "Generate Kundli"],
                    ["/compatibility", "Kundli Milan"],
                    ["/panchang", "Daily Panchang"],
                    ["/planet-positions", "Planet Positions"],
                    ["/horoscopes", "All Horoscopes"],
                    ["/festivals", "Festival Calendar"],
                  ].map(([href, label]) => (
                    <li key={label as string}>
                      <a href={href as string}>
                        <span>{label as string}</span>
                        <span>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN */}
          <div className="center-col">

            <div className="feature-headline">
              Decode the Blueprint of Your Soul — Read Your Birth Chart
            </div>
            <div className="byline">
              <span className="author">Daivik Vani Editorial</span>
              <span className="location">Vedic Astrology</span>
              <span>{today}</span>
            </div>
            <div className="feature-image">
              <img
                src="https://storage.googleapis.com/adiyogiartsmedia/static/hero-ancient-ayodhya.png"
                alt="Vedic Birth Chart — Kundli"
              />
              <div className="caption">The Vedic birth chart (Kundli) — a cosmic map of your soul&apos;s journey</div>
            </div>
            <div className="article-body">
              <p>
                Your birth chart is a cosmic map drawn at the exact moment of your birth — a snapshot of the
                heavens that holds the key to understanding your nature, your purpose, and the lessons your
                soul chose before entering this life. In the Vedic tradition, this map is called the{" "}
                <em>Kundli</em> or <em>Janma Patrika</em>.
              </p>
              <p>
                Unlike Western astrology, Vedic Jyotish uses the sidereal zodiac aligned with actual star
                positions. The nine planets — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and
                Ketu — each govern distinct dimensions of your existence across the twelve houses of life.
              </p>
            </div>
            <div className="cta-wrap">
              <a href="/birth-chart/new" className="cta-button">Generate Your Kundli →</a>
            </div>

            {/* Weekly Horoscopes 2×2 */}
            <div id="featured" style={{ marginTop: "28px", borderTop: "1px solid #111", paddingTop: "20px" }}>
              <h2 className="section-title">
                राशिफल <small>Weekly Horoscopes</small>
              </h2>
              <div className="featured-grid first-white-band">
                {horoscopes.map((h) => (
                  <a
                    key={h.sign}
                    href={`/horoscopes/${h.sign.toLowerCase()}`}
                    className="featured-card"
                  >
                    <div
                      style={{
                        height: "60px",
                        background: "linear-gradient(135deg, #1c1408, #2a1a0a)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        borderBottom: "1px solid #111",
                      }}
                    >
                      {h.emoji}
                    </div>
                    <div className="featured-body">
                      <span className="featured-meta">{h.hi}</span>
                      <h4>{h.sign}</h4>
                      <p>{h.note}</p>
                      <span className="featured-link">Read Full →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">

            <div className="box">
              <div className="box-title">
                आज का राशिफल <small>Today</small>
              </div>
              <div className="box-content">
                <ul className="temple-list">
                  {zodiacSigns.map((z, i) => (
                    <li key={z.name}>
                      <a href={`/horoscopes/${z.name.toLowerCase()}`}>
                        <span>
                          <span className="num">{z.symbol}</span>
                          {z.name}
                        </span>
                        <span>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="editorial">
              <h4>दैविक वाणी</h4>
              <p>&ldquo;The stars impel, they do not compel. Your free will is the greatest planet of all.&rdquo;</p>
              <div className="author">— Maharishi Parashara</div>
            </div>

            <div className="box" style={{ marginTop: "18px" }}>
              <div className="box-title">
                कुंडली मिलान <small>Kundli Milan</small>
              </div>
              <div className="box-content">
                <p style={{ margin: "0 0 10px", fontSize: "14px", fontFamily: "'Hind', sans-serif", lineHeight: 1.6 }}>
                  Check Ashtakoot compatibility between two birth charts — the Vedic method used for marriage matching for over 5,000 years.
                </p>
                <a href="/compatibility" className="cta-button" style={{ display: "block", textAlign: "center" }}>
                  Check Compatibility →
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Navagraha Section (replacing Architectural Styles) ── */}
        <div className="sect-section" id="planets">
          <h2 className="section-title">
            नव ग्रह <small>Nine Planets · Navagraha</small>
          </h2>
          <div className="sect-grid" style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
            {planets.map((p) => (
              <div key={p.name} className="sect-card">
                <div
                  className="sect-img"
                  style={{
                    height: "80px",
                    background: "linear-gradient(135deg, #1c1408, #0d0d14)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Noto Serif Devanagari', serif",
                      fontSize: "26px",
                      color: "#ffd47a",
                      pointerEvents: "none",
                    }}
                  >
                    {p.hi}
                  </span>
                  <div className="sect-tag">{p.tag}</div>
                </div>
                <div className="sect-body">
                  <h4>{p.name}</h4>
                  <div className="sect-sanskrit">{p.hi}</div>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 12 Zodiac Signs Grid (replacing State Grid) ── */}
        <div className="state-strip" id="zodiac">
          <h2 className="state-strip-title">
            राशि चक्र <small>12 Zodiac Signs · Rashis</small>
          </h2>
          <div className="state-grid" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
            {zodiacSigns.map((z) => (
              <a key={z.name} href={`/horoscopes/${z.name.toLowerCase()}`} className="state-cell">
                <strong>
                  {z.symbol} {z.name}
                </strong>
                <span className="state-hi">{z.hi}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Vedic vs Western Dual Panel ── */}
        <div className="dual-panel" id="traditions">
          <div>
            <h2 className="panel-title">
              वैदिक ज्योतिष <small>Vedic · Jyotish</small>
            </h2>
            <p className="panel-intro">
              Sidereal zodiac, nakshatras, dashas, divisional charts — the 5,000-year-old science of light.
            </p>
            <ul className="deity-list">
              {[
                { name: "Kundli (Birth Chart)", region: "Foundation", desc: "Your natal chart decoded through the D1 lagna chart — the map of your entire life." },
                { name: "Dasha System", region: "Planetary Periods", desc: "Vimshottari dasha reveals life chapters — 120-year cycle of nine planets governing your fate." },
                { name: "Navamsa Chart (D9)", region: "Marriage & Soul", desc: "The 9th divisional chart for deeper destiny reading — marriage, dharma, and spiritual evolution." },
                { name: "Nakshatra", region: "27 Lunar Mansions", desc: "Moon sign decoded through its nakshatra — 27 stars carrying the deepest cosmic signatures." },
              ].map((item) => (
                <li key={item.name}>
                  <div
                    className="deity-thumb"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#1c1408",
                      fontSize: "26px",
                    }}
                  >
                    🪐
                  </div>
                  <div>
                    <div className="deity-region">{item.region}</div>
                    <h5>{item.name}</h5>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="panel-title">
              पाश्चात्य ज्योतिष <small>Western · Tropical</small>
            </h2>
            <p className="panel-intro">
              Tropical zodiac, aspects, transits, progressions — where psychology meets cosmos.
            </p>
            <ul className="deity-list">
              {[
                { name: "Sun Sign", region: "Core Identity", desc: "The sign the Sun occupied at birth — your essential nature and conscious expression of self." },
                { name: "Rising Sign", region: "Persona", desc: "The ascending sign at the moment of birth — how the world perceives you from the outside." },
                { name: "Aspects & Transits", region: "Timing", desc: "Planetary angles and current sky activating your chart — where life events are triggered." },
                { name: "Progressions", region: "Soul Evolution", desc: "Secondary progressions showing how your chart evolves symbolically over decades of life." },
              ].map((item) => (
                <li key={item.name}>
                  <div
                    className="deity-thumb"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#0d0d14",
                      fontSize: "26px",
                    }}
                  >
                    ⭐
                  </div>
                  <div>
                    <div className="deity-region">{item.region}</div>
                    <h5>{item.name}</h5>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Astrological Articles (replacing Bottom Grid) ── */}
        <div className="bottom-section" id="articles">
          <h2 className="section-title">
            ज्ञान भंडार <small>Astrological Insights</small>
          </h2>
          <div className="bottom-grid first-white-band">
            {articles.map((a) => (
              <a key={a.title} href="/blog" className="mini-article">
                <div
                  style={{
                    width: "130px",
                    height: "100px",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #1c1408, #0d0d14)",
                    border: "1px solid #111",
                    boxShadow: "2px 2px 0 rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                  }}
                >
                  🌟
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Hind', sans-serif",
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      color: "#b91c1c",
                      marginBottom: "4px",
                    }}
                  >
                    {a.cat}
                  </div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                  <span className="read-more">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Newspaper Footer ── */}
        <div className="footer">
          <div className="links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/pricing">Pricing</a>
            <a href="/festivals">Festivals</a>
            <a href="/privacy">Privacy</a>
          </div>
          <div>दैविक वाणी · Daivik Vani · Cosmic Intelligence, Ancient Wisdom · © 2026</div>
        </div>

      </div>
      </div>
    </>
  );
}
