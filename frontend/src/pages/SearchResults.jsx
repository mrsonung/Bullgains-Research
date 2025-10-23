import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MarketCard from '../components/MarketCard';
import { fetchAllMarketData, fetchRealStockQuote } from '../utils/fetchStockData';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const q = query.get('q') || '';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllMarketData();
        // If user searched 'nifty' or 'nifty 50' or 'nifty50', return index
        const key = q.toLowerCase();
        if (key.includes('nifty')) {
          setResults({ type: 'index', data: data.nifty50 });
        } else if (key.includes('sensex')) {
          setResults({ type: 'index', data: data.sensex });
        } else if (key.includes('bank')) {
          setResults({ type: 'index', data: data.bankNifty });
        } else if (key.includes('bse')) {
          setResults({ type: 'index', data: data.bse });
        } else if (q.trim()) {
          // Try real stock quote
          const stock = await fetchRealStockQuote(q.trim());
          setResults({ type: 'stock', data: stock });
        } else {
          setResults({ type: 'none' });
        }
      } catch (err) {
        setError(err.message || 'Search failed');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [q]);

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Search results for "{q}"</h2>

        {loading && <p>Searching...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {results && results.type === 'index' && (
          <div>
            <MarketCard title={results.data.name} data={results.data} />
          </div>
        )}

        {results && results.type === 'stock' && (
          <div>
            <MarketCard title={results.data.symbol || q.toUpperCase()} data={results.data} />
          </div>
        )}

        {results && results.type === 'none' && (
          <p>No query provided. Try searching for "Nifty" or a stock symbol like "RELIANCE".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;