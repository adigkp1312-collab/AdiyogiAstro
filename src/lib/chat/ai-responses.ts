interface AIResponseCategory {
  category: string;
  keywords: string[];
  responses: string[];
}

const AI_RESPONSES: AIResponseCategory[] = [
  {
    category: 'greeting',
    keywords: ['hello', 'hi', 'namaste', 'hey', 'start', 'greetings', 'good morning', 'good evening'],
    responses: [
      "Namaste! I'm here to guide you with Vedic astrology wisdom. What area of your life would you like insights on - love, career, health, or finances?",
      "Welcome! The celestial energies are strong today. How may I illuminate your path with Vedic astrology?",
      "Namaste and welcome! The stars have been expecting you. I sense a curiosity about your cosmic blueprint. What aspect of life shall we explore together?",
      "Greetings, dear seeker! I'm your Vedic astrology guide. Whether it's matters of the heart, career decisions, or spiritual growth, the planets hold answers for you.",
      "Welcome to your personal celestial consultation! The nakshatras are aligned to reveal powerful insights today. What question weighs on your mind?",
      "Namaste! The cosmic energies surrounding you are quite interesting today. I'm ready to decode the planetary messages for you. What would you like guidance on?",
      "Hello and welcome! As a Vedic astrology guide, I can offer insights on relationships, career, health, finances, and spiritual growth. Where shall we begin your cosmic journey?",
    ],
  },
  {
    category: 'love',
    keywords: ['love', 'relationship', 'marriage', 'partner', 'spouse', 'dating', 'romance', 'soulmate', 'wedding', 'compatibility'],
    responses: [
      "Venus, the planet of love, is currently transiting through a favorable position for {moonSign} natives. Your 7th house of partnerships shows promising energy. This is a good period to nurture existing bonds or open your heart to new connections.",
      "Looking at your cosmic profile, the 7th house lord indicates a phase of emotional depth in relationships. If you're in a partnership, heartfelt communication will strengthen your bond. Single? The nakshatras suggest someone significant may enter your life soon.",
      "The Shukra (Venus) influence on your chart suggests a transformative period for love. For {moonSign} natives, the current Dasha period brings opportunities to heal past relationship wounds and embrace deeper emotional connections.",
      "Your 5th house of romance is receiving beneficial aspects from Jupiter right now. This is an auspicious time for {moonSign} natives to express feelings openly. Trust the cosmic timing - what's meant for you will not pass you by.",
      "The Mangal Dosha energy in your chart is being soothed by a benefic Jupiter transit. Relationships require patience during this phase. Focus on understanding your partner's perspective - the 7th house energies support compromise and harmony.",
      "According to Vedic principles, the current planetary alignment favors deep emotional bonding for {moonSign} natives. The nakshatra energy suggests that sincerity and vulnerability will attract the right kind of love into your life.",
      "The Rahu-Ketu axis is influencing your relationship sector. This can bring karmic connections into your life. Pay attention to people who feel instantly familiar - they may carry lessons from past life connections according to Vedic astrology.",
    ],
  },
  {
    category: 'career',
    keywords: ['career', 'job', 'work', 'business', 'promotion', 'office', 'salary', 'professional', 'resign', 'interview'],
    responses: [
      "Saturn, the taskmaster planet, is casting a disciplined gaze on your 10th house of career. For {moonSign} natives, this is a period to demonstrate persistence. Hard work done now will yield recognition within the next few months.",
      "Your 10th house lord is in a strong position, indicating career momentum. The current Mahadasha supports professional growth for {moonSign} sign. Focus on skill development - the planetary energies favor those who invest in learning.",
      "The Budh (Mercury) transit is enhancing your communication skills at work. For {moonSign} natives, this is an excellent time for presentations, negotiations, and pitching ideas. Your intellectual abilities are cosmically amplified right now.",
      "Jupiter's benevolent aspect on your career house brings expansion opportunities. Whether it's a new role, a business venture, or a lateral move, the planets favor bold decisions for {moonSign} sign during this transit.",
      "The Shani (Saturn) influence on your professional sector demands discipline but promises lasting rewards. For {moonSign} natives, avoid shortcuts - build foundations methodically. The 10th house energy supports steady, sustainable growth over quick wins.",
      "Your Dasha period indicates a pivotal career phase. The Sun's transit through your professional sector brings visibility and authority. For {moonSign} natives, this is the time to step into leadership roles and claim your rightful position.",
      "The current planetary alignment suggests networking will play a crucial role in your career advancement. The 11th house of gains is activated - connections made now could lead to significant professional opportunities for {moonSign} sign.",
    ],
  },
  {
    category: 'health',
    keywords: ['health', 'illness', 'sick', 'body', 'wellness', 'medical', 'disease', 'fitness', 'energy', 'tired', 'stress', 'anxiety'],
    responses: [
      "The 6th house of health in your chart is under the watchful eye of beneficial planets. For {moonSign} natives, maintaining a regular routine is cosmically supported right now. Ayurvedic practices like morning pranayama would be especially beneficial.",
      "Mars energy is influencing your vitality sector, bringing both strength and a tendency to overexert. For {moonSign} natives, balance is key - channel the Mangal energy through moderate exercise rather than exhausting intensity.",
      "The Moon's transit suggests emotional well-being needs attention for {moonSign} natives. Vedic wisdom teaches that the mind and body are deeply connected. Meditation during Brahma Muhurta (pre-dawn) can restore your inner equilibrium.",
      "Your Ascendant lord is well-placed, indicating strong constitutional health. However, the current Rahu transit may bring restless energy for {moonSign} sign. Grounding practices like walking barefoot on earth and eating warm, nourishing foods are recommended.",
      "Saturn's aspect on your health house calls for preventive care. For {moonSign} natives, this is a good time to get routine check-ups and establish disciplined health habits. The planets favor those who take a proactive approach to wellness.",
      "The Ketu transit is influencing your 8th house of transformation, which can manifest as mysterious fatigue or spiritual awakening. For {moonSign} sign, listen to your body's subtle signals. Rest is not laziness - it's cosmic wisdom.",
      "Jupiter's protective gaze on your health sector is a positive sign for {moonSign} natives. Your natural immunity is strengthened during this period. Incorporate turmeric, tulsi, and other Sattvic foods to amplify this beneficial planetary support.",
    ],
  },
  {
    category: 'money',
    keywords: ['money', 'finance', 'wealth', 'income', 'investment', 'savings', 'debt', 'loan', 'property', 'profit', 'loss', 'rich'],
    responses: [
      "The 2nd house of wealth in your chart is receiving Jupiter's benevolent aspect - this is excellent for {moonSign} natives. Financial growth is favored, especially through traditional and conservative investment approaches. Avoid speculative ventures during this transit.",
      "Lakshmi's planetary representative, Venus, is activating your money sector. For {moonSign} sign, this period favors increasing income streams. The 11th house of gains shows promising energy - consider diversifying your financial portfolio.",
      "Saturn's influence on your 2nd house demands financial discipline for {moonSign} natives. While this may feel restrictive, it's actually building long-term wealth foundations. Create a structured savings plan - the planets will reward fiscal prudence.",
      "The Rahu transit through your wealth sector can bring unexpected financial opportunities for {moonSign} sign. However, Vedic wisdom cautions against greed. Evaluate opportunities carefully - not everything that glitters is gold during this planetary phase.",
      "Your Dasha period indicates a favorable time for financial accumulation. The 9th house of fortune is activated for {moonSign} natives, suggesting luck may play a role in your finances. Charitable donations (Daan) during this period will multiply your cosmic prosperity.",
      "Mercury's strong position in your chart enhances financial intelligence for {moonSign} sign. This is an excellent time for budgeting, accounting, and strategic financial planning. Business negotiations are cosmically favored during this transit.",
      "The Jupiter-Saturn alignment is creating a balanced financial energy for {moonSign} natives. It's a period to consolidate existing wealth rather than make aggressive new investments. Pay off debts and strengthen your financial foundation - abundance will follow.",
    ],
  },
  {
    category: 'general',
    keywords: [],
    responses: [
      "The cosmic energies surrounding you are quite dynamic right now. For {moonSign} sign, the current planetary alignment encourages self-reflection and personal growth. Trust the process - the universe is guiding you toward your highest potential.",
      "According to Vedic astrology, the current transit of planets through your chart creates a period of transformation. Embrace change rather than resisting it. The nakshatras are weaving a beautiful pattern in your cosmic story.",
      "The planetary alignment today brings mixed but ultimately positive energies for {moonSign} natives. The key is to stay centered and grounded. When the cosmic winds shift, those who maintain inner balance navigate most gracefully.",
      "Your birth nakshatra is receiving special cosmic attention during this period. The Dasha you're currently running suggests a chapter of important life lessons. Every experience, whether pleasant or challenging, is contributing to your soul's evolution.",
      "The Guru (Jupiter) is casting a protective and expansive gaze on your chart. For {moonSign} sign, this is a period of wisdom and growth. Seek knowledge, explore new philosophies, and trust that the universe has a grand plan for you.",
      "The cosmic blueprint of your chart reveals a fascinating interplay of planetary energies right now. The current transit supports mindfulness and conscious living. Small, intentional actions will create ripple effects of positive change in your life.",
      "Vedic astrology teaches that we are all connected to the cosmic dance of planets. Your current planetary period is one of preparation. Like a seed planted in fertile soil, your efforts may not show immediate results but are building toward something magnificent.",
      "The Panchang for this period indicates auspicious energy for new beginnings. Whether it's a project, habit, or relationship, the stars support fresh starts for {moonSign} natives. Trust your intuition - it's cosmically enhanced right now.",
      "The interplay between your Rashi (moon sign) and the current transits creates a unique energy signature. For {moonSign} sign, this is a time to honor both your ambitions and your need for rest. Balance between action and reflection is the cosmic prescription.",
      "According to the Vedic calendar, we are in a powerful nakshatra period. The celestial energies favor introspection, spiritual practices, and connecting with your deeper purpose. What area of life feels most in need of cosmic guidance right now?",
    ],
  },
];

