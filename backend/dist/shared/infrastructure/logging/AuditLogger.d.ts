export interface AuditRecord {
    user: string;
    action: string;
    resource: string;
    status: 'SUCCESS' | 'FAILURE';
    ipAddress?: string;
}
export declare class AuditLogger {
    static log(record: AuditRecord): void;
}
