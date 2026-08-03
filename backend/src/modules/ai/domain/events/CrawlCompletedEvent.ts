export class CrawlCompletedEvent {
  constructor(
    public readonly jobId: string,
    public readonly timestamp: Date
  ) {}
}
