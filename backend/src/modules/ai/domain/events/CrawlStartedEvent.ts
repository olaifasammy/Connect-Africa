export class CrawlStartedEvent {
  constructor(
    public readonly jobId: string,
    public readonly targetUrl: string,
    public readonly timestamp: Date
  ) {}
}
