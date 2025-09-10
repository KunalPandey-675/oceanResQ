import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('ResQ-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ResQ-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Reports API
export const reportsAPI = {
  getAll: (params = {}) => api.get('/api/reports', { params }),
  getById: (id) => api.get(`/api/reports/${id}`),
  create: (data) => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(data).forEach(key => {
      if (key !== 'evidence' && data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    // Append files
    if (data.evidence && data.evidence.length > 0) {
      data.evidence.forEach(file => {
        formData.append('evidence', file);
      });
    }
    
    return api.post('/api/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, data) => api.put(`/api/reports/${id}`, data),
  delete: (id) => api.delete(`/api/reports/${id}`),
  getRecent: () => api.get('/api/reports/recent'),
  getNearby: (lat, lng, radius = 10) => 
    api.get('/api/reports/location/nearby', { params: { lat, lng, radius } }),
};

// Analytics API
export const analyticsAPI = {
  getAnalytics: (timeframe = '30d') => api.get('/api/analytics', { params: { timeframe } }),
  getDashboard: () => api.get('/api/analytics/dashboard'),
  exportData: (format = 'json', timeframe = '30d') => 
    api.get('/api/analytics/export', { params: { format, timeframe } }),
};

// Status API
export const statusAPI = {
  getStatus: () => api.get('/api/status'),
  getHealth: () => api.get('/api/health'),
  getMetrics: () => api.get('/api/status/metrics'),
  createAlert: (data) => api.post('/api/status/alert', data),
};

// Upload API
export const uploadAPI = {
  uploadSingle: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadMultiple: (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return api.post('/api/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getFile: (filename) => api.get(`/api/upload/${filename}`, { responseType: 'blob' }),
  deleteFile: (filename) => api.delete(`/api/upload/${filename}`),
  getFileInfo: (filename) => api.get(`/api/upload/info/${filename}`),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred';
    return { message, status: error.response.status };
  } else if (error.request) {
    // Request was made but no response received
    return { message: 'Network error. Please check your connection.', status: 0 };
  } else {
    // Something else happened
    return { message: 'An unexpected error occurred', status: -1 };
  }
};

export default api;
