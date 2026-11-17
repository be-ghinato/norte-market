const { pool } = require('../app');

let defaultProducts = [
  {
    id: 1,
    name: 'Notebook Gamer',
    price: 3599.9,
    description: 'Notebook potente para jogos e trabalho',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1495474216165-e6c88622f1b6'
  },
  {
    id: 2,
    name: 'Mouse Gamer',
    price: 199.9,
    description: 'Mouse com iluminação RGB e ergonomia',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1527866113072-6b03b6e9e7f3'
  },
  {
    id: 3,
    name: 'Teclado Mecânico',
    price: 349.9,
    description: 'Teclado mecânico com switches azul',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1536440136223-98d97b4b070d'
  },
  {
    id: 4,
    name: 'Monitor 24 polegadas',
    price: 899.9,
    description: 'Monitor Full HD 144Hz',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1515962290271-4e1a1b3c6a3f'
  },
  {
    id: 5,
    name: 'Cadeira Gamer',
    price: 799.9,
    description: 'Cadeira ergonômica com apoio de cabeça',
    category: 'moveis',
    image: 'https://images.unsplash.com/photo-1551028718-3e5f4721d175'
  }
];

async function findAll() {
  if (process.env.DATABASE_URL) {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    return rows;
  }
  return defaultProducts;
}

async function findById(id) {
  if (process.env.DATABASE_URL) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  }
  return defaultProducts.find((p) => p.id === Number(id));
}

async function create(productData) {
  if (process.env.DATABASE_URL) {
    const { name, price, description, category, image } = productData;
    const { rows } = await pool.query(
      'INSERT INTO products (name, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, description, category, image]
    );
    return rows[0];
  }
  const product = {
    id: defaultProducts.length + 1,
    name,
    price: Number(price),
    description,
    category,
    image
  };
  defaultProducts.push(product);
  return product;
}

async function update(id, productData) {
  if (process.env.DATABASE_URL) {
    const { name, price, description, category, image } = productData;
    const { rows } = await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3, category = $4, image = $5 WHERE id = $6 RETURNING *',
      [name, price, description, category, image, id]
    );
    return rows[0];
  }
  const index = defaultProducts.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;
  const product = { ...defaultProducts[index], ...productData, id: Number(id) };
  defaultProducts[index] = product;
  return product;
}

async function remove(id) {
  if (process.env.DATABASE_URL) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return { id };
  }
  const index = defaultProducts.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;
  defaultProducts.splice(index, 1);
  return { id };
}

module.exports = { findAll, findById, create, update, remove };