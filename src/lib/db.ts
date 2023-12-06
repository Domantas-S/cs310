import { Pool } from 'pg';

// const pool = new Pool({
//   database: import.meta.env.VITE_PGDATABASE,
//   user: import.meta.env.VITE_PGUSER,
//   host: import.meta.env.VITE_PGHOST,
//   port: Number(import.meta.env.VITE_PGPORT || 5432),
// });

const pool = new Pool({
  database: 'phee',
  user: 'postgres',
  host: 'localhost',
  port: 5432,
});

export const connectToDB = async () => await pool.connect();