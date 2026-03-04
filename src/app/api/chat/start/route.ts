import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth/middleware';
import { createChatSession, getAstrologer } from '@/lib/chat/chat-service';

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
    const { astrologer_id } = body;

    if (!astrologer_id || typeof astrologer_id !== 'number') {
      return NextResponse.json(
        { error: 'astrologer_id is required and must be a number' },
        { status: 400 }
      );
    }

    const result = createChatSession(auth.userId, astrologer_id);

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Also return astrologer details for the client
    const astrologer = getAstrologer(astrologer_id);

    return NextResponse.json({
      order: result.order,
      astrologer,
    });
  } catch (error) {
    console.error('Chat start error:', error);
    return NextResponse.json(
      { error: 'Failed to start chat session' },
      { status: 500 }
    );
  }
}
