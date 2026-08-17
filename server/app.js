import express from 'express';
import cors from 'cors';
import waterRoutes from './routes/waterRoutes.js';
import nfcRoutes from './routes/nfcRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Flexible CORS setup for production (Vercel) & local development
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL.replace(/\/$/, ''), 'http://localhost:5173', 'http://127.0.0.1:5173']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({ status: 'ok', service: 'SIPR API' });
});

// API Routes - mount both with and without /api prefix for robust compatibility
app.use(['/api/water', '/water'], waterRoutes);
app.use(['/api/nfc', '/nfc'], nfcRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
