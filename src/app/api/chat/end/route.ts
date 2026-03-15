import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth/middleware';
import { endChatSession } from '@/lib/chat/chat-service';

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { order_id } = body;

    if (!order_id || typeof order_id !== 'number') {
      return NextResponse.json(
        { error: 'order_id is required and must be a number' },
        { status: 400 }
      );
    }

    const result = endChatSession(order_id, auth.userId);

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      order: result.order,
      amount_charged: result.amount_charged,
      duration_minutes: result.duration_minutes,
    });
  } catch (error) {
    console.error('Chat end error:', error);
    return NextResponse.json(
      { error: 'Failed to end chat session' },
      { status: 500 }
    );
  }
}
