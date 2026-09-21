import axios from 'axios';
const api = axios.create({ baseURL: 'https://fakestoreapi.com' });
export async function getProducts(){ const response = await api.get('/products'); return response.data; }
