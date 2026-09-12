import { injectable } from 'inversify';

import { IUnitOfWork } from './IUnitOfWork';
import { PostgresProvider } from './PostgresProvider';

@injectable()
export class PostgresUnitOfWork implements IUnitOfWork {
  constructor(
    private readonly postgresProvider: PostgresProvider
  ) {}

  async execute<T>(work: () => Promise<T>): Promise<T> {
    return this.postgresProvider.transaction(work);
  }
}