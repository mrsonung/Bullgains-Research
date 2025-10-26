const express = require('express');
const router = express.Router();
const ComplaintStats = require('../models/ComplaintStats');

// Update or insert complaint stats entry
router.post('/stats', async (req, res) => {
  try {
    const { month, source, pendingLastMonth, received, resolved, totalPending, pendingOverMonths, avgResolutionDays } = req.body;

    if (!month) {
      return res.status(400).json({ success: false, message: 'Month is required' });
    }

    const updated = await ComplaintStats.findOneAndUpdate(
      { month, source },
      {
        source,
        pendingLastMonth,
        received,
        resolved,
        totalPending,
        pendingOverMonths,
        avgResolutionDays
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: updated, message: 'Complaint data updated' });
  } catch (error) {
    console.error('Complaint board update error:', error);
    res.status(500).json({ success: false, message: 'Server error in complaint update' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const data = await ComplaintStats.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Cannot load complaint board' });
  }
});

module.exports = router;
