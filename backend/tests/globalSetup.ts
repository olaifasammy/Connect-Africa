import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default async () => {
  console.log('\nRunning global test setup: Migrating and seeding database...');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    // 1. Reset Database
    await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    
    // 2. Run Migrations
    const migrationsDir = path.join(__dirname, '../scripts/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql') && !file.includes('rollback') && !file.includes('seeds'))
      .sort();
      
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
    }
    
    // 3. Run Seeds
    const seedsDir = path.join(migrationsDir, 'seeds');
    if (fs.existsSync(seedsDir)) {
      const seedFiles = fs.readdirSync(seedsDir).sort();
      for (const file of seedFiles) {
        console.log(`Running seed: ${file}`);
        const sql = fs.readFileSync(path.join(seedsDir, file), 'utf8');
        await pool.query(sql);
      }
    }
    
    console.log('Global test setup complete.');
  } catch (error) {
    console.error('Global test setup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};
