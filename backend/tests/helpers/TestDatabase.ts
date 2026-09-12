import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export class TestDatabase {
  private pool: Pool | null = null;

  async start(): Promise<void> {
    this.pool = new Pool({
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT || '5432', 10),
      database: process.env.TEST_DB_NAME || 'test_db',
      user: process.env.TEST_DB_USER || 'test_user',
      password: process.env.TEST_DB_PASSWORD || 'test_password',
    });

    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    const migrationDir = path.join(__dirname, '../../scripts/migrations');
    
    // Check if migration directory exists before reading
    if (!fs.existsSync(migrationDir)) {
      console.warn(`Migration directory not found at ${migrationDir}, skipping migrations.`);
      return;
    }

    const files = fs.readdirSync(migrationDir).sort();

    for (const file of files) {
      if (file.endsWith('.sql') && !file.includes('rollback') && !file.includes('seed')) {
        const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
        await this.pool!.query(sql);
      }
    }
  }

  async stop(): Promise<void> {
    if (this.pool) await this.pool.end();
  }

  getPool(): Pool {
    return this.pool!;
  }
}
