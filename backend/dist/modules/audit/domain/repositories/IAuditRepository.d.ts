export interface AuditEntry {
    user: string;
    action: string;
    resource: string;
    status: 'SUCCESS' | 'FAILURE';
    ipAddress?: string;
}
export interface IAuditRepository {
    log(entry: AuditEntry): Promise<void>;
}
