CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  quit_date_time TIMESTAMPTZ NOT NULL,
  age INTEGER NOT NULL,
  body_conditions TEXT[] NOT NULL DEFAULT '{}',
  selected_exercise_id TEXT NOT NULL,
  quit_reason TEXT NOT NULL,
  cigarettes_per_day INTEGER NOT NULL,
  price_per_pack DOUBLE PRECISION NOT NULL,
  cigarettes_per_pack INTEGER NOT NULL,
  font_size TEXT NOT NULL DEFAULT 'normal',
  simplified_ui BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_price DOUBLE PRECISION NOT NULL,
  photo_data_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  achieved_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS goals_user_id_idx ON goals(user_id);

CREATE TABLE IF NOT EXISTS craving_events (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  completed BOOLEAN NOT NULL,
  money_saved DOUBLE PRECISION NOT NULL
);
CREATE INDEX IF NOT EXISTS craving_events_user_id_idx ON craving_events(user_id);
