const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy endpoint to fetch quotes from Yahoo Finance server-side.
// This avoids CORS and exposing browser-side requests to Yahoo which can return 401/blocked.
// Usage: GET /api/quote?symbols=^NSEI

router.get('/', async (req, res) => {
  const symbols = req.query.symbols;
  if (!symbols) return res.status(400).json({ error: 'symbols query param required' });

  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`;
    const response = await axios.get(url, { timeout: 5000 });
    // axios treats non-2xx as throw, but check anyway
    if (!response || !response.data) {
      return res.status(200).json({ quoteResponse: { result: [] }, upstreamStatus: 'no_data' });
    }

    // If upstream returned OK, forward raw data.
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('Quote proxy error (upstream):', err && err.message ? err.message : err);
    const status = err.response?.status;
    // If upstream returned a status (like 401), do not forward the 401 to browser —
    // instead return a 200 with an empty result so frontend falls back to simulated data.
    if (status) {
      console.warn(`Upstream returned ${status} for symbols=${symbols} — returning empty result for frontend fallback`);
      return res.status(200).json({ quoteResponse: { result: [] }, upstreamStatus: status });
    }

    const body = err.response?.data || err.message || String(err);
    const payload = { error: 'proxy_failure', message: body };
    if (process.env.NODE_ENV === 'development') payload.stack = err.stack;
    res.status(502).json(payload);
  }
});

module.exports = router;
