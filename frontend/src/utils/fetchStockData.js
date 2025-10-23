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

// Attempt to fetch a real-time quote via our server-side proxy (/api/quote).
// This avoids CORS and 401 issues when calling Yahoo from the browser.
export const fetchRealStockQuote = async (symbol) => {
  try {
    const url = `/api/quote?symbols=${encodeURIComponent(symbol)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      // If proxy returns non-OK, fall through to simulated data
      return generateMarketData('nifty50');
    }
    const json = await res.json();
    const quote = json?.quoteResponse?.result?.[0];
    if (!quote) return generateMarketData('nifty50');

    const current = quote.regularMarketPrice ?? quote.ask ?? quote.bid;
    if (typeof current !== 'number') return generateMarketData('nifty50');

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
    return generateMarketData('nifty50');
  }
};

// Fetch a Yahoo quote for an index symbol (do not append suffixes). Returns null on failure.
const fetchYahooQuote = async (symbol) => {
  // This function is now thin wrapper around the batched fetch (fetchYahooQuotes)
  const map = await fetchYahooQuotes([symbol]);
  return map ? map[symbol] || null : null;
};

// In-memory cache for batched Yahoo responses to avoid frequent requests
const yahooCache = {
  // key: joinedSymbols -> { ts: number, data: { SYMBOL: quoteObj, ... }, backoffUntil?: number }
};

const CACHE_TTL = 9000; // 9 seconds cache to match UI refresh cadence

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fetch multiple symbols in a single request, with caching and retry/backoff on 429
const fetchYahooQuotes = async (symbolsArray) => {
  const key = symbolsArray.join(',').toUpperCase();
  const now = Date.now();

  // Return cached if fresh
  const cached = yahooCache[key];
  if (cached && (now - cached.ts) < CACHE_TTL) {
    return cached.data;
  }

  // If a backoff is set and not expired, skip network call
  if (cached && cached.backoffUntil && now < cached.backoffUntil) {
    return cached.data || null;
  }

  const query = symbolsArray.map(s => encodeURIComponent(s)).join(',');
  const url = `/api/quote?symbols=${query}`;

  // Retry with exponential backoff for 429
  let attempt = 0;
  const maxAttempts = 3;
  let lastErr = null;
  while (attempt < maxAttempts) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status === 429) {
        // backoff and retry
        const delay = 500 * Math.pow(2, attempt); // 500ms, 1000ms, 2000ms
        attempt += 1;
        lastErr = { status: 429 };
        await sleep(delay);
        continue;
      }

      if (!res.ok) {
        // store a short-lived cached empty result to avoid tight loops
        yahooCache[key] = { ts: now, data: null, backoffUntil: now + 5000 };
        return null;
      }

      const json = await res.json();
      const results = json?.quoteResponse?.result || [];
      const map = {};
      for (const quote of results) {
        const sym = (quote.symbol || '').toUpperCase();
        const current = quote.regularMarketPrice ?? quote.ask ?? quote.bid;
        const change = quote.regularMarketChange ?? (current - (quote.previousClose || current));
        const changePercent = quote.regularMarketChangePercent ?? (change / (quote.previousClose || current) * 100);
        map[sym] = {
          name: quote.longName || quote.shortName || sym,
          exchange: quote.fullExchangeName || quote.exchange || 'N/A',
          symbol: sym,
          current: typeof current === 'number' ? Math.round(current * 100) / 100 : null,
          change: Math.round((change || 0) * 100) / 100,
          changePercent: Math.round((changePercent || 0) * 100) / 100,
          high: Math.round((quote.regularMarketDayHigh || current || 0) * 100) / 100,
          low: Math.round((quote.regularMarketDayLow || current || 0) * 100) / 100,
          open: Math.round((quote.regularMarketOpen || current || 0) * 100) / 100,
          previousClose: Math.round((quote.previousClose || current || 0) * 100) / 100,
          timestamp: Date.now()
        };
      }

      // Cache successful result
      yahooCache[key] = { ts: Date.now(), data: map };
      return map;
    } catch (err) {
      lastErr = err;
      attempt += 1;
      await sleep(300 * attempt);
    }
  }

  // On repeated failures, set backoff to avoid hammering
  yahooCache[key] = { ts: now, data: null, backoffUntil: now + 30000 };
  return null;
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

    // Prepare Yahoo symbols (caret-prefixed then plain) e.g. ^NSEI,NSEI,^BSESN,BSESN,...
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

    // Do a single batched call for all index symbols
    const batched = await fetchYahooQuotes(yahooSymbols);

    for (const [key, symbol] of Object.entries(symbols)) {
      let data = null;

      const keys = mapKeyToYahoo[key];
      if (keys && batched) {
        // Prefer caret symbol then plain symbol
        data = batched[keys.caret] || batched[keys.plain] || null;
      }

      // If live quote unavailable or batched failed, fall back to simulated data
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
