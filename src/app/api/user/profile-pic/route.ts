import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth/middleware';
import type { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const auth = authenticateRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { imageData } = await request.json();

    if (!imageData || typeof imageData !== 'string') {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Validate it's a data URL (base64 image)
    if (!imageData.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Check size (limit to ~2MB base64 string)
    if (imageData.length > 2 * 1024 * 1024 * 1.37) {
      return NextResponse.json(
        { error: 'Image too large. Max 2MB.' },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare('UPDATE users SET profile_pic_url = ?, updated_at = datetime(\'now\') WHERE id = ?')
      .run(imageData, auth.userId);

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(auth.userId) as User;

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Profile pic upload error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile picture' },
      { status: 500 }
    );
  }
}
