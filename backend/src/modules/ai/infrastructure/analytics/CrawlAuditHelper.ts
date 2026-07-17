import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';

export class CrawlAuditHelper {
  static logCrawl(targetUrl: string, action: 'START' | 'STOP'): void {
    AuditLogger.log({
      user: 'admin',
      action: `CRAWL_${action}`,
      resource: `Crawl:${targetUrl}`,
      status: 'SUCCESS'
    });
  }
}
