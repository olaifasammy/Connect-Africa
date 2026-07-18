import { Pool } from 'pg';
import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
import { Provider } from '../../domain/entities/Provider';
export declare class PostgresProviderRepository implements IProviderRepository {
    private readonly db;
    constructor(db: Pool);
    save(provider: Provider): Promise<void>;
    findById(id: string): Promise<Provider | null>;
    findAllEnabled(): Promise<Provider[]>;
}
