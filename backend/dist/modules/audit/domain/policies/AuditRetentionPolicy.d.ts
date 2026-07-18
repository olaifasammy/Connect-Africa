import { AuditEntry } from '../aggregates/AuditEntry';
export declare class AuditRetentionPolicy {
    static isExpired(audit: AuditEntry): boolean;
}
