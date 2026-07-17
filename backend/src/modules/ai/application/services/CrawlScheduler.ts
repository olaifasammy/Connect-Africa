export class CrawlScheduler {
  schedule(targetUrl: string, interval: number): void {
    console.log(`[CRAWL] Scheduling crawl for ${targetUrl} every ${interval}ms`);
  }
}
