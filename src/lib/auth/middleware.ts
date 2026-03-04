import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';

interface AuthResult {
  userId: number;
  phone: string;
}

export function authenticateRequest(request: NextRequest): AuthResult | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if ('phone' in decoded) {
      return { userId: decoded.userId, phone: decoded.phone };
    }

    // Refresh token - extract userId but no phone
    if ('type' in decoded && decoded.type === 'refresh') {
      return { userId: decoded.userId, phone: '' };
    }

    return null;
  } catch {
    return null;
  }
}
