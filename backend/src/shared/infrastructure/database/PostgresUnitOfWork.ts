import { IUnitOfWork } from './IUnitOfWork';
import { PostgresProvider } from './PostgresProvider';

export class PostgresUnitOfWork implements IUnitOfWork {
  constructor(private readonly postgresProvider: PostgresProvider) {}

  async execute<T>(work: () => Promise<T>): Promise<T> {
    const client = await this.postgresProvider.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await work();
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
