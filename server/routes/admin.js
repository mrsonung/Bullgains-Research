const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Query = require('../models/Query');

// Middleware to verify admin token
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

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'bullgains-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/queries
// @desc    Get all queries
// @access  Private (Admin)
router.get('/queries', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 50, search } = req.query;

    // Build filter
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

    const queries = await Query.find(filter)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

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
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/queries/export
// @desc    Export all queries as JSON for Excel conversion
// @access  Private (Admin)
router.get('/queries/export', verifyAdmin, async (req, res) => {
  try {
    const queries = await Query.find().sort({ submittedAt: -1 });

    // Format data for Excel
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

    res.json({
      success: true,
      data: exportData,
      count: exportData.length
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Export failed'
    });
  }
});

// @route   PATCH /api/admin/queries/:id
// @desc    Update query status
// @access  Private (Admin)
router.patch('/queries/:id', verifyAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;

    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    if (status) query.status = status;
    if (notes !== undefined) query.notes = notes;
    if (status === 'resolved' && !query.respondedAt) {
      query.respondedAt = new Date();
    }

    await query.save();

    res.json({
      success: true,
      message: 'Query updated successfully',
      data: query
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/admin/queries/:id
// @desc    Delete a query
// @access  Private (Admin)
router.delete('/queries/:id', verifyAdmin, async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.json({
      success: true,
      message: 'Query deleted successfully'
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const total = await Query.countDocuments();
    const pending = await Query.countDocuments({ status: 'pending' });
    const resolved = await Query.countDocuments({ status: 'resolved' });
    const inProgress = await Query.countDocuments({ status: 'in-progress' });

    // Get recent queries (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recent = await Query.countDocuments({ 
      submittedAt: { $gte: sevenDaysAgo } 
    });

    res.json({
      success: true,
      stats: {
        total,
        pending,
        resolved,
        inProgress,
        recent
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
