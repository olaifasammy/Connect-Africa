import { AuditEntry } from '../aggregates/AuditEntry';
export declare class ImmutableAuditPolicy {
    static canModify(audit: AuditEntry): boolean;
}
