const { pool } = require('../app');

async function findByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

async function create(userData) {
  const { name, email, password } = userData;
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, password]
  );
  return rows[0];
}

async function findAll() {
  const { rows } = await pool.query('SELECT id, name, email FROM users');
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return rows[0];
}

module.exports = { findByEmail, create, findAll, findById };