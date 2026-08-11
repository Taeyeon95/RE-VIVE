import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import goalRoutes from './routes/goals.js';
import cravingRoutes from './routes/cravings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Goal photos are base64 data URLs, so allow a larger-than-default JSON body.
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/cravings', cravingRoutes);

// Production: serve the built frontend from the same server/port.
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ code: 'SERVER_ERROR' });
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
