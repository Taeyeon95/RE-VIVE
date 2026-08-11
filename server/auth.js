import jwt from 'jsonwebtoken';
import { pool } from './db.js';

const COOKIE_NAME = 'session';

function secret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }
  return process.env.JWT_SECRET;
}

export function setSessionCookie(res, payload) {
  const token = jwt.sign(payload, secret(), { expiresIn: '30d' });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME);
}

export function readSession(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, secret());
  } catch {
    return null;
  }
}

export function requireAuth(req, res, next) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ code: 'UNAUTHENTICATED' });
  req.userId = session.uid;
  req.userEmail = session.email;
  next();
}

// Re-checks the DB rather than trusting the JWT, so revoking admin rights
// takes effect immediately without waiting for the session to expire.
export async function requireAdmin(req, res, next) {
  const result = await pool.query('SELECT is_admin FROM users WHERE id = $1', [req.userId]);
  if (!result.rows[0]?.is_admin) return res.status(403).json({ code: 'FORBIDDEN' });
  next();
}
