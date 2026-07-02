import { Pool } from 'pg';
import { logger } from '@shared/logger/Logger';
import { appConfig } from '@config/app';

export class PostgresProvider {
  private static pool: Pool;

  static getPool(): Pool {
    if (!this.pool) {
      logger.info('Initializing PostgreSQL connection pool');
      this.pool = new Pool({
        connectionString: appConfig.databaseUrl,
      });

      this.pool.on('error', (err) => {
        logger.error('Unexpected error on idle PostgreSQL client', err);
      });
    }
    return this.pool;
  }
}
