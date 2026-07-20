import { Pool } from 'pg';
import { logger } from '@shared/logger/Logger';
import { appConfig } from '@config/app';
import { DatabaseProvider } from './DatabaseProvider';

export class PostgresProvider extends DatabaseProvider {
  private _pool: Pool;

  constructor() {
    super();
    logger.info('Initializing PostgreSQL connection pool');
    this._pool = new Pool({
      connectionString: appConfig.databaseUrl,
    });

    this._pool.on('error', (err) => {
      logger.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  get pool(): Pool {
    return this._pool;
  }

  async connect(): Promise<void> {
    await this.pool.query('SELECT 1');
    logger.info('PostgreSQL connected');
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    logger.info('PostgreSQL disconnected');
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.pool.query('SELECT 1');
      return true;
    } catch (err) {
      logger.error('PostgreSQL health check failed', err);
      return false;
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params);
  }
}
