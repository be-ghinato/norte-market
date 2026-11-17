const { pool } = require('../app');

async function index(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function show(req, res) {
  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);

    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.json(product.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function store(req, res) {
  try {
    const { name, price, description, category, image } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, price, description, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, description, category, image]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function update(req, res) {
  try {
    const { name, price, description, category, image } = req.body;
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3, category = $4, image = $5 WHERE id = $6 RETURNING *',
      [name, price, description, category, image, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

async function remove(req, res) {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ message: 'Produto removido com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}

module.exports = { index, show, store, update, remove };