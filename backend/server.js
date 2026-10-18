import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import flashcardRoutes from './routes/flashcardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import progressRoutes from './routes/progressRoutes.js';


// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to handle CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      // Allow any localhost / 127.0.0.1 port in development mode
      if (
        process.env.NODE_ENV !== "production" &&
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }

      // Exact match against allowed origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow any Vercel preview deployment (*.vercel.app)
      if (/\.vercel\.app$/.test(origin)) return callback(null, true);

      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normalize incoming URLs (strip duplicate slashes and duplicate /api prefixes)
app.use((req, res, next) => {
  if (req.url.includes("//")) {
    req.url = req.url.replace(/\/+/g, "/");
  }
  if (req.url.startsWith("/api/api/")) {
    req.url = req.url.replace("/api/api/", "/api/");
  }
  next();
});

// Health check
app.get(['/', '/api'], (req, res) => {
  res.json({ success: true, message: "chandu's AI API is running" });
});

// Routes — support both /api/... and direct /... for compatibility with all proxies and rewrites
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/documents', '/documents'], documentRoutes);
app.use(['/api/flashcards', '/flashcards'], flashcardRoutes);
app.use(['/api/ai', '/ai'], aiRoutes);
app.use(['/api/quizzes', '/quizzes'], quizRoutes);
app.use(['/api/progress', '/progress'], progressRoutes);


// 404 handler
app.use((req, res, next) => {
  const attempted = req.originalUrl || req.url;
  console.warn(`[404] Route not found: ${req.method} ${attempted}`);
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${attempted}`,
    statusCode: 404
  });
});

app.use(errorHandler);


// Start server locally (Vercel handles routing automatically via export)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

// Export for Vercel Serverless Functions
export default app;

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
});