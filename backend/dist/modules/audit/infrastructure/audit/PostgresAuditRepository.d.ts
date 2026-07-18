import { Pool } from 'pg';
import { IAuditRepository } from '../../domain/repositories/IAuditRepository';
import { AuditEntry } from '../../domain/aggregates/AuditEntry';
import { AuditSearchCriteria } from '../../domain/repositories/AuditSearchCriteria';
export declare class PostgresAuditRepository implements IAuditRepository {
    private pool;
    constructor(pool: Pool);
    log(entry: AuditEntry): Promise<void>;
    search(criteria: AuditSearchCriteria): Promise<AuditEntry[]>;
    findById(id: string): Promise<AuditEntry | null>;
    private mapRowsToEntries;
}
