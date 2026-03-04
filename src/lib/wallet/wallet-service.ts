import { getDb } from '@/lib/db';

interface WalletUser {
  wallet_balance: number;
}

interface WalletTransaction {
  id: number;
  user_id: number;
  type: 'credit' | 'debit';
  amount: number;
  balance_after: number;
  description: string;
  reference_id: string | null;
  created_at: string;
}

export function getBalance(userId: number): number {
  const db = getDb();
  const user = db.prepare('SELECT wallet_balance FROM users WHERE id = ?').get(userId) as WalletUser | undefined;
  if (!user) {
    throw new Error('User not found');
  }
  return user.wallet_balance;
}

export function creditWallet(
  userId: number,
  amount: number,
  description: string,
  referenceId?: string
): { newBalance: number } {
  const db = getDb();
  const txn = db.transaction(() => {
    const user = db.prepare('SELECT wallet_balance FROM users WHERE id = ?').get(userId) as WalletUser | undefined;
    if (!user) {
      throw new Error('User not found');
    }

    const newBalance = user.wallet_balance + amount;

    db.prepare(`UPDATE users SET wallet_balance = ?, updated_at = datetime('now') WHERE id = ?`).run(newBalance, userId);

    db.prepare(
      'INSERT INTO wallet_transactions (user_id, type, amount, balance_after, description, reference_id) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(userId, 'credit', amount, newBalance, description, referenceId || null);

    return { newBalance };
  });

  return txn();
}

export function debitWallet(
  userId: number,
  amount: number,
  description: string,
  referenceId?: string
): { newBalance: number } | { error: string } {
  const db = getDb();
  const txn = db.transaction(() => {
    const user = db.prepare('SELECT wallet_balance FROM users WHERE id = ?').get(userId) as WalletUser | undefined;
    if (!user) {
      return { error: 'User not found' };
    }

    if (user.wallet_balance < amount) {
      return { error: 'Insufficient balance' };
    }

    const newBalance = user.wallet_balance - amount;

    db.prepare(`UPDATE users SET wallet_balance = ?, updated_at = datetime('now') WHERE id = ?`).run(newBalance, userId);

    db.prepare(
      'INSERT INTO wallet_transactions (user_id, type, amount, balance_after, description, reference_id) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(userId, 'debit', amount, newBalance, description, referenceId || null);

    return { newBalance };
  });

  return txn();
}

export function getTransactions(
  userId: number,
  page: number = 1,
  limit: number = 20
): { transactions: WalletTransaction[]; total: number; page: number } {
  const db = getDb();
  const offset = (page - 1) * limit;

  const total = db.prepare(
    'SELECT COUNT(*) as count FROM wallet_transactions WHERE user_id = ?'
  ).get(userId) as { count: number };

  const transactions = db.prepare(
    'SELECT * FROM wallet_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).all(userId, limit, offset) as WalletTransaction[];

  return {
    transactions,
    total: total.count,
    page,
  };
}
