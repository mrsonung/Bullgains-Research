import React, { useEffect, useState } from 'react';
import { blogAPI } from '../services/api';
import { Calendar, Clock, Eye, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log('Fetching blog posts...');
        const response = await blogAPI.getBlogs();
        console.log('Blog API response:', response);
        setPosts(response.data);
      } catch (e) {
        console.error('Error loading blog posts:', e);
        console.error('Error details:', e.response?.data || e.message);
        
        // Fallback to sample data if API fails
        console.log('Using fallback sample data...');
        const samplePosts = [
          {
            _id: 'sample-1',
            title: 'Market Analysis: Understanding Current Trends',
            slug: 'market-analysis-understanding-current-trends',
            excerpt: 'A comprehensive analysis of current market trends and their implications for investors.',
            category: 'market-analysis',
            featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
            publishedAt: new Date().toISOString(),
            readTime: 5,
            views: 150,
            tags: ['market', 'analysis', 'trends'],
            isFeatured: true
          },
          {
            _id: 'sample-2',
            title: 'Trading Strategies for Beginners',
            slug: 'trading-strategies-for-beginners',
            excerpt: 'Essential trading strategies and tips for new investors entering the market.',
            category: 'trading-tips',
            featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            readTime: 8,
            views: 89,
            tags: ['trading', 'beginners', 'strategies']
          },
          {
            _id: 'sample-3',
            title: 'Research Report: Technology Sector Outlook',
            slug: 'research-report-technology-sector-outlook',
            excerpt: 'Detailed research report on the technology sector and future growth prospects.',
            category: 'research-reports',
            featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            readTime: 12,
            views: 203,
            tags: ['technology', 'research', 'outlook']
          }
        ];
        setPosts(samplePosts);
        setError(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'market-analysis': 'bg-blue-100 text-blue-800',
      'research-reports': 'bg-green-100 text-green-800',
      'trading-tips': 'bg-purple-100 text-purple-800',
      'news-updates': 'bg-orange-100 text-orange-800',
      'educational': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Market Insights & Research</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest market analysis, trading strategies, and investment insights from our expert research team
          </p>
          {posts.length > 0 && posts[0]._id.startsWith('sample-') && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Showing sample content. API connection may be temporarily unavailable.
              </p>
            </div>
          )}
        </div>

        {/* Featured Post */}
        {posts.length > 0 && posts[0].isFeatured && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={posts[0].featuredImage} 
                    alt={posts[0].title} 
                    className="w-full h-64 md:h-full object-cover" 
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(posts[0].category)}`}>
                      {posts[0].category.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">Featured</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{posts[0].title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{posts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(posts[0].publishedAt)}
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      {posts[0].readTime} min read
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Blog Posts Available</h3>
            <p className="text-gray-600">Check back later for our latest insights and analysis.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={post._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                  {post.isFeatured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                      {post.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views || 0}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Market Insights</h2>
            <p className="text-xl mb-6 opacity-90">
              Get the latest market analysis, trading tips, and investment strategies delivered to your inbox.
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

