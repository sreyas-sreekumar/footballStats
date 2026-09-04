const fs = require('fs');
const path = require('path');
const { pool } = require('../src/db');

async function runMigrations() {
  try {
    const migrationPath = path.join(__dirname, '001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('Running 001_initial_schema.sql migration...');
    await pool.query(sql);
    console.log('Migration successfully applied to PostgreSQL!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigrations();