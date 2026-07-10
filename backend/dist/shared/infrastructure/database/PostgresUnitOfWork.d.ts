import { IUnitOfWork } from './IUnitOfWork';
import { PostgresProvider } from './PostgresProvider';
export declare class PostgresUnitOfWork implements IUnitOfWork {
    private readonly postgresProvider;
    constructor(postgresProvider: PostgresProvider);
    execute<T>(work: () => Promise<T>): Promise<T>;
}
