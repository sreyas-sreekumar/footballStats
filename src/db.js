const { Pool } = require('pg');
require('dotenv').config();
// Inside src/db.js or .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
