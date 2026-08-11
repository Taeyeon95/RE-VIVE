import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth, requireAdmin } from '../auth.js';

const router = Router();
router.use(requireAuth, requireAdmin);

router.get('/users', async (req, res) => {
  const result = await pool.query(`
    SELECT
      u.id, u.email, u.is_admin, u.created_at,
      p.quit_date_time,
      (SELECT count(*) FROM goals g WHERE g.user_id = u.id) AS goal_count,
      (SELECT count(*) FROM craving_events c WHERE c.user_id = u.id) AS craving_count
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    ORDER BY u.created_at DESC
  `);
  res.json({
    users: result.rows.map((row) => ({
      uid: row.id,
      email: row.email,
      isAdmin: row.is_admin,
      createdAt: row.created_at.toISOString(),
      quitDateTime: row.quit_date_time ? row.quit_date_time.toISOString() : null,
      goalCount: Number(row.goal_count),
      cravingCount: Number(row.craving_count),
    })),
  });
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const userResult = await pool.query('SELECT id, email, is_admin, created_at FROM users WHERE id = $1', [id]);
  const user = userResult.rows[0];
  if (!user) return res.status(404).json({ code: 'NOT_FOUND' });

  const [profileResult, goalsResult, cravingsResult] = await Promise.all([
    pool.query('SELECT * FROM profiles WHERE user_id = $1', [id]),
    pool.query('SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at', [id]),
    pool.query('SELECT * FROM craving_events WHERE user_id = $1 ORDER BY timestamp DESC', [id]),
  ]);

  const p = profileResult.rows[0];

  res.json({
    user: {
      uid: user.id,
      email: user.email,
      isAdmin: user.is_admin,
      createdAt: user.created_at.toISOString(),
    },
    profile: p
      ? {
          quitDateTime: p.quit_date_time.toISOString(),
          age: p.age,
          bodyConditions: p.body_conditions,
          selectedExerciseId: p.selected_exercise_id,
          quitReason: p.quit_reason,
          cigarettesPerDay: p.cigarettes_per_day,
          pricePerPack: p.price_per_pack,
          cigarettesPerPack: p.cigarettes_per_pack,
          accessibility: { fontSize: p.font_size, simplifiedUI: p.simplified_ui },
        }
      : null,
    goals: goalsResult.rows.map((g) => ({
      id: g.id,
      name: g.name,
      targetPrice: g.target_price,
      photoDataUrl: g.photo_data_url,
      status: g.status,
      createdAt: g.created_at.toISOString(),
      achievedAt: g.achieved_at ? g.achieved_at.toISOString() : undefined,
    })),
    cravingEvents: cravingsResult.rows.map((c) => ({
      id: c.id,
      timestamp: c.timestamp.toISOString(),
      completed: c.completed,
      moneySaved: c.money_saved,
    })),
  });
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (id === req.userId) return res.status(400).json({ code: 'CANNOT_DELETE_SELF' });

  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) return res.status(404).json({ code: 'NOT_FOUND' });
  res.status(204).end();
});

export default router;
