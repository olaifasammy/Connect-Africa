import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditSearchCriteria } from '../repositories/AuditSearchCriteria';
import { AuditEntry } from '../aggregates/AuditEntry';
export declare class AuditSearchService {
    private readonly auditRepository;
    constructor(auditRepository: IAuditRepository);
    search(criteria: AuditSearchCriteria): Promise<AuditEntry[]>;
}
