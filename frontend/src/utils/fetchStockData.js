// Utility function to fetch stock data from Finnhub API
const FINNHUB_API_KEY = 'd3nb77hr01qo7510b2hgd3nb77hr01qo7510b2i0';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Cache for storing historical data for charts
const historicalDataCache = {
  nifty50: [],
  sensex: [],
  bankNifty: []
};

// Maximum number of data points to keep for charts
const MAX_DATA_POINTS = 20;

// Indian market symbols for Finnhub
const FINNHUB_SYMBOLS = {
  nifty50: '^NSEI',
  sensex: '^BSESN',
  bankNifty: '^NSEBANK'
};

// Base values for simulation (realistic Indian market values)
const BASE_VALUES = {
  nifty50: { current: 19450, high: 19520, low: 19380, open: 19400, previousClose: 19325 },
  sensex: { current: 65320, high: 65580, low: 65210, open: 65300, previousClose: 64895 },
  bankNifty: { current: 43850, high: 43980, low: 43720, open: 43800, previousClose: 43565 }
};

// Generate realistic market simulation
const generateSimulatedData = (symbol) => {
  const base = BASE_VALUES[symbol];
  if (!base) return null;

  // Generate random change between -2% and +2%
  const changePercent = (Math.random() - 0.5) * 4;
  const change = (base.current * changePercent) / 100;
  const current = base.current + change;

  return {
    current: Math.round(current * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    high: Math.round((base.high + change) * 100) / 100,
    low: Math.round((base.low + change) * 100) / 100,
    open: Math.round((base.open + change) * 100) / 100,
    previousClose: base.previousClose,
    timestamp: Date.now()
  };
};

// Fetch real-time quote data from Finnhub API
export const fetchStockQuote = async (symbol) => {
  const finnhubSymbol = FINNHUB_SYMBOLS[symbol];
  if (!finnhubSymbol) {
    console.warn(`No symbol mapping found for ${symbol}, using simulated data`);
    return generateSimulatedData(symbol);
  }

  try {
    const response = await fetch(
      `${FINNHUB_BASE_URL}/quote?symbol=${finnhubSymbol}&token=${FINNHUB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we got valid data or if it's a subscription error
    if (data.error || (data.c === 0 && data.d === 0 && data.dp === 0)) {
      console.warn(`Finnhub API subscription required for ${symbol}, using simulated data`);
      return generateSimulatedData(symbol);
    }
    
    return {
      current: data.c || 0,
      change: data.d || 0,
      changePercent: data.dp || 0,
      high: data.h || 0,
      low: data.l || 0,
      open: data.o || 0,
      previousClose: data.pc || 0,
      timestamp: data.t || Date.now()
    };
  } catch (error) {
    console.warn(`Error fetching data for ${symbol}, using simulated data:`, error.message);
    return generateSimulatedData(symbol);
  }
};

// Fetch data for all three indices
export const fetchAllMarketData = async () => {
  const symbols = {
    nifty50: 'nifty50',
    sensex: 'sensex',
    bankNifty: 'bankNifty'
  };

  try {
    const promises = Object.entries(symbols).map(async ([key, symbol]) => {
      try {
        const data = await fetchStockQuote(symbol);
        
        // Add to historical data cache
        const timestamp = new Date().getTime();
        const dataPoint = {
          timestamp,
          value: data.current,
          change: data.change,
          changePercent: data.changePercent
        };
        
        historicalDataCache[key].push(dataPoint);
        
        // Keep only the last MAX_DATA_POINTS
        if (historicalDataCache[key].length > MAX_DATA_POINTS) {
          historicalDataCache[key] = historicalDataCache[key].slice(-MAX_DATA_POINTS);
        }
        
        return {
          key,
          symbol,
          ...data,
          historicalData: [...historicalDataCache[key]]
        };
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        // Return fallback data
        return {
          key,
          symbol,
          current: 0,
          change: 0,
          changePercent: 0,
          high: 0,
          low: 0,
          open: 0,
          previousClose: 0,
          timestamp: Date.now(),
          historicalData: [],
          error: error.message
        };
      }
    });

    const results = await Promise.all(promises);
    
    return {
      nifty50: results.find(r => r.key === 'nifty50'),
      sensex: results.find(r => r.key === 'sensex'),
      bankNifty: results.find(r => r.key === 'bankNifty'),
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
