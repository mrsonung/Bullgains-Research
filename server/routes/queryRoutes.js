const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { sendAdminNotification, sendCustomerConfirmation } = require('../utils/emailService');

// @route   POST /api/query
// @desc    Submit a customer query
// @access  Public
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

    // Create new query
    const newQuery = new Query({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to database
    const savedQuery = await newQuery.save();
    console.log('✅ Query saved to MongoDB:', savedQuery._id);

    // Send emails asynchronously (non-blocking)
    // This won't delay the response to the user
    Promise.all([
      sendAdminNotification({
        name,
        email,
        phone,
        subject,
        message
      }),
      sendCustomerConfirmation({
        name,
        email,
        phone,
        subject,
        message
      })
    ]).then(results => {
      console.log('📧 Email sending results:', results);
    }).catch(err => {
      console.error('📧 Email sending failed (non-blocking):', err.message);
      // Don't fail the request if email fails
    });

    // Send success response immediately
    res.status(201).json({
      success: true,
      message: 'Query submitted successfully! Check your email for confirmation.',
      queryId: savedQuery._id
    });

  } catch (error) {
    console.error('Error submitting query:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Handle duplicate email within short time (optional)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a query recently. Please wait before submitting another.'
      });
    }

    // Generic error
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/query
// @desc    Get all queries (Admin only - add authentication middleware)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const queries = await Query.find(filter)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

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

// @route   GET /api/query/:id
// @desc    Get single query by ID
// @access  Private
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
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PATCH /api/query/:id/status
// @desc    Update query status
// @access  Private
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;

    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    query.status = status || query.status;
    query.notes = notes || query.notes;

    if (status === 'resolved' && !query.respondedAt) {
      query.respondedAt = new Date();
    }

    await query.save();

    res.status(200).json({
      success: true,
      message: 'Query updated successfully',
      data: query
    });

  } catch (error) {
    console.error('Error updating query:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/query/:id
// @desc    Delete a query
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Query deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
