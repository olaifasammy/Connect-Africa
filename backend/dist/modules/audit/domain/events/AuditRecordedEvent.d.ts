import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { AuditEntry } from '../aggregates/AuditEntry';
export declare class AuditRecordedEvent extends DomainEvent {
    readonly auditEntry: AuditEntry;
    constructor(auditEntry: AuditEntry);
}
