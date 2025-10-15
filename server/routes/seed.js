const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const Service = require('../models/Service');

// Seed admin user (id used as author/createdBy for seeded data)
async function ensureSeedAdmin() {
  let admin = await User.findOne({ email: 'seed-admin@bullgains.in' });
  if (!admin) {
    admin = new User({
      name: 'Seed Admin',
      email: 'seed-admin@bullgains.in',
      password: 'AdminSeed123',
      role: 'admin'
    });
    await admin.save();
  }
  return admin;
}

// Seed a dummy blog post if none exists
router.post('/blogs', async (req, res) => {
  try {
    const admin = await ensureSeedAdmin();

    const exists = await Blog.findOne({ slug: 'research-note-nifty-outlook' });
    if (exists) {
      return res.json({ message: 'Blog already seeded', blog: exists });
    }

    const blog = new Blog({
      title: 'Research Note: Nifty Outlook and Sector Rotation',
      slug: 'research-note-nifty-outlook',
      excerpt: 'Summary of current market breadth, key support/resistance, and sector rotation cues for the coming week.',
      content: 'This is a dummy research note intended for demonstration. It outlines market structure, breadth indicators, open interest shifts, and relative strength across sectors. Please replace with your official research content.',
      featuredImage: 'https://images.unsplash.com/photo-1551281044-8f63e95a3f53?q=80&w=1200&auto=format&fit=crop',
      author: admin._id,
      tags: ['nifty', 'sector-rotation', 'technical'],
      category: 'market-analysis',
      status: 'published',
      publishedAt: new Date()
    });
    await blog.save();
    res.status(201).json({ message: 'Blog seeded', blog });
  } catch (error) {
    console.error('Seed blogs error:', error);
    res.status(500).json({ message: 'Seed blogs failed' });
  }
});

// Seed core services
router.post('/services', async (req, res) => {
  try {
    const admin = await ensureSeedAdmin();
    const definitions = [
      {
        title: 'Intraday Trading Help',
        shortDescription: 'Real-time intraday signals and risk-managed trade plans.',
        fullDescription: 'Get actionable intraday ideas with entry, stop loss, and targets, plus risk management guidance and live updates.',
        category: 'trading-signals',
        icon: 'TrendingUp',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
        pricing: {
          plan: 'premium',
          price: { monthly: 1499, yearly: 14999 },
          features: ['Live alerts', 'Risk management', 'End-of-day summary'],
          isPopular: true
        },
        features: [
          { title: 'Live Signals', description: 'Actionable alerts with clear rules.' },
          { title: 'Position Sizing', description: 'Capital protection first.' }
        ],
        benefits: ['Clarity', 'Speed', 'Discipline'],
        targetAudience: ['Active intraday traders'],
        deliveryMethod: 'dashboard',
        frequency: 'daily'
      },
      {
        title: 'Long Investment Research',
        shortDescription: 'Fundamental and technical research for multi-quarter ideas.',
        fullDescription: 'In-depth coverage notes, valuation, risk factors, and quarterly updates for long-term investing.',
        category: 'research',
        icon: 'BarChart3',
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
        pricing: {
          plan: 'pro',
          price: { monthly: 1999, yearly: 19999 },
          features: ['Coverage notes', 'Valuation updates', 'Risk tracking']
        },
        features: [
          { title: 'Deep Dives', description: 'Sector and company analysis.' }
        ],
        benefits: ['Conviction', 'Process', 'Transparency'],
        targetAudience: ['Investors with 12-36 month horizon'],
        deliveryMethod: 'dashboard',
        frequency: 'monthly'
      },
      {
        title: 'Mutual Funds Guidance',
        shortDescription: 'Portfolio construction and periodic reviews of mutual funds.',
        fullDescription: 'Model allocations based on goals and risk profile with periodic rebalancing suggestions.',
        category: 'portfolio-management',
        icon: 'PieChart',
        image: 'https://images.unsplash.com/photo-1523958203904-cdcb402031fd?q=80&w=1200&auto=format&fit=crop',
        pricing: {
          plan: 'basic',
          price: { monthly: 799, yearly: 7999 },
          features: ['Goal mapping', 'Rebalance alerts']
        },
        features: [
          { title: 'Goal-Based', description: 'Tailored to risk and horizon.' }
        ],
        benefits: ['Simplicity', 'Discipline'],
        targetAudience: ['Long-term savers'],
        deliveryMethod: 'consultation',
        frequency: 'quarterly'
      },
      {
        title: 'Trading Help (Swing)',
        shortDescription: 'Short-term swing trade setups with risk-reward framework.',
        fullDescription: 'Actionable swing trades with clear entries, exits, and updates.',
        category: 'trading-signals',
        icon: 'LineChart',
        image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop',
        pricing: {
          plan: 'premium',
          price: { monthly: 1299, yearly: 12999 },
          features: ['Alerts', 'Updates']
        },
        features: [
          { title: 'RR Discipline', description: 'Defined stop and targets.' }
        ],
        benefits: ['Structure', 'Consistency'],
        targetAudience: ['Swing traders'],
        deliveryMethod: 'dashboard',
        frequency: 'weekly'
      }
    ];

    const created = [];
    for (const def of definitions) {
      const existing = await Service.findOne({ slug: def.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-') });
      if (existing) { created.push(existing); continue; }
      const service = new Service({
        ...def,
        createdBy: admin._id
      });
      await service.save();
      created.push(service);
    }

    res.status(201).json({ message: 'Services seeded', services: created });
  } catch (error) {
    console.error('Seed services error:', error);
    res.status(500).json({ message: 'Seed services failed' });
  }
});

module.exports = router;


