const express = require('express');
const axios = require('axios');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Mock data for demonstration - in production, use real API
const mockMarketData = {
  nifty50: {
    current: 19450.75,
    change: 125.50,
    changePercent: 0.65,
    high: 19520.30,
    low: 19380.45,
    volume: 125000000,
    lastUpdate: new Date()
  },
  sensex: {
    current: 65320.85,
    change: 425.30,
    changePercent: 0.66,
    high: 65580.90,
    low: 65210.25,
    volume: 98000000,
    lastUpdate: new Date()
  },
  bankNifty: {
    current: 43850.20,
    change: 285.75,
    changePercent: 0.66,
    high: 43980.45,
    low: 43720.10,
    volume: 85000000,
    lastUpdate: new Date()
  }
};

const mockStocks = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    current: 2456.80,
    change: 45.20,
    changePercent: 1.87,
    volume: 1250000,
    marketCap: 16650000000000,
    sector: 'Oil & Gas'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    current: 3856.90,
    change: -25.40,
    changePercent: -0.65,
    volume: 850000,
    marketCap: 14200000000000,
    sector: 'IT Services'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    current: 1625.30,
    change: 18.75,
    changePercent: 1.17,
    volume: 2100000,
    marketCap: 12400000000000,
    sector: 'Banking'
  },
  {
    symbol: 'INFY',
    name: 'Infosys',
    current: 1520.85,
    change: -12.30,
    changePercent: -0.80,
    volume: 950000,
    marketCap: 6300000000000,
    sector: 'IT Services'
  },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever',
    current: 2650.40,
    change: 35.60,
    changePercent: 1.36,
    volume: 425000,
    marketCap: 6200000000000,
    sector: 'FMCG'
  }
];

