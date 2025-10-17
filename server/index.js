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

const app = express();
const server = createServer(app);

// ✅ Use Render’s assigned port
const PORT = process.env.PORT || config.PORT || 5000;

// ✅ Make sure CLIENT_URL has no trailing slash
const CLIENT_URL = (config.CLIENT_URL || '').replace(/\/$/, '');

// ✅ Initialize Socket.IO with correct CORS
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// ✅ Middleware setup
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Connect MongoDB
connectDB();

// ✅ Define API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/analytics', require('./routes/analytics'));

// Optional: only include seed in development or with ENABLE_SEED=true
if (config.ENABLE_SEED === 'true') {
  app.use('/api/seed', require('./routes/seed'));
}

// ✅ Default route for Render health check
app.get('/', (req, res) => {
  res.send("✅ BullGains backend is running successfully!");
});

// ✅ Socket.IO setup for real-time analytics
io.on('connection', (socket) => {
  console.log('📊 Client connected to analytics:', socket.id);

  socket.on('disconnect', () => {
    console.log('📊 Client disconnected:', socket.id);
  });
});

// ✅ Make io available to routes if needed
app.set('io', io);

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: config.NODE_ENV === 'development' ? err.message : {},
  });
});

// ✅ 404 route handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Start server with error handling
const startServer = () => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Allowed origin: ${CLIENT_URL}`);
    console.log(`📊 Real-time analytics via Socket.IO ready`);
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

// ✅ Start the backend
startServer();

module.exports = { app, io };
