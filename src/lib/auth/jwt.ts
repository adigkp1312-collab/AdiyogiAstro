import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constants';

const JWT_SECRET = process.env.JWT_SECRET || 'nakshatra-dev-secret-change-in-prod-2026';

interface AccessTokenPayload {
  userId: number;
  phone: string;
}

interface RefreshTokenPayload {
  userId: number;
  type: 'refresh';
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function signRefreshToken(payload: { userId: number }): string {
  return jwt.sign({ ...payload, type: 'refresh' } as RefreshTokenPayload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

export function verifyToken(token: string): AccessTokenPayload | RefreshTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload | RefreshTokenPayload;
}
