<<<<<<< HEAD
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('userToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// Product APIs
export const productAPI = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  
  getProductById: (id) => request(`/products/${id}`),
  
  getFeaturedProducts: () => request('/products/featured'),
  
  getProductsByCategory: (category) => request(`/products/category/${category}`),
};

// User APIs
export const userAPI = {
  register: (userData) => request('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (email, password) => request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  
  getProfile: () => request('/users/profile'),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData) => request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getOrderById: (id) => request(`/orders/${id}`),
  
  updateOrderToPaid: (id, paymentData) => request(`/orders/${id}/pay`, {
    method: 'PUT',
    body: JSON.stringify(paymentData),
  }),
};
=======
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getProfile: () => API.get('/auth/profile'),
};

// Products API
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  getFeatured: () => API.get('/products/featured'),
};

// Orders API
export const orderAPI = {
  create: (orderData) => API.post('/orders', orderData),
  getByUser: () => API.get('/orders/user'),
};

export default API;
>>>>>>> bea8be0c633e03e3ee909747f4402995900a250b
