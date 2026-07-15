export declare class SearchAuditHelper {
    static logIndexRebuild(userId: string, indexName: string, ipAddress: string): void;
    static logBulkIndexing(userId: string, count: number, ipAddress: string): void;
    static logAdminOperation(userId: string, operation: string, resource: string, ipAddress: string): void;
}
