"use client";

import * as React from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "Namaste! 🙏 I'm DISHA, your astrology assistant. Ask me about horoscopes, zodiac signs, kundli matching, panchang, birth charts, or any astrology topic!",
};

const QUICK_QUESTIONS = [
  "What is Kundli Matching?",
  "Tell me about today's Panchang",
  "How is a birth chart calculated?",
  "What are the 12 zodiac signs?",
];

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ["kundli", "matching", "compatibility", "gun milan", "kundali"],
    answer:
      "Kundli Matching (Gun Milan) is a Vedic astrology practice that compares two birth charts to assess compatibility for marriage. It examines 8 categories called Ashtakoot — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi — scoring up to 36 points. A score of 18+ is considered acceptable. You can try our free Kundli Matching tool from the Compatibility page! 💑",
  },
  {
    keywords: ["panchang", "panchangam", "tithi", "nakshatra", "today"],
    answer:
      "Panchang is the Hindu calendar system based on five elements (Panch + Ang): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (luni-solar combination), and Karana (half-tithi). It helps determine auspicious timings (Muhurat) for important activities. Check our Panchang page for today's details! 📅",
  },
  {
    keywords: ["birth chart", "kundli", "natal chart", "janam kundali", "horoscope chart"],
    answer:
      "A birth chart (Janam Kundali) is a map of the sky at the exact moment and location of your birth. It shows the positions of the Sun, Moon, and planets across 12 houses and zodiac signs. It reveals your personality, strengths, challenges, career path, and relationships. Create your free birth chart on our Birth Chart page! 🌟",
  },
  {
    keywords: ["zodiac", "signs", "rashi", "12 signs", "sun sign"],
    answer:
      "The 12 zodiac signs (Rashis) are: ♈ Aries (Mesha), ♉ Taurus (Vrishabha), ♊ Gemini (Mithuna), ♋ Cancer (Karka), ♌ Leo (Simha), ♍ Virgo (Kanya), ♎ Libra (Tula), ♏ Scorpio (Vrishchika), ♐ Sagittarius (Dhanu), ♑ Capricorn (Makara), ♒ Aquarius (Kumbha), ♓ Pisces (Meena). Each sign has unique traits, elements (Fire, Earth, Air, Water), and ruling planets.",
  },
  {
    keywords: ["aries", "mesha", "mesh"],
    answer:
      "♈ Aries (Mesha) — Mar 21 to Apr 19. Element: Fire. Ruler: Mars. Aries are bold, ambitious, and energetic leaders. They're courageous and enthusiastic but can be impulsive. Lucky color: Red. Compatible with: Leo, Sagittarius, Gemini.",
  },
  {
    keywords: ["taurus", "vrishabha", "vrish"],
    answer:
      "♉ Taurus (Vrishabha) — Apr 20 to May 20. Element: Earth. Ruler: Venus. Taurus individuals are reliable, patient, and devoted. They love luxury and comfort but can be stubborn. Lucky color: Green. Compatible with: Virgo, Capricorn, Cancer.",
  },
  {
    keywords: ["gemini", "mithuna", "mithun"],
    answer:
      "♊ Gemini (Mithuna) — May 21 to Jun 20. Element: Air. Ruler: Mercury. Geminis are curious, versatile, and excellent communicators. They're witty and adaptable but can be indecisive. Lucky color: Yellow. Compatible with: Libra, Aquarius, Aries.",
  },
  {
    keywords: ["cancer", "karka", "kark"],
    answer:
      "♋ Cancer (Karka) — Jun 21 to Jul 22. Element: Water. Ruler: Moon. Cancerians are nurturing, intuitive, and deeply emotional. They value family and home but can be moody. Lucky color: White/Silver. Compatible with: Scorpio, Pisces, Taurus.",
  },
  {
    keywords: ["leo", "simha", "singh"],
    answer:
      "♌ Leo (Simha) — Jul 23 to Aug 22. Element: Fire. Ruler: Sun. Leos are confident, creative, and natural leaders. They're generous and warm-hearted but can be arrogant. Lucky color: Gold/Orange. Compatible with: Aries, Sagittarius, Gemini.",
  },
  {
    keywords: ["virgo", "kanya"],
    answer:
      "♍ Virgo (Kanya) — Aug 23 to Sep 22. Element: Earth. Ruler: Mercury. Virgos are analytical, practical, and detail-oriented. They're hardworking and helpful but can be overly critical. Lucky color: Green/Brown. Compatible with: Taurus, Capricorn, Cancer.",
  },
  {
    keywords: ["libra", "tula"],
    answer:
      "♎ Libra (Tula) — Sep 23 to Oct 22. Element: Air. Ruler: Venus. Librans are diplomatic, fair-minded, and social. They love harmony and beauty but can be indecisive. Lucky color: Pink/Blue. Compatible with: Gemini, Aquarius, Leo.",
  },
  {
    keywords: ["scorpio", "vrishchika", "vrishchik"],
    answer:
      "♏ Scorpio (Vrishchika) — Oct 23 to Nov 21. Element: Water. Ruler: Mars/Pluto. Scorpios are passionate, resourceful, and determined. They're deeply intuitive but can be secretive. Lucky color: Dark Red/Maroon. Compatible with: Cancer, Pisces, Virgo.",
  },
  {
    keywords: ["sagittarius", "dhanu"],
    answer:
      "♐ Sagittarius (Dhanu) — Nov 22 to Dec 21. Element: Fire. Ruler: Jupiter. Sagittarians are adventurous, optimistic, and philosophical. They love freedom and travel but can be restless. Lucky color: Purple. Compatible with: Aries, Leo, Aquarius.",
  },
  {
    keywords: ["capricorn", "makara", "makar"],
    answer:
      "♑ Capricorn (Makara) — Dec 22 to Jan 19. Element: Earth. Ruler: Saturn. Capricorns are disciplined, ambitious, and responsible. They're great planners but can be pessimistic. Lucky color: Black/Dark Brown. Compatible with: Taurus, Virgo, Scorpio.",
  },
  {
    keywords: ["aquarius", "kumbha", "kumbh"],
    answer:
      "♒ Aquarius (Kumbha) — Jan 20 to Feb 18. Element: Air. Ruler: Saturn/Uranus. Aquarians are innovative, humanitarian, and independent. They're original thinkers but can be emotionally detached. Lucky color: Blue. Compatible with: Gemini, Libra, Sagittarius.",
  },
  {
    keywords: ["pisces", "meena", "meen"],
    answer:
      "♓ Pisces (Meena) — Feb 19 to Mar 20. Element: Water. Ruler: Jupiter/Neptune. Pisceans are compassionate, artistic, and intuitive. They're deeply empathetic but can be escapist. Lucky color: Sea Green. Compatible with: Cancer, Scorpio, Taurus.",
  },
  {
    keywords: ["planet", "graha", "navagraha", "planets"],
    answer:
      "In Vedic astrology, the 9 Grahas (Navagraha) are: ☀️ Surya (Sun) — soul & authority, 🌙 Chandra (Moon) — mind & emotions, ♂️ Mangal (Mars) — energy & courage, ☿ Budh (Mercury) — intellect & communication, ♃ Guru/Brihaspati (Jupiter) — wisdom & expansion, ♀ Shukra (Venus) — love & luxury, ♄ Shani (Saturn) — discipline & karma, 🌑 Rahu — ambition & illusion, 🌘 Ketu — spirituality & detachment.",
  },
  {
    keywords: ["house", "bhava", "houses", "12 houses"],
    answer:
      "The 12 houses (Bhavas) in astrology represent different life areas: 1st — Self/Personality, 2nd — Wealth/Family, 3rd — Siblings/Courage, 4th — Home/Mother, 5th — Children/Education, 6th — Health/Enemies, 7th — Marriage/Partnership, 8th — Longevity/Transformation, 9th — Luck/Dharma, 10th — Career/Status, 11th — Gains/Friends, 12th — Losses/Spirituality.",
  },
  {
    keywords: ["manglik", "mangal dosha", "kuja dosha"],
    answer:
      "Manglik Dosha (Mangal Dosha) occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house of a birth chart. It's believed to cause challenges in marriage. Remedies include marrying another Manglik, performing Kumbh Vivah, chanting Mangal mantras, or wearing a coral gemstone. Many astrologers consider it nullified after age 28.",
  },
  {
    keywords: ["retrograde", "vakri"],
    answer:
      "Retrograde (Vakri) is when a planet appears to move backward in the sky from Earth's perspective. Mercury retrograde is the most famous — affecting communication, travel, and technology. During retrograde, planets' energies turn inward. It's a time for reflection, review, and revisiting past matters rather than starting new ventures.",
  },
  {
    keywords: ["ascendant", "lagna", "rising sign"],
    answer:
      "The Ascendant (Lagna/Rising Sign) is the zodiac sign rising on the eastern horizon at the time of your birth. It determines your 1st house and shapes your outward personality, physical appearance, and how others perceive you. While your Sun sign is your core identity, your Ascendant is the mask you wear. It's crucial for accurate birth chart analysis.",
  },
  {
    keywords: ["transit", "gochar"],
    answer:
      "Transits (Gochar) are the current movements of planets through the zodiac. When transiting planets form aspects with your birth chart positions, they trigger events and shifts in your life. Major transits like Saturn's Sade Sati (7.5 year transit) or Jupiter's transit through key houses can bring significant life changes. Check our Transits page for current planetary positions! 🪐",
  },
  {
    keywords: ["element", "fire", "earth", "air", "water", "tattva"],
    answer:
      "The four elements in astrology: 🔥 Fire (Aries, Leo, Sagittarius) — passionate, energetic, bold. 🌍 Earth (Taurus, Virgo, Capricorn) — practical, grounded, reliable. 💨 Air (Gemini, Libra, Aquarius) — intellectual, social, communicative. 💧 Water (Cancer, Scorpio, Pisces) — emotional, intuitive, sensitive. Compatible pairs: Fire+Air and Earth+Water.",
  },
  {
    keywords: ["dasha", "mahadasha", "period"],
    answer:
      "Dasha is the planetary period system in Vedic astrology. The most common is Vimshottari Dasha, a 120-year cycle where each planet rules a specific period: Ketu (7 yrs), Venus (20 yrs), Sun (6 yrs), Moon (10 yrs), Mars (7 yrs), Rahu (18 yrs), Jupiter (16 yrs), Saturn (19 yrs), Mercury (17 yrs). The ruling planet's themes dominate that life period.",
  },
  {
    keywords: ["remedies", "upay", "remedy"],
    answer:
      "Astrological remedies (Upay) help balance planetary energies: 💎 Gemstones — wear specific stones for benefic planets. 🕉️ Mantras — chant planetary mantras regularly. 🙏 Puja — perform specific rituals. 🎁 Charity — donate items associated with the planet. 🍽️ Fasting — observe fasts on planetary days. ⚡ Yantra — use sacred geometric diagrams. Always consult a qualified astrologer before applying remedies.",
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    answer:
      "Namaste! 🙏 Welcome to DISHA — your astrology guide. I can help you with zodiac signs, birth charts, kundli matching, panchang, planetary transits, and much more. What would you like to know about?",
  },
  {
    keywords: ["thank", "thanks", "dhanyavaad", "shukriya"],
    answer:
      "You're welcome! 🙏 Feel free to ask me anything else about astrology. I'm always here to help guide your cosmic journey! ✨",
  },
  {
    keywords: ["help", "what can you do", "features", "services"],
    answer:
      "Here's what I can help you with:\n\n🌟 Zodiac sign information\n💑 Kundli Matching guidance\n📅 Panchang explanations\n🪐 Planetary transits\n🏠 Houses & Bhavas\n📊 Birth chart basics\n🔮 Dashas & periods\n💎 Remedies & gemstones\n♈ Individual sign traits\n\nJust ask me anything about astrology!",
  },
];

