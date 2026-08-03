import { AuditEntry } from '../aggregates/AuditEntry';

export class AuditEntryValidator {
  static validate(audit: AuditEntry): void {
    if (!audit.action || audit.action.trim() === '') {
      throw new Error('Audit action is required');
    }
  }
}