/**
 * Pick an AI response based on the user's message content.
 * Matches keywords to categories and selects a random response.
 * Optionally interpolates the user's moon sign into the response.
 */
export function pickAIResponse(userMessage: string, moonSign?: string | null): string {
  const lowerMessage = userMessage.toLowerCase();

  // Find the best matching category by counting keyword hits
  let bestCategory: AIResponseCategory | null = null;
  let bestMatchCount = 0;

  for (const category of AI_RESPONSES) {
    if (category.keywords.length === 0) continue; // Skip general (fallback)

    let matchCount = 0;
    for (const keyword of category.keywords) {
      if (lowerMessage.includes(keyword)) {
        matchCount++;
      }
    }

    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestCategory = category;
    }
  }

  // Fall back to general if no keyword matched
  if (!bestCategory) {
    bestCategory = AI_RESPONSES.find((c) => c.category === 'general')!;
  }

  // Pick a random response from the matched category
  const responses = bestCategory.responses;
  const randomIndex = Math.floor(Math.random() * responses.length);
  let response = responses[randomIndex];

  // Interpolate moon sign if available, otherwise use a generic term
  const signLabel = moonSign || 'your';
  response = response.replace(/\{moonSign\}/g, signLabel);

  return response;
}

/**
 * Pick a random greeting response for starting a new chat session.
 */
export function getGreetingResponse(): string {
  const greetingCategory = AI_RESPONSES.find((c) => c.category === 'greeting')!;
  const responses = greetingCategory.responses;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}