function findAnswer(query: string): string {
  const lowerQuery = query.toLowerCase().trim();

  // Score each knowledge entry
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        score += keyword.length; // longer keyword matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return "I'm not sure about that one! 🤔 I can help with zodiac signs, birth charts, kundli matching, panchang, planetary transits, houses, dashas, and remedies. Try asking me about one of these topics, or type \"help\" to see everything I can assist with!";
}

export function DishaChatbot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([GREETING]);
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: findAnswer(query),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-2xl sm:right-6">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">DISHA</h3>
                <p className="text-[10px] text-orange-100">Astrology Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-orange-50/30 px-4 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "bot"
                      ? "bg-[#FF6600] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="size-4" />
                  ) : (
                    <User className="size-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "rounded-tl-sm bg-white text-gray-700 shadow-sm ring-1 ring-gray-100"
                      : "rounded-tr-sm bg-[#FF6600] text-white"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions (only show at start) */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-orange-100 bg-orange-50/50 px-3 py-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[11px] font-medium text-[#FF6600] transition-colors hover:bg-[#FF6600] hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-orange-100 bg-white px-3 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask DISHA anything..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6600] focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="flex size-9 items-center justify-center rounded-full bg-[#FF6600] text-white transition-colors hover:bg-[#e65c00] disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6600] to-[#FF8C00] px-4 py-3 text-white shadow-lg shadow-orange-300/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-300/50 sm:right-6"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <>
            <MessageCircle className="size-5" />
            <span className="text-sm font-bold">DISHA</span>
          </>
        )}
      </button>
    </>
  );
}
