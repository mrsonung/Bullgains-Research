// import axios from 'axios';

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   timeout: 20000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle 401 errors (unauthorized)
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
    
//     // Handle network errors
//     if (!error.response) {
//       console.error('Network error:', error.message);
//     }
    
//     return Promise.reject(error);
//   }
// );

// // API service functions
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
//   getMe: () => api.get('/auth/me'),
//   updateProfile: (data) => api.put('/users/profile', data),
//   changePassword: (data) => api.put('/users/change-password', data),
// };

// export const blogAPI = {
//   getBlogs: () => api.get('/blog'),
//   getBlog: (slug) => api.get(`/blog/${slug}`),
//   createBlog: (data) => api.post('/blog', data),
//   updateBlog: (id, data) => api.put(`/blog/${id}`, data),
//   deleteBlog: (id) => api.delete(`/blog/${id}`),
// };

// export const servicesAPI = {
//   getServices: () => api.get('/services'),
//   getService: (slug) => api.get(`/services/${slug}`),
//   createService: (data) => api.post('/services', data),
//   updateService: (id, data) => api.put(`/services/${id}`, data),
//   deleteService: (id) => api.delete(`/services/${id}`),
// };

// export const analyticsAPI = {
//   getMarketOverview: () => api.get('/analytics/market-overview'),
//   getTopStocks: (params) => api.get('/analytics/top-stocks', { params }),
//   getSectorPerformance: () => api.get('/analytics/sector-performance'),
//   getMarketSentiment: () => api.get('/analytics/market-sentiment'),
//   getEconomicIndicators: () => api.get('/analytics/economic-indicators'),
//   getPortfolioPerformance: () => api.get('/analytics/portfolio-performance'),
//   getResearchReports: () => api.get('/analytics/research-reports'),
// };

// export const contactAPI = {
//   submitContact: (data) => api.post('/contact', data),
//   getContacts: () => api.get('/contact'),
//   updateContact: (id, data) => api.put(`/contact/${id}`, data),
//   deleteContact: (id) => api.delete(`/contact/${id}`),
// };

// // Health check
// export const healthCheck = () => api.get('/health');

// export { api };
// export default api;


import axios from 'axios';
import { io } from 'socket.io-client';

// Base API URL from Vite env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies or auth headers
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
    if (!error.response) console.error('Network error:', error.message);
    return Promise.reject(error);
  }
);

// --- AUTH API ---
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
};

// --- BLOG API ---
export const blogAPI = {
  getBlogs: () => api.get('/blog'),
  getBlog: (slug) => api.get(`/blog/${slug}`),
  createBlog: (data) => api.post('/blog', data),
  updateBlog: (id, data) => api.put(`/blog/${id}`, data),
  deleteBlog: (id) => api.delete(`/blog/${id}`),
};

// --- SERVICES API ---
export const servicesAPI = {
  getServices: () => api.get('/services'),
  getService: (slug) => api.get(`/services/${slug}`),
  createService: (data) => api.post('/services', data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
};

// --- ANALYTICS API ---
export const analyticsAPI = {
  getMarketOverview: () => api.get('/analytics/market-overview'),
  getTopStocks: (params) => api.get('/analytics/top-stocks', { params }),
  getSectorPerformance: () => api.get('/analytics/sector-performance'),
  getMarketSentiment: () => api.get('/analytics/market-sentiment'),
  getEconomicIndicators: () => api.get('/analytics/economic-indicators'),
  getPortfolioPerformance: () => api.get('/analytics/portfolio-performance'),
  getResearchReports: () => api.get('/analytics/research-reports'),
};

// --- CONTACT API ---
export const contactAPI = {
  submitContact: (data) => api.post('/contact', data),
  getContacts: () => api.get('/contact'),
  updateContact: (id, data) => api.put(`/contact/${id}`, data),
  deleteContact: (id) => api.delete(`/contact/${id}`),
};

// --- HEALTH CHECK ---
export const healthCheck = () => api.get('/health');

// --- SOCKET.IO SETUP ---
export const socket = io(API_BASE_URL.replace('/api', ''), {
  transports: ['websocket', 'polling'],
  withCredentials: true, // Important to send cookies if backend uses them
});

socket.on('connect', () => {
  console.log('📊 Connected to backend Socket.IO:', socket.id);
});

socket.on('disconnect', () => {
  console.log('📊 Disconnected from backend Socket.IO');
});

export { api };
export default api;

