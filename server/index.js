// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const compression = require('compression');
// // const morgan = require('morgan');
// // const rateLimit = require('express-rate-limit');
// // const { createServer } = require('http');
// // const { Server } = require('socket.io');
// // require('dotenv').config();
// // const config = require('./config');
// // const { connectDB } = require('./config/db');

// // const path = require('path');
// // const app = express();
// // const server = createServer(app);

// // // ✅ Use Render's assigned port
// // const PORT = process.env.PORT || config.PORT || 5000;

// // // ✅ Define allowed origins
// // const allowedOrigins = [
// //   'http://localhost:5173',
// //   'http://127.0.0.1:5173',
// //   'https://bullgains.in',
// //   'https://www.bullgains.in',
// //   'https://bullgains.vercel.app'
// // ];

// // // ✅ Initialize Socket.IO with correct CORS
// // const io = new Server(server, {
// //   cors: {
// //     origin: allowedOrigins,
// //     methods: ["GET", "POST"],
// //     credentials: true
// //   }
// // });

// // // ✅ Rate limiting
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000,
// //   max: 100,
// // });

// // // ✅ Specific rate limit for query form (prevent spam)
// // const queryLimiter = rateLimit({
// //   windowMs: 60 * 60 * 1000, // 1 hour
// //   max: 5, // 5 queries per hour per IP
// //   message: {
// //     success: false,
// //     message: 'Too many queries submitted. Please try again later.'
// //   }
// // });

// // // ✅ CORS Middleware - MUST BE BEFORE OTHER MIDDLEWARE
// // app.use(cors({
// //   origin: function (origin, callback) {
// //     // Allow requests with no origin (like mobile apps or curl requests)
// //     if (!origin) return callback(null, true);
    
// //     if (allowedOrigins.indexOf(origin) === -1) {
// //       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
// //       return callback(new Error(msg), false);
// //     }
// //     return callback(null, true);
// //   },
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // // ✅ Other Middleware
// // app.use(helmet({
// //   crossOriginResourcePolicy: { policy: "cross-origin" }
// // }));
// // app.use(compression());
// // app.use(morgan('combined'));
// // app.use(express.json({ limit: '10mb' }));
// // app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// // // ✅ Apply general rate limiter
// // app.use(limiter);

// // // ✅ Connect MongoDB
// // connectDB();

// // // ✅ OPTIONS preflight handler for all routes
// // app.options('*', cors());

// // // ✅ Define API routes
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/users', require('./routes/users'));
// // app.use('/api/blog', require('./routes/blog'));
// // app.use('/api/services', require('./routes/services'));
// // app.use('/api/contact', require('./routes/contact'));
// // app.use('/api/analytics', require('./routes/analytics'));
// // app.use('/api/admin', require('./routes/admin'));


// // // ✅ Customer Query Routes with rate limiting
// // app.use('/api/query', queryLimiter, require('./routes/queryRoutes'));

// // // Optional: only include seed in development or with ENABLE_SEED=true
// // if (config.ENABLE_SEED === 'true') {
// //   app.use('/api/seed', require('./routes/seed'));
// // }

// // // Mount quote proxy route
// // const quoteRouter = require('./routes/quote');
// // app.use('/api/quote', quoteRouter);

// // // ✅ Default route for static frontend
// // app.use(express.static(path.join(__dirname, "frontend", "dist")));
// // app.get('/', (_, res) => {
// //   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// // });

// // // ✅ Socket.IO setup
// // io.on('connection', (socket) => {
// //   console.log('📊 Client connected to analytics:', socket.id);

// //   socket.on('disconnect', () => {
// //     console.log('📊 Client disconnected:', socket.id);
// //   });
// // });

// // // ✅ Make io available to routes
// // app.set('io', io);

// // // ✅ Health check endpoint
// // app.get('/api/health', (req, res) => {
// //   res.json({
// //     status: 'OK',
// //     timestamp: new Date().toISOString(),
// //     uptime: process.uptime(),
// //     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
// //   });
// // });

// // // ✅ Error handling
// // app.use((err, req, res, next) => {
// //   console.error('Error:', err.message);
// //   res.status(500).json({
// //     success: false,
// //     message: 'Something went wrong!',
// //     error: config.NODE_ENV === 'development' ? err.message : {}
// //   });
// // });

// // // ✅ 404 route handler
// // app.use('*', (req, res) => {
// //   res.status(404).json({ 
// //     success: false,
// //     message: 'Route not found' 
// //   });
// // });

// // // ✅ Start server
// // const startServer = () => {
// //   server.listen(PORT, () => {
// //     console.log(`🚀 Server running on port ${PORT}`);
// //     console.log(`🌐 Allowed origins:`, allowedOrigins.join(', '));
// //     console.log(`📊 Real-time analytics via Socket.IO ready`);
// //     console.log(`📝 Customer Query API: /api/query`);
// //   });

// //   server.on('error', (err) => {
// //     if (err.code === 'EADDRINUSE') {
// //       console.error(`❌ Port ${PORT} is already in use.`);
// //       process.exit(1);
// //     } else {
// //       console.error('❌ Server error:', err);
// //       process.exit(1);
// //     }
// //   });
// // };

// // // ✅ Graceful shutdown
// // process.on('SIGTERM', () => {
// //   console.log('👋 SIGTERM received, closing server gracefully...');
// //   server.close(() => {
// //     console.log('✅ Server closed');
// //     mongoose.connection.close(false, () => {
// //       console.log('✅ MongoDB connection closed');
// //       process.exit(0);
// //     });
// //   });
// // });

