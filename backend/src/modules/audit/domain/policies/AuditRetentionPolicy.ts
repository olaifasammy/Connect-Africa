import { AuditEntry } from '../aggregates/AuditEntry';

export class AuditRetentionPolicy {
  static isExpired(audit: AuditEntry): boolean {
    const retentionPeriodDays = 90;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - retentionPeriodDays);
    return audit.timestamp.getProps().value < expirationDate;
  }
}
