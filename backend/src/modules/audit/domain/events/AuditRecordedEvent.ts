import { DomainEvent } from '@shared/domain/DomainEvent';
import { AuditEntry } from '../aggregates/AuditEntry';

export class AuditRecordedEvent extends DomainEvent {
  constructor(public readonly auditEntry: AuditEntry) {
    super(auditEntry.id);
  }
}
