import { AuditEntry } from '../aggregates/AuditEntry';

export class ImmutableAuditPolicy {
  static canModify(audit: AuditEntry): boolean {
    return false;
  }
}
