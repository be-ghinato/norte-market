import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://norte-market-backend.onrender.com/api';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function mapProduct(product) {
  return {
    id: product.id,
    title: product.name,
    price: Number(product.price),
    description: product.description || `Produto da categoria ${product.category}`,
    category: product.category,
    image:
      product.image ||
      `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`,
    stock: product.stock
  };
}

export async function getProducts() {
  const { data } = await api.get('/products');
  return Array.isArray(data) ? data.map(mapProduct) : [];
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return mapProduct(data);
}

export async function register(user) {
  const { data } = await api.post('/auth/register', user);
  return data;
}

export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) {
    localStorage.setItem('nm_token', data.token);
  }
  return data;
}

export async function me() {
  const { data } = await api.get('/auth/me');
  return data.user;
}

export function logout() {
  localStorage.removeItem('nm_token');
}

export function getToken() {
  return localStorage.getItem('nm_token');
}

export async function createOrder(order) {
  const { data } = await api.post('/orders', order);
  return data;
}

export async function getMyOrders() {
  const { data } = await api.get('/orders/me');
  return Array.isArray(data) ? data : [];
}
