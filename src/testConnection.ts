import pool from "./database/connection";

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Database connected:', rows);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testConnection();
