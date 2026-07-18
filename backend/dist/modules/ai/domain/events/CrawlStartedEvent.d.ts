export declare class CrawlStartedEvent {
    readonly jobId: string;
    readonly targetUrl: string;
    readonly timestamp: Date;
    constructor(jobId: string, targetUrl: string, timestamp: Date);
}
