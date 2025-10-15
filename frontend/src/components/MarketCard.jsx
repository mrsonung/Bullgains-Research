import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber, formatPercentage, getChangeColor, getChangeBgColor } from '../utils/fetchStockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketCard = ({ 
  title, 
  data, 
  isLoading = false, 
  error = null,
  className = "" 
}) => {
  const [priceAnimation, setPriceAnimation] = useState(false);
  const [previousPrice, setPreviousPrice] = useState(null);

  // Animate price changes
  useEffect(() => {
    if (data && data.current && previousPrice !== null && previousPrice !== data.current) {
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 1000);
    }
    if (data && data.current) {
      setPreviousPrice(data.current);
    }
  }, [data?.current, previousPrice]);

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0.4
      }
    },
    interaction: {
      intersect: false
    }
  };

  // Prepare chart data
  const chartData = {
    labels: data?.historicalData?.map((_, index) => index) || [],
    datasets: [
      {
        data: data?.historicalData?.map(point => point.value) || [],
        borderColor: data?.change >= 0 ? '#10b981' : '#ef4444',
        backgroundColor: data?.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 ${className}`}>
        <div className="flex items-center mb-4">
          <Activity className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="text-red-600 text-sm">
          Error loading data: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 transition-transform duration-500 ease-out ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeBgColor(data.change)} ${getChangeColor(data.change)}`}>
          {data.change >= 0 ? (
            <TrendingUp className="w-3 h-3 inline mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 inline mr-1" />
          )}
          {formatPercentage(data.changePercent)}
        </div>
      </div>

      {/* Price */}
      <AnimatePresence>
        <motion.div
          key={data.current}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-3xl font-bold mb-2 ${priceAnimation ? 'animate-pulse' : ''} ${getChangeColor(data.change)}`}
        >
          ₹{formatNumber(data.current)}
        </motion.div>
      </AnimatePresence>

      {/* Change */}
      <div className={`text-sm ${getChangeColor(data.change)} mb-4`}>
        {data.change >= 0 ? '+' : ''}{formatNumber(data.change)} ({formatPercentage(data.changePercent)})
      </div>

      {/* Mini Chart */}
      <div className="h-20 mb-4">
        {data.historicalData && data.historicalData.length > 1 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No chart data available
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
        <div>
          <span className="font-medium">High:</span> ₹{formatNumber(data.high)}
        </div>
        <div>
          <span className="font-medium">Low:</span> ₹{formatNumber(data.low)}
        </div>
        <div>
          <span className="font-medium">Open:</span> ₹{formatNumber(data.open)}
        </div>
        <div>
          <span className="font-medium">Prev Close:</span> ₹{formatNumber(data.previousClose)}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketCard;
