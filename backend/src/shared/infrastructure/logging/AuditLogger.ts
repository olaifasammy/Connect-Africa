import { logger } from '@shared/logger/Logger';

export interface AuditRecord {
  user: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'FAILURE';
  ipAddress?: string;
}

export class AuditLogger {
  static log(record: AuditRecord): void {
    logger.info('AUDIT_LOG', { ...record, timestamp: new Date().toISOString() });
  }
}
