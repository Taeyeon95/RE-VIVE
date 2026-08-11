import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

function toEvent(row) {
  return {
    id: row.id,
    timestamp: row.timestamp.toISOString(),
    completed: row.completed,
    moneySaved: row.money_saved,
  };
}

router.get('/', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM craving_events WHERE user_id = $1 ORDER BY timestamp',
    [req.userId],
  );
  res.json({ events: result.rows.map(toEvent) });
});

// Client generates the event id before calling this (mirrors the old
// Firestore addCravingEvent, which wrote the id-bearing doc as-is).
router.post('/', async (req, res) => {
  const e = req.body;
  await pool.query(
    `INSERT INTO craving_events (id, user_id, timestamp, completed, money_saved)
     VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (id) DO NOTHING`,
    [e.id, req.userId, e.timestamp, e.completed, e.moneySaved],
  );
  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM craving_events WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
  res.status(204).end();
});

router.delete('/', async (req, res) => {
  await pool.query('DELETE FROM craving_events WHERE user_id = $1', [req.userId]);
  res.status(204).end();
});

export default router;
