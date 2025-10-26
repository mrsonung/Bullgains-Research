const mongoose = require('mongoose');

const ComplaintStatsSchema = new mongoose.Schema({
  month: { type: String, required: true },
  source: { type: String, default: 'General' },
  pendingLastMonth: { type: Number, default: 0 },
  received: { type: Number, default: 0 },
  resolved: { type: Number, default: 0 },
  totalPending: { type: Number, default: 0 },
  pendingOverMonths: { type: Number, default: 0 },
  avgResolutionDays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ComplaintStats', ComplaintStatsSchema);
