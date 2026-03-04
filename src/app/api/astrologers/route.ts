import { NextRequest, NextResponse } from 'next/server';
import { getAstrologerList } from '@/lib/chat/chat-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filterParam = searchParams.get('filter') || 'all';

    // Validate filter value
    const validFilters = ['all', 'ai', 'human'] as const;
    const filter = validFilters.includes(filterParam as typeof validFilters[number])
      ? (filterParam as 'all' | 'ai' | 'human')
      : 'all';

    const astrologers = getAstrologerList(filter);

    return NextResponse.json({ astrologers });
  } catch (error) {
    console.error('Astrologers list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch astrologers' },
      { status: 500 }
    );
  }
}
