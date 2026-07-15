import { IAuditLogger } from '../domain/interfaces/IAuditLogger';
import { AuditLogger as SharedAuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class AuditLogger implements IAuditLogger {
  static instance: IAuditLogger = new AuditLogger();

  log(data: { status: "SUCCESS" | "FAILURE"; action: string; resource: string; user: string; ipAddress?: string }): void {
    SharedAuditLogger.log({
      ...data,
      ipAddress: data.ipAddress || 'unknown'
    });
  }

  static log(data: { status: "SUCCESS" | "FAILURE"; action: string; resource: string; user: string; ipAddress?: string }): void {
    AuditLogger.instance.log(data);
  }
}
