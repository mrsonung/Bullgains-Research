const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticateToken } = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, status: 'active' });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create service (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      category,
      icon,
      image,
      pricing,
      features,
      benefits,
      targetAudience,
      deliveryMethod,
      frequency,
      status,
      isFeatured,
      tags,
    } = req.body;

    const slug = title.toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const service = new Service({
      title,
      slug,
      shortDescription,
      fullDescription,
      category,
      icon,
      image,
      pricing,
      features: features || [],
      benefits: benefits || [],
      targetAudience: targetAudience || [],
      deliveryMethod,
      frequency,
      status: status || 'active',
      isFeatured: !!isFeatured,
      tags: tags || [],
      createdBy: req.user.id,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update service (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const {
      title,
      shortDescription,
      fullDescription,
      category,
      icon,
      image,
      pricing,
      features,
      benefits,
      targetAudience,
      deliveryMethod,
      frequency,
      status,
      isFeatured,
      tags,
    } = req.body;

    service.title = title || service.title;
    service.shortDescription = shortDescription || service.shortDescription;
    service.fullDescription = fullDescription || service.fullDescription;
    service.category = category || service.category;
    service.icon = icon || service.icon;
    service.image = image || service.image;
    service.pricing = pricing || service.pricing;
    service.features = features || service.features;
    service.benefits = benefits || service.benefits;
    service.targetAudience = targetAudience || service.targetAudience;
    service.deliveryMethod = deliveryMethod || service.deliveryMethod;
    service.frequency = frequency || service.frequency;
    service.status = status || service.status;
    service.isFeatured = typeof isFeatured === 'boolean' ? isFeatured : service.isFeatured;
    service.tags = tags || service.tags;
    
    // Update slug if title changed
    if (title && title !== service.title) {
      service.slug = title.toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    await service.save();
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
