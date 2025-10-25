// Utility function to display Google-style stock data without API calls
// Cache for storing historical data for charts

// API URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'https://bullgains-backend.vercel.app';

const historicalDataCache = {
  nifty50: [],
  sensex: [],
  bankNifty: [],
  bse: []
};

// Maximum number of data points to keep for charts
const MAX_DATA_POINTS = 20;

// Market indices information
const MARKET_INDICES = {
  nifty50: {
    name: 'Nifty 50',
    exchange: 'NSE',
    symbol: 'NSEI'
  },
  sensex: {
    name: 'Sensex',
    exchange: 'BSE',
    symbol: 'BSESN'
  },
  bankNifty: {
    name: 'Bank Nifty',
    exchange: 'NSE',
    symbol: 'NSEBANK'
  },
  bse: {
    name: 'BSE',
    exchange: 'Bombay Stock Exchange',
    symbol: 'BSE'
  }
};

// Base values for simulation
const BASE_VALUES = {
  nifty50: {
    current: 25888.90,
    high: 19353.61,
    low: 19117.86,
    open: 19314.26,
    previousClose: 19325.0
  },
  sensex: {
    current: 84556.40,
    high: 66317.56,
    low: 65344.47,
    open: 65485.35,
    previousClose: 64895.0
  },
  bankNifty: {
    current: 58078.05,
    high: 43552.39,
    low: 43124.46,
    open: 43503.89,
    previousClose: 43565.0
  },
  bse: {
    current: 2486.50,
    high: 21676.98,
    low: 21352.36,
    open: 21648.12,
    previousClose: 21725.0
  }
};

// Generate Google-style market data with realistic fluctuations
const generateMarketData = (symbol) => {
  const base = BASE_VALUES[symbol];
  const indexInfo = MARKET_INDICES[symbol];
  if (!base || !indexInfo) return null;

  const current = base.current;
  const change = +(current - (base.previousClose || current)).toFixed(2);
  const changePercent = +(((change) / (base.previousClose || current)) * 100).toFixed(2);

  return {
    name: indexInfo.name,
    exchange: indexInfo.exchange,
    symbol: indexInfo.symbol,
    current: Math.round(current * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    high: Math.round((base.high || current) * 100) / 100,
    low: Math.round((base.low || current) * 100) / 100,
    open: Math.round((base.open || current) * 100) / 100,
    previousClose: base.previousClose,
    timestamp: Date.now()
  };
};

// Get Google-style market data (no API calls)
export const fetchStockQuote = async (symbol) => {
  return generateMarketData(symbol);
};

// Fetch real-time quote via backend proxy
export const fetchRealStockQuote = async (symbol) => {
  try {
    const url = `${API_URL}/api/quote?symbols=${encodeURIComponent(symbol)}`;
    const res = await fetch(url, { method: 'GET' });
    
    if (!res.ok) {
      console.warn(`Quote API returned ${res.status}, using simulated data`);
      return generateMarketData('nifty50');
    }
    
    const json = await res.json();
    
    // Handle our backend response format
    if (json.success && json.data && json.data.length > 0) {
      const quote = json.data[0];
      return {
        name: quote.symbol,
        exchange: 'NSE/BSE',
        symbol: quote.symbol,
        current: parseFloat(quote.price),
        change: parseFloat(quote.change),
        changePercent: parseFloat(quote.changePercent),
        high: parseFloat(quote.price) * 1.02,
        low: parseFloat(quote.price) * 0.98,
        open: parseFloat(quote.price) * 0.99,
        previousClose: parseFloat(quote.price) - parseFloat(quote.change),
        timestamp: Date.now()
      };
    }

    return generateMarketData('nifty50');
  } catch (err) {
    console.error('Error fetching real stock quote:', err);
    return generateMarketData('nifty50');
  }
};

// In-memory cache for batched Yahoo responses
const yahooCache = {};
const CACHE_TTL = 9000; // 9 seconds
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fetch multiple symbols in a single request
const fetchYahooQuotes = async (symbolsArray) => {
  const key = symbolsArray.join(',').toUpperCase();
  const now = Date.now();

  // Return cached if fresh
  const cached = yahooCache[key];
  if (cached && (now - cached.ts) < CACHE_TTL) {
    return cached.data;
  }

  // If backoff is set, skip network call
  if (cached && cached.backoffUntil && now < cached.backoffUntil) {
    return cached.data || null;
  }

  const query = symbolsArray.map(s => encodeURIComponent(s)).join(',');
  const url = `${API_URL}/api/quote?symbols=${query}`;

  let attempt = 0;
  const maxAttempts = 3;
  
  while (attempt < maxAttempts) {
    try {
      const res = await fetch(url, { method: 'GET' });
      
      if (res.status === 429) {
        const delay = 500 * Math.pow(2, attempt);
        attempt += 1;
        await sleep(delay);
        continue;
      }

      if (!res.ok) {
        yahooCache[key] = { ts: now, data: null, backoffUntil: now + 5000 };
        return null;
      }

      const json = await res.json();
      
      // Handle our backend response format
      if (json.success && json.data) {
        const map = {};
        for (const quote of json.data) {
          const sym = quote.symbol.toUpperCase();
          map[sym] = {
            name: quote.symbol,
            exchange: 'NSE/BSE',
            symbol: sym,
            current: parseFloat(quote.price),
            change: parseFloat(quote.change),
            changePercent: parseFloat(quote.changePercent),
            high: parseFloat(quote.price) * 1.02,
            low: parseFloat(quote.price) * 0.98,
            open: parseFloat(quote.price) * 0.99,
            previousClose: parseFloat(quote.price) - parseFloat(quote.change),
            timestamp: Date.now()
          };
        }
        yahooCache[key] = { ts: Date.now(), data: map };
        return map;
      }

      return null;
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err);
      attempt += 1;
      await sleep(300 * attempt);
    }
  }

  yahooCache[key] = { ts: now, data: null, backoffUntil: now + 30000 };
  return null;
};

