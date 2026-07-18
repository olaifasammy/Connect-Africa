import { Queue } from 'bullmq';
export declare const CrawlQueue: Queue<any, any, string, any, any, string>;
export declare const AIProcessingQueue: Queue<any, any, string, any, any, string>;
export declare const RetryQueue: Queue<any, any, string, any, any, string>;
