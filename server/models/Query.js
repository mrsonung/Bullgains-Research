const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['research-services', 'subscription', 'technical-support', 'partnership', 'feedback', 'other']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for faster queries
querySchema.index({ email: 1, submittedAt: -1 });
querySchema.index({ status: 1 });

module.exports = mongoose.model('Query', querySchema);
