const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { connectDB } = require('./config/db');

const app = express();

// Connect MongoDB (with error handling)
connectDB().catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://bullgains.in',
  'https://www.bullgains.in',
  'https://bullgains.vercel.app'
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security & Performance
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Logging (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

const queryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many queries submitted. Please try again later.'
  }
});

app.use('/api', limiter);

// OPTIONS preflight
app.options('*', cors());

// Helper function to load routes safely
const loadRoute = (path, routePath) => {
  try {
    const route = require(routePath);
    app.use(path, route);
    console.log(`✅ Loaded route: ${path}`);
    return true;
  } catch (error) {
    console.log(`⚠️  Route ${path} not found, skipping...`);
    return false;
  }
};

// ============ CRITICAL ROUTES (MUST EXIST) ============
app.use('/api/admin', require('./routes/admin'));
app.use('/api/query', queryLimiter, require('./routes/queryRoutes'));

// ============ OPTIONAL ROUTES ============
loadRoute('/api/auth', './routes/auth');
loadRoute('/api/users', './routes/users');
loadRoute('/api/blog', './routes/blog');
loadRoute('/api/services', './routes/services');
loadRoute('/api/contact', './routes/contact');
loadRoute('/api/analytics', './routes/analytics');
loadRoute('/api/quote', './routes/quote');

// Conditional seed route
if (process.env.ENABLE_SEED === 'true') {
  loadRoute('/api/seed', './routes/seed');
}

// ============ UTILITY ENDPOINTS ============
// Health check
app.get('/api/health', async (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected', 
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: statusMap[mongoStatus] || 'Unknown',
    message: 'Bullgains Backend API is running'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bullgains Research API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      query: '/api/query',
      admin: '/api/admin/login',
      blog: '/api/blog'
    }
  });
});

// ============ ERROR HANDLERS ============
// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    availableRoutes: [
      '/api/health',
      '/api/query',
      '/api/admin/login'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  // CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation',
      origin: req.headers.origin
    });
  }
  
  // Generic error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ============ SERVER STARTUP (LOCAL ONLY) ============
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Allowed origins:`, allowedOrigins.join(', '));
    console.log(`📝 Customer Query API: /api/query`);
    console.log(`👤 Admin Panel API: /api/admin`);
  });
}

// ============ EXPORT FOR VERCEL ============
module.exports = app;
