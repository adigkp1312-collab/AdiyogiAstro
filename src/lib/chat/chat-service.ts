import { getDb } from '@/lib/db';
import { Astrologer, Order, Message } from '@/types';
import { pickAIResponse, getGreetingResponse } from './ai-responses';
import { debitWallet } from '@/lib/wallet/wallet-service';
import { MIN_CHAT_BALANCE } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseAstrologer(row: Record<string, unknown>): Astrologer {
  return {
    ...(row as unknown as Astrologer),
    specializations: JSON.parse((row.specializations as string) || '[]'),
    languages: JSON.parse((row.languages as string) || '[]'),
    is_ai: Boolean(row.is_ai),
    is_verified: Boolean(row.is_verified),
    is_available: Boolean(row.is_available),
  };
}

/**
 * Return a random integer between min and max (inclusive).
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---------------------------------------------------------------------------
// Astrologer queries
// ---------------------------------------------------------------------------

export function getAstrologer(id: number): Astrologer | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM astrologers WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return parseAstrologer(row);
}

export function getAstrologerList(filter?: 'all' | 'ai' | 'human'): Astrologer[] {
  const db = getDb();

  let sql = 'SELECT * FROM astrologers';
  const params: unknown[] = [];

  if (filter === 'ai') {
    sql += ' WHERE is_ai = 1';
  } else if (filter === 'human') {
    sql += ' WHERE is_ai = 0';
  }

  sql += ' ORDER BY rating DESC, total_chats DESC';

  const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
  return rows.map(parseAstrologer);
}

// ---------------------------------------------------------------------------
// Chat session lifecycle
// ---------------------------------------------------------------------------

export function createChatSession(
  userId: number,
  astrologerId: number
): { order: Order } | { error: string } {
  const db = getDb();

  // 1. Validate astrologer
  const astrologer = getAstrologer(astrologerId);
  if (!astrologer) {
    return { error: 'Astrologer not found' };
  }
  if (!astrologer.is_available) {
    return { error: 'Astrologer is currently unavailable' };
  }

  // 2. For paid (non-free) chats, verify wallet balance
  const isFreeChat = astrologer.is_ai && astrologer.discount_percent === 100;
  if (!isFreeChat) {
    const user = db.prepare('SELECT wallet_balance FROM users WHERE id = ?').get(userId) as
      | { wallet_balance: number }
      | undefined;
    if (!user) {
      return { error: 'User not found' };
    }
    if (user.wallet_balance < MIN_CHAT_BALANCE) {
      return { error: 'Insufficient wallet balance. Please recharge to start a chat.' };
    }
  }

  // 3. Create order
  const result = db
    .prepare(
      `INSERT INTO orders (user_id, astrologer_id, type, status, created_at)
       VALUES (?, ?, 'chat', 'active', datetime('now'))`
    )
    .run(userId, astrologerId);

  const orderId = result.lastInsertRowid as number;

  // 4. Insert system message
  db.prepare(
    `INSERT INTO messages (order_id, sender_type, sender_id, content, created_at)
     VALUES (?, 'system', 0, 'Chat session started', datetime('now'))`
  ).run(orderId);

  // 5. If AI astrologer, queue a greeting message slightly in the future
  if (astrologer.is_ai) {
    const delaySeconds = randomInt(2, 3);
    const greeting = getGreetingResponse();
    db.prepare(
      `INSERT INTO messages (order_id, sender_type, sender_id, content, created_at)
       VALUES (?, 'astrologer', ?, ?, datetime('now', '+${delaySeconds} seconds'))`
    ).run(orderId, astrologerId, greeting);
  }

  // 6. Increment total_chats for the astrologer
  db.prepare('UPDATE astrologers SET total_chats = total_chats + 1 WHERE id = ?').run(astrologerId);

  // 7. Fetch and return the created order
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as Order;

  return { order };
}

export function endChatSession(
  orderId: number,
  userId: number
): { order: Order; amount_charged: number; duration_minutes: number } | { error: string } {
  const db = getDb();

  // 1. Verify ownership and status
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, userId) as
    | Order
    | undefined;

  if (!order) {
    return { error: 'Order not found' };
  }
  if (order.status !== 'active') {
    return { error: 'Chat session is not active' };
  }

  // 2. Get astrologer details
  const astrologer = getAstrologer(order.astrologer_id);
  if (!astrologer) {
    return { error: 'Astrologer not found' };
  }

  // 3. Calculate duration (in minutes)
  const createdAt = new Date(order.created_at + 'Z').getTime();
  const now = Date.now();
  const durationMs = now - createdAt;
  const durationMinutes = Math.max(1, Math.ceil(durationMs / 60000)); // Minimum 1 minute

  // 4. Calculate cost
  let amountCharged = 0;

  if (astrologer.is_ai) {
    // AI astrologers charge per chat, with discount
    const basePrice = astrologer.price_per_chat || 0;
    const discountFactor = (100 - astrologer.discount_percent) / 100;
    amountCharged = Math.round(basePrice * discountFactor * 100) / 100;
  } else {
    // Human astrologers charge per minute, with discount
    const basePrice = astrologer.price_per_min || 0;
    const discountFactor = (100 - astrologer.discount_percent) / 100;
    amountCharged = Math.round(durationMinutes * basePrice * discountFactor * 100) / 100;
  }

  // 5. Debit wallet if cost > 0
  if (amountCharged > 0) {
    const debitResult = debitWallet(
      userId,
      amountCharged,
      `Chat with ${astrologer.name} (${durationMinutes} min)`,
      `order_${orderId}`
    );
    if ('error' in debitResult) {
      return { error: debitResult.error };
    }
  }

  // 6. Update order
  db.prepare(
    `UPDATE orders
     SET status = 'completed',
         completed_at = datetime('now'),
         duration_minutes = ?,
         amount = ?
     WHERE id = ?`
  ).run(durationMinutes, amountCharged, orderId);

  // 7. Insert system summary message
  const summaryMsg =
    amountCharged > 0
      ? `Chat session ended. Duration: ${durationMinutes} min. Amount charged: \u20B9${amountCharged}.`
      : `Chat session ended. Duration: ${durationMinutes} min. This was a free session.`;

  db.prepare(
    `INSERT INTO messages (order_id, sender_type, sender_id, content, created_at)
     VALUES (?, 'system', 0, ?, datetime('now'))`
  ).run(orderId, summaryMsg);

  // 8. Increment total_orders for the astrologer
  db.prepare('UPDATE astrologers SET total_orders = total_orders + 1 WHERE id = ?').run(astrologer.id);

  // 9. Return updated order
  const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId) as Order;

  return {
    order: updatedOrder,
    amount_charged: amountCharged,
    duration_minutes: durationMinutes,
  };
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export function getMessages(
  orderId: number,
  userId: number,
  afterId?: number
): { messages: Message[]; order_status: string } | { error: string } {
  const db = getDb();

  // Verify ownership
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, userId) as
    | Order
    | undefined;

  if (!order) {
    return { error: 'Order not found' };
  }

  let sql: string;
  let params: unknown[];

  if (afterId && afterId > 0) {
    sql = `SELECT * FROM messages
           WHERE order_id = ? AND id > ? AND created_at <= datetime('now')
           ORDER BY id ASC`;
    params = [orderId, afterId];
  } else {
    sql = `SELECT * FROM messages
           WHERE order_id = ? AND created_at <= datetime('now')
           ORDER BY id ASC`;
    params = [orderId];
  }

  const messages = db.prepare(sql).all(...params) as Message[];

  return {
    messages,
    order_status: order.status,
  };
}

export function sendMessage(
  orderId: number,
  userId: number,
  content: string
): { message: Message } | { error: string } {
  const db = getDb();

  // Verify ownership and active status
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, userId) as
    | Order
    | undefined;

  if (!order) {
    return { error: 'Order not found' };
  }
  if (order.status !== 'active') {
    return { error: 'Chat session is not active' };
  }

  // Insert user message
  const result = db
    .prepare(
      `INSERT INTO messages (order_id, sender_type, sender_id, content, created_at)
       VALUES (?, 'user', ?, ?, datetime('now'))`
    )
    .run(orderId, userId, content);

  const messageId = result.lastInsertRowid as number;
  const userMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(messageId) as Message;

  // If AI astrologer, generate and queue a response in the future
  const astrologer = getAstrologer(order.astrologer_id);
  if (astrologer && astrologer.is_ai) {
    // Fetch user's moon sign for personalized responses
    const user = db.prepare('SELECT moon_sign FROM users WHERE id = ?').get(userId) as
      | { moon_sign: string | null }
      | undefined;
    const moonSign = user?.moon_sign || null;

    const aiResponse = pickAIResponse(content, moonSign);
    const delaySeconds = randomInt(3, 5);

    db.prepare(
      `INSERT INTO messages (order_id, sender_type, sender_id, content, created_at)
       VALUES (?, 'astrologer', ?, ?, datetime('now', '+${delaySeconds} seconds'))`
    ).run(orderId, astrologer.id, aiResponse);
  }

  return { message: userMessage };
}

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

export function submitFeedback(
  orderId: number,
  userId: number,
  rating: number,
  comment?: string
): { success: boolean } | { error: string } {
  const db = getDb();

  // Validate rating
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return { error: 'Rating must be an integer between 1 and 5' };
  }

  // Verify ownership and completed status
  const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(orderId, userId) as
    | Order
    | undefined;

  if (!order) {
    return { error: 'Order not found' };
  }
  if (order.status !== 'completed') {
    return { error: 'Feedback can only be submitted for completed sessions' };
  }

  // Check for existing feedback
  const existingFeedback = db
    .prepare('SELECT id FROM order_feedback WHERE order_id = ?')
    .get(orderId);

  if (existingFeedback) {
    return { error: 'Feedback has already been submitted for this session' };
  }

  // Insert feedback
  db.prepare(
    `INSERT INTO order_feedback (order_id, user_id, rating, comment, created_at)
     VALUES (?, ?, ?, ?, datetime('now'))`
  ).run(orderId, userId, rating, comment || null);

  // Update astrologer rating (running average)
  const astrologer = db
    .prepare('SELECT id, rating, total_orders FROM astrologers WHERE id = ?')
    .get(order.astrologer_id) as { id: number; rating: number; total_orders: number } | undefined;

  if (astrologer) {
    // Simple running average: ((old_rating * count) + new_rating) / (count + 1)
    // Use total_orders as an approximation of feedback count
    const feedbackCount = db
      .prepare(
        `SELECT COUNT(*) as count FROM order_feedback
         WHERE order_id IN (SELECT id FROM orders WHERE astrologer_id = ?)`
      )
      .get(astrologer.id) as { count: number };

    const totalFeedbacks = feedbackCount.count;

    if (totalFeedbacks > 0) {
      const avgRating = db
        .prepare(
          `SELECT AVG(rating) as avg_rating FROM order_feedback
           WHERE order_id IN (SELECT id FROM orders WHERE astrologer_id = ?)`
        )
        .get(astrologer.id) as { avg_rating: number };

      const newRating = Math.round(avgRating.avg_rating * 10) / 10;
      db.prepare('UPDATE astrologers SET rating = ? WHERE id = ?').run(newRating, astrologer.id);
    }
  }

  return { success: true };
}
