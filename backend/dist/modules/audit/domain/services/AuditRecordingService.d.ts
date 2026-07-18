import { IAuditRepository } from '../repositories/IAuditRepository';
import { AuditEntry } from '../aggregates/AuditEntry';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AuditRecordingService {
    private readonly auditRepository;
    private readonly eventBus;
    constructor(auditRepository: IAuditRepository, eventBus: EventBus);
    record(auditEntry: AuditEntry): Promise<void>;
}
