import axios from 'axios';
const api = axios.create({ baseURL: 'https://api.escuelajs.co/api/v1' });
const VALID_CATEGORIES = ['Electronics', 'Furniture', 'Miscellaneous', 'Shoes'];
export async function getProducts(){
  const response = await api.get('/products');
  return response.data
    .filter(product => VALID_CATEGORIES.includes(product.category?.name) && product.images?.length > 0)
    .map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category.name,
      image: product.images[0]
    }));
}
