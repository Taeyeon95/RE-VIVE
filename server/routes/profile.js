import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();
router.use(requireAuth);

function toProfile(row) {
  if (!row) return null;
  return {
    quitDateTime: row.quit_date_time.toISOString(),
    age: row.age,
    bodyConditions: row.body_conditions,
    selectedExerciseId: row.selected_exercise_id,
    quitReason: row.quit_reason,
    cigarettesPerDay: row.cigarettes_per_day,
    pricePerPack: row.price_per_pack,
    cigarettesPerPack: row.cigarettes_per_pack,
    accessibility: { fontSize: row.font_size, simplifiedUI: row.simplified_ui },
  };
}

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [req.userId]);
  res.json({ profile: toProfile(result.rows[0]) });
});

router.put('/', async (req, res) => {
  const p = req.body;
  await pool.query(
    `INSERT INTO profiles (
       user_id, quit_date_time, age, body_conditions, selected_exercise_id,
       quit_reason, cigarettes_per_day, price_per_pack, cigarettes_per_pack, font_size, simplified_ui
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     ON CONFLICT (user_id) DO UPDATE SET
       quit_date_time = EXCLUDED.quit_date_time,
       age = EXCLUDED.age,
       body_conditions = EXCLUDED.body_conditions,
       selected_exercise_id = EXCLUDED.selected_exercise_id,
       quit_reason = EXCLUDED.quit_reason,
       cigarettes_per_day = EXCLUDED.cigarettes_per_day,
       price_per_pack = EXCLUDED.price_per_pack,
       cigarettes_per_pack = EXCLUDED.cigarettes_per_pack,
       font_size = EXCLUDED.font_size,
       simplified_ui = EXCLUDED.simplified_ui`,
    [
      req.userId,
      p.quitDateTime,
      p.age,
      p.bodyConditions,
      p.selectedExerciseId,
      p.quitReason,
      p.cigarettesPerDay,
      p.pricePerPack,
      p.cigarettesPerPack,
      p.accessibility.fontSize,
      p.accessibility.simplifiedUI,
    ],
  );
  res.status(204).end();
});

router.delete('/', async (req, res) => {
  await pool.query('DELETE FROM profiles WHERE user_id = $1', [req.userId]);
  res.status(204).end();
});

export default router;
