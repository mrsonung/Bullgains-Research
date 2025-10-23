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
        const response = await blogAPI.getBlogs();
        setPosts(response.data);
      } catch (e) {
        console.error('Error loading blog posts:', e);
        // Fallback sample data
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
            featuredImage: 'https://plus.unsplash.com/premium_photo-1664298488678-707a87ede1e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            readTime: 12,
            views: 203,
            tags: ['technology', 'research', 'outlook']
          }
        ];
        setPosts(samplePosts);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Brand-aligned category colors
  const getCategoryColor = (category) => {
    const colors = {
      'market-analysis': 'bg-[#0D4C3A]/10 text-[#0D4C3A] border-[#0D4C3A]/20',
      'research-reports': 'bg-[#7ED957]/10 text-[#7ED957] border-[#7ED957]/20',
      'trading-tips': 'bg-[#FFD700]/10 text-[#B8860B] border-[#FFD700]/20',
      'news-updates': 'bg-[#FFA500]/10 text-[#CC6600] border-[#FFA500]/20',
      'educational': 'bg-[#4B5563]/10 text-[#4B5563] border-[#4B5563]/20',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0D4C3A] mx-auto mb-3"></div>
          <p className="text-gray-600 font-medium">Loading market insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center max-w-md">
          <div className="text-[#0D4C3A] text-5xl mb-4">📈</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Research Temporarily Unavailable</h2>
          <p className="text-gray-600 mb-6">We’re refining our latest analysis. Please try again shortly.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-5 py-2.5 bg-[#0D4C3A] text-white rounded-lg hover:bg-[#1A6A50] transition-colors text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Market Insights & Research
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert analysis, actionable strategies, and forward-looking research to empower your investment decisions.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && posts[0].isFeatured && (
          <div className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#0D4C3A]/10 hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={posts[0].featuredImage} 
                    alt={posts[0].title} 
                    className="w-full h-64 md:h-full object-cover" 
                  />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(posts[0].category)}`}>
                      {posts[0].category.replace(/-/g, ' ').toUpperCase()}
                    </span>
                    <span className="ml-3 text-xs text-[#FFD700] font-bold">FEATURED</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{posts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{posts[0].excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {formatDate(posts[0].publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {posts[0].readTime} min
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1.5" />
                        {posts[0].views}
                      </div>
                    </div>
                    <button className="text-[#0D4C3A] font-semibold hover:text-[#1A6A50] transition-colors flex items-center group">
                      Read Full Analysis
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Insights Available</h3>
            <p className="text-gray-500">New research is published weekly. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter(post => !post.isFeatured)
              .map((post) => (
                <article 
                  key={post._id} 
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category.replace(/-/g, ' ').toUpperCase()}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        {post.views}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center text-[10px] px-2 py-1 bg-gray-50 text-gray-600 rounded-md"
                          >
                            <Tag className="w-2.5 h-2.5 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readTime} min read</span>
                    </div>

                    <button 
                      className="w-full py-2.5 text-sm font-medium text-[#0D4C3A] hover:text-[#1A6A50] border border-gray-200 rounded-lg hover:border-[#0D4C3A]/30 transition-colors"
                    >
                      Read Article
                    </button>
                  </div>
                </article>
              ))}
          </div>
        )}

        {/* Premium Newsletter CTA — Gold & Green Theme */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-[#0D4C3A] to-[#1A6A50] rounded-3xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-3">Join Our Research Circle</h2>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              Receive exclusive market briefings, deep-dive reports, and early access to investment theses—curated for discerning investors.
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your.email@domain.com" 
                className="flex-1 px-5 py-3.5 rounded-l-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              <button 
                className="bg-[#FFD700] hover:bg-[#FFC400] text-[#0D4C3A] px-6 py-3.5 rounded-r-xl font-bold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;