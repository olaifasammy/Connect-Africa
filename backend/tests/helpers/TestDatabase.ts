import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export class TestDatabase {
  private container: StartedPostgreSqlContainer | null = null;
  private pool: Pool | null = null;

  async start(): Promise<void> {
    this.container = await new PostgreSqlContainer('postgres:15-alpine')
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_password')
      .start();

    this.pool = new Pool({
      host: this.container.getHost(),
      port: this.container.getPort(),
      database: this.container.getDatabase(),
      user: this.container.getUsername(),
      password: this.container.getPassword(),
    });

    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    const migrationDir = path.join(__dirname, '../../scripts/migrations');
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
    if (this.container) await this.container.stop();
  }

  getPool(): Pool {
    return this.pool!;
  }
}
