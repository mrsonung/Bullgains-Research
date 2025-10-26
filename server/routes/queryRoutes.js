const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { sendAdminNotification, sendCustomerConfirmation } = require('../utils/emailService');

// POST /api/query - Submit customer query
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create and save query
    const newQuery = new Query({ name, email, phone, subject, message });
    const savedQuery = await newQuery.save();
    console.log('✅ Query saved to MongoDB:', savedQuery._id);

    // Async: send admin & customer notifications
    Promise.all([
      sendAdminNotification({ name, email, phone, subject, message }),
      sendCustomerConfirmation({ name, email, phone, subject, message })
    ]).catch(err => {
      console.error('📧 Email send failed:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully! Check your email for confirmation.',
      queryId: savedQuery._id
    });
  } catch (error) {
    console.error('Error submitting query:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a query recently. Please wait before submitting another.'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// GET /api/query - Get all queries (with pagination, filter)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const queries = await Query.find(filter)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Query.countDocuments(filter);

    res.status(200).json({
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

// GET /api/query/:id - Get one query by ID
router.get('/:id', async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }
    res.status(200).json({
      success: true,
      data: query
    });
  } catch (error) {
    console.error('Error fetching query:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH /api/query/:id/status - Update status (resolve, mark pending, add notes)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }

    if (status) {
      query.status = status;
      if (status === 'resolved') query.respondedAt = new Date();
    }
    if (notes !== undefined) {
      query.notes = notes;
    }

    await query.save();
    res.status(200).json({
      success: true,
      message: 'Query updated successfully',
      data: query
    });
  } catch (error) {
    console.error('Error updating query:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/query/:id - Delete query
router.delete('/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: 'Query not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Query deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
