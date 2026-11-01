import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedInitialData } from './seeds/seed.js';

import authRoutes from './routes/auth.routes.js';
import contentRoutes from './routes/content.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import activityRoutes from './routes/activity.routes.js';
import seoRoutes from './routes/seo.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Parsing Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Ensure DB connection on serverless cold starts before any route runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (e) {
    console.warn('DB connect error in request middleware:', e.message);
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/activity-logs', activityRoutes);
app.use('/api/seo', seoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Codename ONE Real Estate CMS API'
  });
});

// Global 404
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
});

// Boot Server for local / continuous environments
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();
      await seedInitialData();

      app.listen(PORT, () => {
        console.log(`===============================================`);
        console.log(`🚀 Codename ONE API running on port ${PORT}`);
        console.log(`🌐 Base URL: http://localhost:${PORT}`);
        console.log(`🛡️  Admin Portal: http://localhost:5173/admin`);
        console.log(`===============================================`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
} else {
  // Cold start initialization in Vercel
  connectDB().then(() => seedInitialData()).catch(console.error);
}

export default app;
