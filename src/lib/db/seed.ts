import Database from 'better-sqlite3';

export function seedDatabase(db: Database.Database): void {
  const count = db.prepare('SELECT COUNT(*) as count FROM astrologers').get() as { count: number };

  if (count.count > 0) return; // Already seeded

  const insertAstrologer = db.prepare(`
    INSERT INTO astrologers (name, photo_url, specializations, experience_years, languages, total_orders, total_chats, rating, price_per_min, price_per_chat, discount_percent, is_ai, is_verified, is_available, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const astrologers = [
    // ── AI Jyotish Astrologers ──
    {
      name: 'AI Jyotishi Acharya Devvrat',
      photo_url: null,
      specializations: JSON.stringify(['Vedic Jyotish', 'Kundli Analysis', 'Graha Dasha']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Sanskrit']),
      total_orders: 0,
      total_chats: 45200,
      rating: 4.9,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'Param Jyotishi — AI Vedic astrologer trained on ancient Brihat Parashara Hora Shastra. Specializes in Kundli reading, Graha Dasha predictions, and life-path guidance. Available 24/7.'
    },
    {
      name: 'AI Pandit Shubhankar Joshi',
      photo_url: null,
      specializations: JSON.stringify(['Prashna Kundli', 'Muhurat', 'Vastu Shastra']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Marathi']),
      total_orders: 0,
      total_chats: 32800,
      rating: 4.8,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Jyotish Pandit specializing in Prashna Kundli (horary astrology), Shubh Muhurat selection, and Vastu guidance. Ask any question and get instant cosmic clarity.'
    },
    {
      name: 'AI Guru Nakshatra Devi',
      photo_url: null,
      specializations: JSON.stringify(['Nakshatra Vidya', 'Love & Marriage', 'Mangal Dosh']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Bengali']),
      total_orders: 0,
      total_chats: 38500,
      rating: 4.9,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Nakshatra expert & relationship Jyotishi. Deep insights into love compatibility, Mangal Dosh analysis, Guna Milan for marriage, and emotional well-being through the stars.'
    },
    {
      name: 'AI Acharya Brihaspati Sharma',
      photo_url: null,
      specializations: JSON.stringify(['Career & Wealth', 'Shani Sade Sati', 'Gemstone Remedies']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Gujarati']),
      total_orders: 0,
      total_chats: 29400,
      rating: 4.8,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Acharya for career growth, Dhan Yoga analysis, and wealth predictions. Expert in Shani Sade Sati remedies, Ratna (gemstone) recommendations, and professional guidance.'
    },
    {
      name: 'AI Jyotishacharya Meera Trivedi',
      photo_url: null,
      specializations: JSON.stringify(['Numerology', 'Rashi Phal', 'Health Astrology']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Tamil']),
      total_orders: 0,
      total_chats: 22100,
      rating: 4.7,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Jyotishacharya combining Vedic Numerology with Rashi Phal. Specializes in health predictions through medical astrology, lucky numbers, and daily/weekly forecasts.'
    },
    {
      name: 'AI Pandit Surya Narayan Mishra',
      photo_url: null,
      specializations: JSON.stringify(['Lal Kitab', 'Pitra Dosh', 'Yantra & Mantra']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Punjabi']),
      total_orders: 0,
      total_chats: 19700,
      rating: 4.7,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Lal Kitab specialist with deep knowledge of ancestral (Pitra) Dosh remedies, Yantra suggestions, and Mantra guidance. Practical, affordable remedies for everyday problems.'
    },
    {
      name: 'AI Devi Chandrika Shastri',
      photo_url: null,
      specializations: JSON.stringify(['KP Jyotish', 'Transit Predictions', 'Annual Horoscope']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Kannada']),
      total_orders: 0,
      total_chats: 15600,
      rating: 4.8,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI KP (Krishnamurti Paddhati) Jyotish expert. Precise timing predictions using sub-lord theory. Specializes in Gochar (transit) effects and Varshphal (annual horoscope) analysis.'
    },
    {
      name: 'AI Acharya Vidya Sagar Pandey',
      photo_url: null,
      specializations: JSON.stringify(['Vedic Jyotish', 'Kal Sarpa Dosh', 'Education & Exams']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Telugu']),
      total_orders: 0,
      total_chats: 17300,
      rating: 4.7,
      price_per_min: null,
      price_per_chat: 0,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI Acharya for students and young professionals. Expert in education-related predictions, exam timing, Kal Sarpa Dosh analysis, and academic success through Jyotish wisdom.'
    },
    // ── Human Astrologers ──
    {
      name: 'Pandit Raghunath Bhatt',
      photo_url: null,
      specializations: JSON.stringify(['Vedic Jyotish', 'Prashna']),
      experience_years: 28,
      languages: JSON.stringify(['Hindi', 'Sanskrit']),
      total_orders: 463,
      total_chats: 890,
      rating: 4.7,
      price_per_min: 31,
      price_per_chat: null,
      discount_percent: 59,
      is_ai: 0,
      is_verified: 1,
      is_available: 1,
      bio: 'Senior Vedic and Prashna Jyotishi with 28 years of experience. Expert in life predictions, Graha Shanti remedies, and spiritual guidance.'
    },
    {
      name: 'Jyotishi Bhavisha Barot',
      photo_url: null,
      specializations: JSON.stringify(['Vedic Jyotish', 'Kundli Matching']),
      experience_years: 3,
      languages: JSON.stringify(['Hindi', 'Gujarati']),
      total_orders: 574,
      total_chats: 1200,
      rating: 4.8,
      price_per_min: 10,
      price_per_chat: null,
      discount_percent: 0,
      is_ai: 0,
      is_verified: 1,
      is_available: 1,
      bio: 'Young and dynamic Vedic Jyotishi specializing in relationship guidance and Kundli matching with 3 years of dedicated practice.'
    },
    {
      name: 'Acharya Divyakant Trivedi',
      photo_url: null,
      specializations: JSON.stringify(['Vedic Jyotish', 'Vastu']),
      experience_years: 20,
      languages: JSON.stringify(['Hindi', 'English']),
      total_orders: 309,
      total_chats: 650,
      rating: 4.6,
      price_per_min: 36,
      price_per_chat: null,
      discount_percent: 10,
      is_ai: 0,
      is_verified: 1,
      is_available: 0,
      bio: 'Dedicated Vedic Jyotishi and Vastu consultant with 20 years of experience providing holistic guidance for home, career, and personal life.'
    },
  ];

  const insertMany = db.transaction(() => {
    for (const a of astrologers) {
      insertAstrologer.run(
        a.name, a.photo_url, a.specializations, a.experience_years,
        a.languages, a.total_orders, a.total_chats, a.rating,
        a.price_per_min, a.price_per_chat, a.discount_percent,
        a.is_ai, a.is_verified, a.is_available, a.bio
      );
    }
  });
  insertMany();

  // Seed promotions
  const insertPromo = db.prepare(`
    INSERT INTO promotions (title, description, type, value, is_active, promo_code)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertPromo.run(
    'First Recharge Bonus',
    'Get 150% bonus on your first recharge! Top up your wallet and get extra credits.',
    'recharge_bonus',
    150,
    1,
    'FIRST150'
  );

  insertPromo.run(
    'Welcome Gift',
    'New user special: Get Rs.50 free wallet credits!',
    'welcome_gift',
    50,
    1,
    'WELCOME50'
  );

  insertPromo.run(
    'Festive Bonus',
    'Celebrate with Rs.100 bonus credits on any recharge!',
    'bonus_credits',
    100,
    1,
    'FESTIVE100'
  );
}
