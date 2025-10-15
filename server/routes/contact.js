const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { authenticateToken } = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new'
    });

    await contactMessage.save();
    res.status(201).json({ 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact messages (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact message status (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, response } = req.body;
    
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.status = status || message.status;
    message.response = response || message.response;
    message.respondedAt = status === 'responded' ? new Date() : message.respondedAt;

    await message.save();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact message (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
