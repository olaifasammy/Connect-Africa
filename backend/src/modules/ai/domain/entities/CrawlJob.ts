export class CrawlJob {
  constructor(
    public readonly id: string,
    public readonly targetUrl: string,
    public readonly status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED',
    public readonly createdAt: Date
  ) {}
}
