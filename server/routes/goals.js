import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

function toGoal(row) {
  return {
    id: row.id,
    name: row.name,
    targetPrice: row.target_price,
    photoDataUrl: row.photo_data_url,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    achievedAt: row.achieved_at ? row.achieved_at.toISOString() : undefined,
  };
}

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at', [req.userId]);
  res.json({ goals: result.rows.map(toGoal) });
});

// Creates a new goal — id/status/createdAt are generated here (mirrors the old
// Firestore addGoal, which did this same generation client-side).
router.post('/', async (req, res) => {
  const { name, targetPrice, photoDataUrl } = req.body;
  const result = await pool.query(
    `INSERT INTO goals (id, user_id, name, target_price, photo_data_url, status, created_at)
     VALUES (gen_random_uuid(), $1, $2, $3, $4, 'active', now())
     RETURNING *`,
    [req.userId, name, targetPrice, photoDataUrl],
  );
  res.json({ goal: toGoal(result.rows[0]) });
});

// Full upsert preserving a client-supplied id/status/createdAt/achievedAt —
// used only by the local-guest-data migration import.
router.put('/:id', async (req, res) => {
  const g = req.body;
  await pool.query(
    `INSERT INTO goals (id, user_id, name, target_price, photo_data_url, status, created_at, achieved_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       target_price = EXCLUDED.target_price,
       photo_data_url = EXCLUDED.photo_data_url,
       status = EXCLUDED.status,
       created_at = EXCLUDED.created_at,
       achieved_at = EXCLUDED.achieved_at`,
    [req.params.id, req.userId, g.name, g.targetPrice, g.photoDataUrl, g.status, g.createdAt, g.achievedAt ?? null],
  );
  res.status(204).end();
});

const PATCHABLE_FIELDS = {
  name: 'name',
  targetPrice: 'target_price',
  photoDataUrl: 'photo_data_url',
  status: 'status',
  achievedAt: 'achieved_at',
};

router.patch('/:id', async (req, res) => {
  const updates = req.body ?? {};
  const setClauses = [];
  const values = [];
  let i = 1;
  for (const [key, column] of Object.entries(PATCHABLE_FIELDS)) {
    if (key in updates) {
      setClauses.push(`${column} = $${i}`);
      values.push(updates[key]);
      i += 1;
    }
  }
  if (setClauses.length === 0) return res.status(204).end();
  values.push(req.params.id, req.userId);
  await pool.query(
    `UPDATE goals SET ${setClauses.join(', ')} WHERE id = $${i} AND user_id = $${i + 1}`,
    values,
  );
  res.status(204).end();
});

router.post('/:id/achieve', async (req, res) => {
  await pool.query(
    `UPDATE goals SET status = 'achieved', achieved_at = now() WHERE id = $1 AND user_id = $2`,
    [req.params.id, req.userId],
  );
  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM goals WHERE id = $1 AND user_id = $2', [req.params.id, req.userId]);
  res.status(204).end();
});

router.delete('/', async (req, res) => {
  await pool.query('DELETE FROM goals WHERE user_id = $1', [req.userId]);
  res.status(204).end();
});

export default router;
