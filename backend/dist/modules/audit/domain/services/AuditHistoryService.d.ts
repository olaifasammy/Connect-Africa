import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';
export declare class AuditHistoryService {
    private readonly auditRepository;
    constructor(auditRepository: IAuditRepository);
    getResourceHistory(resourceId: string): Promise<AuditEntry[]>;
}
