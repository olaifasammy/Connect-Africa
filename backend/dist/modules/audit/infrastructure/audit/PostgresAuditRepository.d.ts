import { Pool } from 'pg';
import { IAuditRepository, AuditEntry } from '../../domain/repositories/IAuditRepository';
export { AuditEntry } from '../../domain/repositories/IAuditRepository';
export declare class PostgresAuditRepository implements IAuditRepository {
    private pool;
    constructor(pool: Pool);
    log(entry: AuditEntry): Promise<void>;
}
