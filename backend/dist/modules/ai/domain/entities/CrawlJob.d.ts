export declare class CrawlJob {
    readonly id: string;
    readonly targetUrl: string;
    readonly status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    readonly createdAt: Date;
    constructor(id: string, targetUrl: string, status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED', createdAt: Date);
}
