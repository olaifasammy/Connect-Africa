import { logger } from '@shared/logger/Logger';

export class CrawlScheduler {
  schedule(targetUrl: string, interval: number): void {
    logger.info(`[CRAWL] Scheduling crawl for ${targetUrl} every ${interval}ms`);
  }
}
