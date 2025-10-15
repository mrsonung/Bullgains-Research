import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import MarketCard from './MarketCard';
import { fetchAllMarketData } from '../utils/fetchStockData';

const MarketOverview = () => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch market data
  const fetchData = useCallback(async () => {
    if (!isOnline) {
      setError('No internet connection');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchAllMarketData();
      setMarketData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError(err.message || 'Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        fetchData();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchData, isOnline]);

  // Manual refresh
  const handleRefresh = () => {
    fetchData();
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📊 Market Overview (Live Updates)
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Real-time market data for major Indian indices
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Using Finnhub API for real-time market data. 
              Falls back to simulated data if API limits are reached.
            </p>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            
            <div className="w-px h-4 bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Live Data</span>
            </div>
            
            <div className="w-px h-4 bg-gray-300"></div>
            
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Market Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Nifty 50 */}
          <MarketCard
            title="Nifty 50"
            data={marketData?.nifty50}
            isLoading={isLoading}
            error={error}
            className="hover:shadow-xl duration-700 ease-out"
          />

          {/* Sensex */}
          <MarketCard
            title="Sensex"
            data={marketData?.sensex}
            isLoading={isLoading}
            error={error}
            className="hover:shadow-xl duration-700 ease-out"
          />

          {/* Bank Nifty */}
          <MarketCard
            title="Bank Nifty"
            data={marketData?.bankNifty}
            isLoading={isLoading}
            error={error}
            className="hover:shadow-xl duration-700 ease-out"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-4 inline-block">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>
                Last Updated at {formatTime(lastUpdated)}
              </span>
              <span className="text-gray-400">•</span>
              <span>Updates every 30 seconds</span>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <WifiOff className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">Connection Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-red-600 hover:text-red-700 text-sm underline"
            >
              Try again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MarketOverview;
