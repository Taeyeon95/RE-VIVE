import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';
import { setSessionCookie, clearSessionCookie, readSession } from '../auth.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ code: 'INVALID_EMAIL' });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ code: 'WEAK_PASSWORD' });
  }

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    return res.status(409).json({ code: 'EMAIL_IN_USE' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash],
  );
  const user = result.rows[0];
  setSessionCookie(res, { uid: user.id, email: user.email });
  res.json({ uid: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(401).json({ code: 'INVALID_CREDENTIALS' });
  }

  const result = await pool.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ code: 'INVALID_CREDENTIALS' });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ code: 'INVALID_CREDENTIALS' });

  setSessionCookie(res, { uid: user.id, email: user.email });
  res.json({ uid: user.id, email: user.email });
});

router.post('/logout', (req, res) => {
  clearSessionCookie(res);
  res.status(204).end();
});

router.get('/me', (req, res) => {
  const session = readSession(req);
  res.json({ user: session ? { uid: session.uid, email: session.email } : null });
});

export default router;
