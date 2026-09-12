import { AsyncLocalStorage } from 'node:async_hooks';
import { injectable } from 'inversify';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

import { logger } from '@shared/logger/Logger';
import { appConfig } from '@config/app';
import { DatabaseProvider } from './DatabaseProvider';

export type PostgresQueryResult<
  T extends QueryResultRow = any,
> = QueryResult<T>;

@injectable()
export class PostgresProvider extends DatabaseProvider {
  private readonly _pool: Pool;

  /**
   * Transaction clients are scoped to the current asynchronous execution
   * context. This prevents concurrent requests from sharing a transaction.
   */
  private readonly transactionClients =
    new AsyncLocalStorage<PoolClient>();

  constructor() {
    super();

    this._pool = new Pool({
      connectionString: appConfig.databaseUrl,
    });

    this._pool.on('error', (err) => {
      logger.error(
        'Unexpected error on idle PostgreSQL client',
        err
      );
    });
  }

  get pool(): Pool {
    return this._pool;
  }

  async connect(): Promise<void> {
    try {
      await this.pool.query('SELECT 1');
    } catch (error) {
      logger.warn(
        'Failed to connect to PostgreSQL during initialization:',
        error
      );

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.pool.query('SELECT 1');
      return true;
    } catch (error) {
      logger.error(
        'PostgreSQL health check failed',
        error
      );

      return false;
    }
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    const transactionClient = this.transactionClients.getStore();

    if (transactionClient) {
      return transactionClient.query<T>(text, params);
    }

    return this.pool.query<T>(text, params);
  }

  async transaction<T>(
    work: () => Promise<T>
  ): Promise<T> {
    const existingClient = this.transactionClients.getStore();

    /*
     * Prevent accidental nested transactions from opening a second
     * PostgreSQL connection. Nested work participates in the existing
     * transaction.
     */
    if (existingClient) {
      return work();
    }

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      return await this.transactionClients.run(
        client,
        async () => {
          const result = await work();

          await client.query('COMMIT');

          return result;
        }
      );
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        logger.error(
          'Failed to rollback PostgreSQL transaction',
          rollbackError
        );
      }

      throw error;
    } finally {
      client.release();
    }
  }
}