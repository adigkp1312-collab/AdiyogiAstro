import Database from 'better-sqlite3';

export function seedDatabase(db: Database.Database): void {
  const count = db.prepare('SELECT COUNT(*) as count FROM astrologers').get() as { count: number };

  if (count.count > 0) return; // Already seeded

  const insertAstrologer = db.prepare(`
    INSERT INTO astrologers (name, photo_url, specializations, experience_years, languages, total_orders, total_chats, rating, price_per_min, price_per_chat, discount_percent, is_ai, is_verified, is_available, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const astrologers = [
    {
      name: 'Bhavisha Barot',
      photo_url: null,
      specializations: JSON.stringify(['Vedic']),
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
      bio: 'Experienced Vedic astrologer specializing in relationship and career guidance with 3 years of practice.'
    },
    {
      name: 'AI Riya',
      photo_url: null,
      specializations: JSON.stringify(['Vedic', 'AI Astrology']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English']),
      total_orders: 0,
      total_chats: 25600,
      rating: 4.9,
      price_per_min: null,
      price_per_chat: 50,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'AI-powered astrologer providing instant, personalized Vedic astrology insights 24/7. Elite Astrologer designation.'
    },
    {
      name: 'Ashok Shukla',
      photo_url: null,
      specializations: JSON.stringify(['Vedic', 'Prashna']),
      experience_years: 28,
      languages: JSON.stringify(['Hindi']),
      total_orders: 463,
      total_chats: 890,
      rating: 4.7,
      price_per_min: 31,
      price_per_chat: null,
      discount_percent: 59,
      is_ai: 0,
      is_verified: 1,
      is_available: 1,
      bio: 'Senior Vedic and Prashna astrologer with 28 years of experience. Expert in life predictions and remedies.'
    },
    {
      name: 'Divyakant Akruvala',
      photo_url: null,
      specializations: JSON.stringify(['Vedic']),
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
      bio: 'Dedicated Vedic astrologer with 20 years of experience providing guidance on all aspects of life.'
    },
    {
      name: 'AI Kiran',
      photo_url: null,
      specializations: JSON.stringify(['Vedic', 'Numerology', 'AI Astrology']),
      experience_years: null,
      languages: JSON.stringify(['Hindi', 'English', 'Tamil']),
      total_orders: 0,
      total_chats: 18200,
      rating: 4.8,
      price_per_min: null,
      price_per_chat: 50,
      discount_percent: 100,
      is_ai: 1,
      is_verified: 1,
      is_available: 1,
      bio: 'Analytical AI astrologer combining Vedic wisdom with numerology. Available round the clock for instant guidance.'
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
