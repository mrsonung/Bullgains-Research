// Utility function to display Google-style stock data without API calls
// Cache for storing historical data for charts
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

// Base values for simulation (using the dummy/current snapshot provided by the user)
const BASE_VALUES = {
  nifty50: {
    current: 123456.51,
    high: 19353.61,
    low: 19117.86,
    open: 19314.26,
    previousClose: 19325.0
  },
  sensex: {
    current: 65690.69,
    high: 66317.56,
    low: 65344.47,
    open: 65485.35,
    previousClose: 64895.0
  },
  bankNifty: {
    current: 43257.79,
    high: 43552.39,
    low: 43124.46,
    open: 43503.89,
    previousClose: 43565.0
  },
  bse: {
    current: 21546.23,
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

  // Use the provided snapshot values as the current display (deterministic).
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

// Attempt to fetch a real-time quote from Yahoo Finance public endpoint.
// If it fails or the symbol isn't available, fall back to simulated data.
export const fetchRealStockQuote = async (symbol) => {
  // For general tickers, try symbol variants (plain, .NS, .BO)
  const trySymbols = [symbol, `${symbol}.NS`, `${symbol}.BO`];

  for (const s of trySymbols) {
    try {
      const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(s)}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = await res.json();
      const quote = json?.quoteResponse?.result?.[0];
      if (!quote) continue;

      const current = quote.regularMarketPrice ?? quote.ask ?? quote.bid;
      if (typeof current !== 'number') continue;

      const change = quote.regularMarketChange ?? (current - (quote.previousClose || current));
      const changePercent = quote.regularMarketChangePercent ?? (change / (quote.previousClose || current) * 100);

      return {
        name: quote.longName || quote.shortName || symbol,
        exchange: quote.fullExchangeName || quote.exchange || 'N/A',
        symbol: quote.symbol || s,
        current: Math.round(current * 100) / 100,
        change: Math.round((change || 0) * 100) / 100,
        changePercent: Math.round((changePercent || 0) * 100) / 100,
        high: Math.round((quote.regularMarketDayHigh || current) * 100) / 100,
        low: Math.round((quote.regularMarketDayLow || current) * 100) / 100,
        open: Math.round((quote.regularMarketOpen || current) * 100) / 100,
        previousClose: Math.round((quote.previousClose || current) * 100) / 100,
        timestamp: Date.now()
      };
    } catch (err) {
      // ignore and try next symbol
    }
  }

  // Fallback to simulated market data
  return generateMarketData('nifty50');
};

// Fetch a Yahoo quote for an index symbol (do not append suffixes). Returns null on failure.
const fetchYahooQuote = async (symbol) => {
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbol)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const quote = json?.quoteResponse?.result?.[0];
    if (!quote) return null;

    const current = quote.regularMarketPrice ?? quote.ask ?? quote.bid;
    if (typeof current !== 'number') return null;

    const change = quote.regularMarketChange ?? (current - (quote.previousClose || current));
    const changePercent = quote.regularMarketChangePercent ?? (change / (quote.previousClose || current) * 100);

    return {
      name: quote.longName || quote.shortName || symbol,
      exchange: quote.fullExchangeName || quote.exchange || 'N/A',
      symbol: quote.symbol || symbol,
      current: Math.round(current * 100) / 100,
      change: Math.round((change || 0) * 100) / 100,
      changePercent: Math.round((changePercent || 0) * 100) / 100,
      high: Math.round((quote.regularMarketDayHigh || current) * 100) / 100,
      low: Math.round((quote.regularMarketDayLow || current) * 100) / 100,
      open: Math.round((quote.regularMarketOpen || current) * 100) / 100,
      previousClose: Math.round((quote.previousClose || current) * 100) / 100,
      timestamp: Date.now()
    };
  } catch (err) {
    return null;
  }
};

// Fetch data for all four indices (Google-style, no API calls)
export const fetchAllMarketData = async () => {
  const symbols = {
    nifty50: 'nifty50',
    sensex: 'sensex',
    bankNifty: 'bankNifty',
    bse: 'bse'
  };

  try {
    const results = [];

    for (const [key, symbol] of Object.entries(symbols)) {
      let data = null;

      // Try live Yahoo index quotes for known indices using caret-prefixed symbols
      const indexSymbol = MARKET_INDICES[key]?.symbol;
      if (indexSymbol) {
        // Try caret-prefixed common Yahoo index symbol first (e.g. ^NSEI)
        const yahooAttempts = [`^${indexSymbol}`, indexSymbol];
        for (const s of yahooAttempts) {
          const q = await fetchYahooQuote(s);
          if (q) {
            data = q;
            break;
          }
        }
      }

      // If live quote unavailable, fall back to local simulated data
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
