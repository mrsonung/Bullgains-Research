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
const io = new Server(server, {
  cors: {
    origin: config.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"],
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/analytics', require('./routes/analytics'));
// Seed routes (protect in production)
if (config.ENABLE_SEED === 'true') {
  app.use('/api/seed', require('./routes/seed'));
}

// Socket.io for real-time analytics
io.on('connection', (socket) => {
  console.log('📊 Client connected for real-time analytics');
  
  socket.on('disconnect', () => {
    console.log('📊 Client disconnected from analytics');
  });
});

// Make io available to routes
app.set('io', io);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: config.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = config.PORT;

// Handle server startup with proper error handling
const startServer = () => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Real-time analytics available via Socket.IO`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please kill the process using this port or use a different port.`);
      console.error('💡 You can kill all Node.js processes with: taskkill /f /im node.exe');
      process.exit(1);
    } else {
      console.error('❌ Server error:', err);
      process.exit(1);
    }
  });
};

// Start the server
startServer();

module.exports = { app, io };
