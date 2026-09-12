import { Pool } from 'pg';

export default async () => {
  console.log('\nRunning global test teardown...');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    console.log('Test database cleaned.');
  } catch (error) {
    console.error('Global test teardown failed:', error);
  } finally {
    await pool.end();
  }
};