// // // ✅ Start the backend
// // startServer();

// // module.exports = { app, io };
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// require('dotenv').config();
// const { connectDB } = require('./config/db');

// const app = express();

// // Connect MongoDB
// connectDB();

// // Define allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://127.0.0.1:5173',
//   'https://bullgains.in',
//   'https://www.bullgains.in',
//   'https://bullgains.vercel.app'
// ];

// // CORS Middleware
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Security & Performance
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));
// app.use(compression());

// // Logging (only in development)
// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'));
// }

// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100
// });

// const queryLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 5,
//   message: {
//     success: false,
//     message: 'Too many queries submitted. Please try again later.'
//   }
// });

// app.use('/api', limiter);

// // OPTIONS preflight
// app.options('*', cors());

// // API Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/blog', require('./routes/blog'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/analytics', require('./routes/analytics'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/query', queryLimiter, require('./routes/queryRoutes'));
// app.use('/api/quote', require('./routes/quote'));

// // Conditional seed route
// if (process.env.ENABLE_SEED === 'true') {
//   app.use('/api/seed', require('./routes/seed'));
// }

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     message: 'Bullgains Backend API is running'
//   });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Bullgains Research API',
//     version: '1.0.0',
//     endpoints: {
//       health: '/api/health',
//       query: '/api/query',
//       admin: '/api/admin',
//       blog: '/api/blog'
//     }
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Route not found',
//     path: req.originalUrl
//   });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// });

// // For local development only
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`🌐 Allowed origins:`, allowedOrigins.join(', '));
//     console.log(`📝 Customer Query API: /api/query`);
//   });
// }

// // Export for Vercel
// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { connectDB } = require('./config/db');

const app = express();

// Connect MongoDB
connectDB().catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://bullgains.in',
  'https://www.bullgains.in',
  'https://bullgains.vercel.app'
];

// CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security & Performance
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());

// Logging (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const queryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many queries submitted.' }
});

app.use('/api', limiter);
app.options('*', cors());

// ============ MODELS ============
const Admin = require('./models/Admin');
const Query = require('./models/Query');

// ============ MIDDLEWARE ============
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bullgains-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============ ADMIN ROUTES ============
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'bullgains-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/admin/queries', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (page - 1) * limit;
    const queries = await Query.find(filter).sort({ submittedAt: -1 }).limit(parseInt(limit)).skip(skip);
    const total = await Query.countDocuments(filter);
    res.json({
      success: true,
      count: queries.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: queries
    });
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
  try {
    const total = await Query.countDocuments();
    const pending = await Query.countDocuments({ status: 'pending' });
    const resolved = await Query.countDocuments({ status: 'resolved' });
    const inProgress = await Query.countDocuments({ status: 'in-progress' });
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recent = await Query.countDocuments({ submittedAt: { $gte: sevenDaysAgo } });
    res.json({ success: true, stats: { total, pending, resolved, inProgress, recent } });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/admin/queries/export', verifyAdmin, async (req, res) => {
  try {
    const queries = await Query.find().sort({ submittedAt: -1 });
    const exportData = queries.map(q => ({
      'ID': q._id.toString(),
      'Name': q.name,
      'Email': q.email,
      'Phone': q.phone,
      'Subject': q.subject,
      'Message': q.message,
      'Status': q.status,
      'Submitted At': q.submittedAt,
      'Responded At': q.respondedAt || 'N/A',
      'Notes': q.notes || ''
    }));
    res.json({ success: true, data: exportData, count: exportData.length });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ success: false, message: 'Export failed' });
  }
});

app.delete('/api/admin/queries/:id', verifyAdmin, async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }
    res.json({ success: true, message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ============ QUERY ROUTES ============
try {
  app.use('/api/query', queryLimiter, require('./routes/queryRoutes'));
} catch (e) {
  console.error('Query routes not found:', e.message);
}

// ============ STOCK QUOTE ROUTE ============
app.get('/api/quote', async (req, res) => {
  try {
    const { symbols } = req.query;
    if (!symbols) {
      return res.status(400).json({ success: false, message: 'Symbols parameter required' });
    }
    // Mock data (replace with real API later)
    const symbolList = symbols.split(',').map(s => s.trim());
    const mockData = symbolList.map(symbol => ({
      symbol: symbol,
      price: (Math.random() * 20000 + 10000).toFixed(2),
      change: (Math.random() * 200 - 100).toFixed(2),
      changePercent: (Math.random() * 2 - 1).toFixed(2),
      timestamp: new Date().toISOString()
    }));
    res.json({ success: true, data: mockData });
  } catch (error) {
    console.error('Quote error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============ OPTIONAL ROUTES ============
try { app.use('/api/auth', require('./routes/auth')); } catch (e) {}
try { app.use('/api/blog', require('./routes/blog')); } catch (e) {}

// ============ HEALTH & ROOT ============
app.get('/api/health', async (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = { 0: 'Disconnected', 1: 'Connected', 2: 'Connecting', 3: 'Disconnecting' };
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: statusMap[mongoStatus] || 'Unknown',
    message: 'Bullgains Backend API is running'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bullgains Research API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      query: '/api/query',
      adminLogin: '/api/admin/login',
      quote: '/api/quote'
    }
  });
});

// ============ ERROR HANDLERS ============
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found', path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Something went wrong!' });
});

// ============ SERVER (LOCAL ONLY) ============
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Query API: /api/query`);
    console.log(`👤 Admin API: /api/admin`);
    console.log(`📈 Quote API: /api/quote`);
  });
}

module.exports = app;
