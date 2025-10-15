const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { authenticateToken } = require('../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog post (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, tags, featuredImage } = req.body;
    
    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const blog = new Blog({
      title,
      content,
      excerpt,
      slug,
      tags: tags || [],
      featuredImage,
      author: req.user.id,
      status: 'published'
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const { title, content, excerpt, tags, featuredImage, status } = req.body;
    
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.tags = tags || blog.tags;
    blog.featuredImage = featuredImage || blog.featuredImage;
    blog.status = status || blog.status;
    
    // Update slug if title changed
    if (title && title !== blog.title) {
      blog.slug = title.toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
