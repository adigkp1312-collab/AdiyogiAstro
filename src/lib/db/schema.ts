import Database from 'better-sqlite3';

export function initializeSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      name TEXT,
      email TEXT,
      dob TEXT,
      tob TEXT,
      pob_city TEXT,
      pob_lat REAL,
      pob_lng REAL,
      moon_sign TEXT,
      current_dasha TEXT,
      profile_pic_url TEXT,
      wallet_balance REAL DEFAULT 0,
      language_pref TEXT DEFAULT 'en',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS otp_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      is_used INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS astrologers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      photo_url TEXT,
      specializations TEXT,
      experience_years INTEGER,
      languages TEXT,
      total_orders INTEGER DEFAULT 0,
      total_chats INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      price_per_min REAL,
      price_per_chat REAL,
      discount_percent INTEGER DEFAULT 0,
      is_ai INTEGER DEFAULT 0,
      is_verified INTEGER DEFAULT 0,
      is_available INTEGER DEFAULT 1,
      bio TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      astrologer_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('chat', 'call')),
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','completed','cancelled')),
      duration_minutes REAL,
      amount REAL,
      created_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (astrologer_id) REFERENCES astrologers(id)
    );

    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
      amount REAL NOT NULL,
      balance_after REAL NOT NULL,
      description TEXT,
      reference_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT,
      value REAL,
      image_url TEXT,
      is_active INTEGER DEFAULT 1,
      starts_at TEXT,
      ends_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      statement TEXT NOT NULL,
      response TEXT CHECK (response IN ('agree', 'maybe', 'disagree')),
      category TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'astrologer', 'system')),
      sender_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );

    CREATE TABLE IF NOT EXISTS payment_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      bonus_amount REAL DEFAULT 0,
      razorpay_order_id TEXT,
      razorpay_payment_id TEXT,
      razorpay_signature TEXT,
      status TEXT DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed')),
      created_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS promo_redemptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      promotion_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (promotion_id) REFERENCES promotions(id),
      UNIQUE(user_id, promotion_id)
    );

    CREATE TABLE IF NOT EXISTS order_feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_messages_order_id ON messages(order_id, id);
    CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(order_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_wallet_txn_user ON wallet_transactions(user_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, status);
    CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON payment_orders(user_id, status);
  `);

  // Add columns to existing tables (idempotent - wrapped in try/catch)
  const alterStatements = [
    `ALTER TABLE users ADD COLUMN welcome_bonus_claimed INTEGER DEFAULT 0`,
    `ALTER TABLE promotions ADD COLUMN promo_code TEXT`,
  ];

  for (const stmt of alterStatements) {
    try {
      db.exec(stmt);
    } catch {
      // Column already exists, ignore
    }
  }
}
