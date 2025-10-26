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
app.set('trust proxy', 1);

// Connect MongoDB
connectDB().catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://bullgains.in',
  'https://www.bullgains.in',
  'https://bullgains.vercel.app',
  'https://bullgains-backend.vercel.app',
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


module.exports = app;
