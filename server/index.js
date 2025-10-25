const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const config = require('./config');
const { connectDB } = require('./config/db');

const path = require('path');
const app = express();
const server = createServer(app);

// ✅ Use Render's assigned port
const PORT = process.env.PORT || config.PORT || 5000;

// ✅ Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://bullgains.in',
  'https://www.bullgains.in',
  'https://bullgains.vercel.app'
];

// ✅ Initialize Socket.IO with correct CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// ✅ Specific rate limit for query form (prevent spam)
const queryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 queries per hour per IP
  message: {
    success: false,
    message: 'Too many queries submitted. Please try again later.'
  }
});

// ✅ CORS Middleware - MUST BE BEFORE OTHER MIDDLEWARE
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
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

// ✅ Other Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// ✅ Apply general rate limiter
app.use(limiter);

// ✅ Connect MongoDB
connectDB();

// ✅ OPTIONS preflight handler for all routes
app.options('*', cors());

// ✅ Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/admin', require('./routes/admin'));


// ✅ Customer Query Routes with rate limiting
app.use('/api/query', queryLimiter, require('./routes/queryRoutes'));

// Optional: only include seed in development or with ENABLE_SEED=true
if (config.ENABLE_SEED === 'true') {
  app.use('/api/seed', require('./routes/seed'));
}

// Mount quote proxy route
const quoteRouter = require('./routes/quote');
app.use('/api/quote', quoteRouter);

// ✅ Default route for static frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// ✅ Socket.IO setup
io.on('connection', (socket) => {
  console.log('📊 Client connected to analytics:', socket.id);

  socket.on('disconnect', () => {
    console.log('📊 Client disconnected:', socket.id);
  });
});

// ✅ Make io available to routes
app.set('io', io);

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: config.NODE_ENV === 'development' ? err.message : {}
  });
});

// ✅ 404 route handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// ✅ Start server
const startServer = () => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Allowed origins:`, allowedOrigins.join(', '));
    console.log(`📊 Real-time analytics via Socket.IO ready`);
    console.log(`📝 Customer Query API: /api/query`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });
};

// ✅ Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
  });
});

// ✅ Start the backend
startServer();

module.exports = { app, io };
