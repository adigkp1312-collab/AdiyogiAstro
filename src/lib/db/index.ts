import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { initializeSchema } from './schema';
import { seedDatabase } from './seed';

let db: Database.Database | null = null;
let isInitialized = false;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'nakshatra.db');
    const dir = path.dirname(dbPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    if (!isInitialized) {
      initializeSchema(db);
      seedDatabase(db);
      isInitialized = true;
    }
  }
  return db;
}
