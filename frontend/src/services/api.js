import axios from 'axios';
// Socket.IO disabled for serverless deployment
// import io from 'socket.io-client';

// Base API URL from Vite env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bullgains-backend.vercel.app';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add JWT token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

// --- AUTH API ---
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (data) => api.post('/api/auth/register', data),
  getMe: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/users/profile', data),
  changePassword: (data) => api.put('/api/users/change-password', data),
};

// --- BLOG API ---
export const blogAPI = {
  getBlogs: () => api.get('/api/blog'),
  getBlog: (slug) => api.get(`/api/blog/${slug}`),
  createBlog: (data) => api.post('/api/blog', data),
  updateBlog: (id, data) => api.put(`/api/blog/${id}`, data),
  deleteBlog: (id) => api.delete(`/api/blog/${id}`),
};

// --- SERVICES API ---
export const servicesAPI = {
  getServices: () => api.get('/api/services'),
  getService: (slug) => api.get(`/api/services/${slug}`),
  createService: (data) => api.post('/api/services', data),
  updateService: (id, data) => api.put(`/api/services/${id}`, data),
  deleteService: (id) => api.delete(`/api/services/${id}`),
};

// --- ANALYTICS API ---
export const analyticsAPI = {
  getMarketOverview: () => api.get('/api/analytics/market-overview'),
  getTopStocks: (params) => api.get('/api/analytics/top-stocks', { params }),
  getSectorPerformance: () => api.get('/api/analytics/sector-performance'),
  getMarketSentiment: () => api.get('/api/analytics/market-sentiment'),
  getEconomicIndicators: () => api.get('/api/analytics/economic-indicators'),
  getPortfolioPerformance: () => api.get('/api/analytics/portfolio-performance'),
  getResearchReports: () => api.get('/api/analytics/research-reports'),
};

// --- CONTACT API ---
export const contactAPI = {
  submitContact: (data) => api.post('/api/contact', data),
  getContacts: () => api.get('/api/contact'),
  updateContact: (id, data) => api.put(`/api/contact/${id}`, data),
  deleteContact: (id) => api.delete(`/api/contact/${id}`),
};

// --- QUOTE API ---
export const quoteAPI = {
  getQuote: (symbols) => api.get(`/api/quote?symbols=${symbols}`),
};

// --- HEALTH CHECK ---
export const healthCheck = () => api.get('/api/health');

// --- SOCKET.IO DISABLED FOR SERVERLESS ---
// Socket.IO doesn't work with Vercel serverless functions
// If you need real-time features, consider using polling or webhooks instead

export const socket = null; // Disabled

// Mock socket for components that expect it
export const mockSocket = {
  on: () => {},
  off: () => {},
  emit: () => {},
  connected: false,
};

console.log('ℹ️ Socket.IO disabled (serverless deployment)');
console.log('📡 API Base URL:', API_BASE_URL);

export { api };
export default api;
