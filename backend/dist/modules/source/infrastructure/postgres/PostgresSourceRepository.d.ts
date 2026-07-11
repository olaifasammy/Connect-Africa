import { Pool } from 'pg';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { SourceId } from '../../domain/value-objects/SourceValueObjects';
export declare class PostgresSourceRepository implements ISourceRepository {
    private readonly db;
    constructor(db: Pool);
    private mapRowToSource;
    findById(id: SourceId): Promise<Source | null>;
    save(source: Source): Promise<void>;
    delete(id: SourceId): Promise<void>;
}