// @route   GET /api/analytics/market-overview
// @desc    Get market overview data
// @access  Public
router.get('/market-overview', async (req, res) => {
  try {
    // In production, fetch from real API
    // const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NSE:RELIANCE&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
    
    // Simulate real-time updates
    const updatedData = { ...mockMarketData };
    Object.keys(updatedData).forEach(key => {
      const change = (Math.random() - 0.5) * 10;
      updatedData[key].current += change;
      updatedData[key].change += change;
      updatedData[key].changePercent = (updatedData[key].change / (updatedData[key].current - updatedData[key].change)) * 100;
      updatedData[key].lastUpdate = new Date();
    });

    res.json({
      markets: updatedData,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Market overview error:', error);
    res.status(500).json({
      message: 'Server error fetching market data'
    });
  }
});

// @route   GET /api/analytics/top-stocks
// @desc    Get top performing stocks
// @access  Public
router.get('/top-stocks', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'changePercent'; // changePercent, volume, marketCap

    // Simulate real-time updates
    const updatedStocks = mockStocks.map(stock => {
      const change = (Math.random() - 0.5) * 50;
      return {
        ...stock,
        current: Math.max(0, stock.current + change),
        change: stock.change + change,
        changePercent: ((stock.change + change) / (stock.current - stock.change)) * 100,
        volume: Math.floor(stock.volume * (0.8 + Math.random() * 0.4))
      };
    });

    // Sort by specified criteria
    updatedStocks.sort((a, b) => {
      if (sortBy === 'changePercent') return b.changePercent - a.changePercent;
      if (sortBy === 'volume') return b.volume - a.volume;
      if (sortBy === 'marketCap') return b.marketCap - a.marketCap;
      return 0;
    });

    res.json({
      stocks: updatedStocks.slice(0, limit),
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Top stocks error:', error);
    res.status(500).json({
      message: 'Server error fetching stock data'
    });
  }
});

// @route   GET /api/analytics/sector-performance
// @desc    Get sector performance data
// @access  Public
router.get('/sector-performance', async (req, res) => {
  try {
    const sectors = [
      { name: 'IT Services', change: 1.25, stocks: 45 },
      { name: 'Banking', change: 0.85, stocks: 38 },
      { name: 'Oil & Gas', change: -0.45, stocks: 25 },
      { name: 'FMCG', change: 0.65, stocks: 32 },
      { name: 'Automobile', change: -1.20, stocks: 28 },
      { name: 'Pharmaceuticals', change: 0.95, stocks: 35 },
      { name: 'Metals', change: -0.75, stocks: 22 },
      { name: 'Power', change: 0.30, stocks: 18 }
    ];

    // Simulate real-time updates
    const updatedSectors = sectors.map(sector => ({
      ...sector,
      change: sector.change + (Math.random() - 0.5) * 2,
      stocks: sector.stocks + Math.floor((Math.random() - 0.5) * 4)
    }));

    res.json({
      sectors: updatedSectors,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Sector performance error:', error);
    res.status(500).json({
      message: 'Server error fetching sector data'
    });
  }
});

// @route   GET /api/analytics/market-sentiment
// @desc    Get market sentiment indicators
// @access  Public
router.get('/market-sentiment', async (req, res) => {
  try {
    const sentiment = {
      overall: {
        score: 65, // 0-100
        trend: 'bullish',
        description: 'Market showing positive sentiment with strong buying interest'
      },
      fearGreed: {
        score: 68,
        level: 'Greed',
        description: 'Investors showing confidence in market conditions'
      },
      volatility: {
        vix: 18.5,
        level: 'Low',
        description: 'Low volatility indicates stable market conditions'
      },
      advanceDecline: {
        advancing: 1250,
        declining: 890,
        unchanged: 145,
        ratio: 1.40
      },
      putCallRatio: {
        ratio: 0.85,
        interpretation: 'Bullish sentiment'
      }
    };

    res.json({
      sentiment,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Market sentiment error:', error);
    res.status(500).json({
      message: 'Server error fetching sentiment data'
    });
  }
});

// @route   GET /api/analytics/economic-indicators
// @desc    Get key economic indicators
// @access  Public
router.get('/economic-indicators', async (req, res) => {
  try {
    const indicators = {
      inflation: {
        cpi: 4.2,
        wpi: 3.8,
        trend: 'stable'
      },
      gdp: {
        growth: 6.5,
        quarter: 'Q3 2024',
        trend: 'positive'
      },
      interestRates: {
        repo: 6.50,
        reverseRepo: 6.25,
        trend: 'stable'
      },
      currency: {
        usdInr: 83.25,
        change: 0.15,
        trend: 'stable'
      },
      crudeOil: {
        price: 85.40,
        change: -1.20,
        trend: 'declining'
      },
      gold: {
        price: 62500,
        change: 850,
        trend: 'rising'
      }
    };

    res.json({
      indicators,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Economic indicators error:', error);
    res.status(500).json({
      message: 'Server error fetching economic data'
    });
  }
});

// @route   GET /api/analytics/portfolio-performance
// @desc    Get portfolio performance metrics (authenticated users)
// @access  Private
router.get('/portfolio-performance', authenticateToken, async (req, res) => {
  try {
    // This would typically fetch user's portfolio data from database
    // For now, returning mock data
    const portfolio = {
      totalValue: 1250000,
      dayChange: 12500,
      dayChangePercent: 1.01,
      totalReturn: 185000,
      totalReturnPercent: 17.36,
      holdings: [
        { symbol: 'RELIANCE', quantity: 100, value: 245680, change: 4520 },
        { symbol: 'TCS', quantity: 50, value: 192845, change: -1270 },
        { symbol: 'HDFCBANK', quantity: 150, value: 243795, change: 2812 }
      ],
      allocation: {
        'Large Cap': 65,
        'Mid Cap': 25,
        'Small Cap': 10
      },
      sectorAllocation: {
        'IT Services': 30,
        'Banking': 25,
        'Oil & Gas': 20,
        'FMCG': 15,
        'Others': 10
      }
    };

    res.json({
      portfolio,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Portfolio performance error:', error);
    res.status(500).json({
      message: 'Server error fetching portfolio data'
    });
  }
});

// @route   GET /api/analytics/research-reports
// @desc    Get research reports analytics (admin only)
// @access  Private/Admin
router.get('/research-reports', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const reports = {
      totalReports: 125,
      thisMonth: 8,
      avgAccuracy: 78.5,
      topPerforming: [
        { title: 'Banking Sector Analysis', accuracy: 85.2, views: 1250 },
        { title: 'IT Services Outlook', accuracy: 82.7, views: 980 },
        { title: 'FMCG Growth Prospects', accuracy: 79.1, views: 750 }
      ],
      categories: {
        'Market Analysis': 45,
        'Stock Recommendations': 32,
        'Sector Reports': 28,
        'Economic Updates': 20
      }
    };

    res.json({
      reports,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Research reports analytics error:', error);
    res.status(500).json({
      message: 'Server error fetching research analytics'
    });
  }
});

module.exports = router;
