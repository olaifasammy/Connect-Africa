import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class SearchAuditHelper {
  static logIndexRebuild(userId: string, indexName: string, ipAddress: string): void {
    AuditLogger.log({
      user: userId,
      action: 'SEARCH_INDEX_REBUILD',
      resource: `index:${indexName}`,
      status: 'SUCCESS',
      ipAddress
    });
  }

  static logBulkIndexing(userId: string, count: number, ipAddress: string): void {
    AuditLogger.log({
      user: userId,
      action: 'SEARCH_BULK_INDEX',
      resource: `documents:${count}`,
      status: 'SUCCESS',
      ipAddress
    });
  }

  static logAdminOperation(userId: string, operation: string, resource: string, ipAddress: string): void {
    AuditLogger.log({
      user: userId,
      action: `SEARCH_ADMIN_${operation.toUpperCase()}`,
      resource,
      status: 'SUCCESS',
      ipAddress
    });
  }
}