// Fetch data for all four indices
export const fetchAllMarketData = async () => {
  const symbols = {
    nifty50: 'nifty50',
    sensex: 'sensex',
    bankNifty: 'bankNifty',
    bse: 'bse'
  };

  try {
    const results = [];
    const yahooSymbols = [];
    const mapKeyToYahoo = {};

    for (const [key, symbol] of Object.entries(symbols)) {
      const idxSymbol = MARKET_INDICES[key]?.symbol;
      if (idxSymbol) {
        const caret = `^${idxSymbol}`.toUpperCase();
        const plain = `${idxSymbol}`.toUpperCase();
        yahooSymbols.push(caret);
        yahooSymbols.push(plain);
        mapKeyToYahoo[key] = { caret, plain };
      }
    }

    // Batched call for all index symbols
    const batched = await fetchYahooQuotes(yahooSymbols);

    for (const [key, symbol] of Object.entries(symbols)) {
      let data = null;

      const keys = mapKeyToYahoo[key];
      if (keys && batched) {
        data = batched[keys.caret] || batched[keys.plain] || null;
      }

      // Fallback to simulated data
      if (!data) {
        data = await fetchStockQuote(symbol);
      }

      // Add to historical data cache
      const timestamp = Date.now();
      const dataPoint = {
        timestamp,
        value: data.current,
        change: data.change,
        changePercent: data.changePercent
      };

      historicalDataCache[key].push(dataPoint);
      if (historicalDataCache[key].length > MAX_DATA_POINTS) {
        historicalDataCache[key] = historicalDataCache[key].slice(-MAX_DATA_POINTS);
      }

      results.push({
        key,
        symbol,
        ...data,
        historicalData: [...historicalDataCache[key]]
      });
    }

    return {
      nifty50: results.find(r => r.key === 'nifty50'),
      sensex: results.find(r => r.key === 'sensex'),
      bankNifty: results.find(r => r.key === 'bankNifty'),
      bse: results.find(r => r.key === 'bse'),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// Get historical data for a specific index
export const getHistoricalData = (indexKey) => {
  return historicalDataCache[indexKey] || [];
};

// Format number with Indian locale
export const formatNumber = (num, decimals = 2) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

// Format percentage
export const formatPercentage = (num) => {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};

// Get change color class
export const getChangeColor = (change) => {
  return change >= 0 ? 'text-green-500' : 'text-red-500';
};

// Get change background color
export const getChangeBgColor = (change) => {
  return change >= 0 ? 'bg-green-50' : 'bg-red-50';
};
