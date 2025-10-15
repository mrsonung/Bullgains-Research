const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: true,
    enum: ['basic', 'premium', 'pro', 'custom']
  },
  price: {
    monthly: {
      type: Number,
      required: true
    },
    yearly: {
      type: Number,
      required: true
    }
  },
  features: [{
    type: String,
    required: true
  }],
  isPopular: {
    type: Boolean,
    default: false
  }
});

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['research', 'analysis', 'trading-signals', 'portfolio-management', 'education', 'consultation']
  },
  icon: {
    type: String,
    required: [true, 'Service icon is required']
  },
  image: {
    type: String,
    required: [true, 'Service image is required']
  },
  pricing: pricingSchema,
  features: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    icon: String
  }],
  benefits: [{
    type: String,
    required: true
  }],
  targetAudience: [{
    type: String,
    required: true
  }],
  deliveryMethod: {
    type: String,
    required: true,
    enum: ['digital', 'email', 'dashboard', 'api', 'consultation']
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'on-demand']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming-soon'],
    default: 'active'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  testimonials: [{
    clientName: String,
    clientCompany: String,
    testimonial: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  faqs: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
serviceSchema.index({ category: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ isFeatured: 1 });
serviceSchema.index({ tags: 1 });

// Generate slug from title
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Virtual for subscriber count
serviceSchema.virtual('subscriberCount').get(function() {
  return this.subscribers.length;
});

// Ensure virtual fields are serialized
serviceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Service', serviceSchema);
