const { pool } = require('../app');

async function findAll() {
  const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0];
}

async function create(productData) {
  const { name, price, description, category, image } = productData;
  const { rows } = await pool.query(
    'INSERT INTO products (name, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, price, description, category, image]
  );
  return rows[0];
}

async function update(id, productData) {
  const { name, price, description, category, image } = productData;
  const { rows } = await pool.query(
    'UPDATE products SET name = $1, price = $2, description = $3, category = $4, image = $5 WHERE id = $6 RETURNING *',
    [name, price, description, category, image, id]
  );
  return rows[0];
}

async function remove(id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  return { id };
}

module.exports = { findAll, findById, create, update, remove };