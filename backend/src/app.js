const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
  });

  pool.on('error', (err) => {
    console.error('PostgreSQL error', err);
    process.exit(-1);
  });
} else {
  console.warn('No DATABASE_URL environment variable set - using in-memory fallback');
  pool = { query: () => Promise.resolve({ rows: [] }) };
}

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

pool.query('SELECT 1').then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});

module.exports = app;