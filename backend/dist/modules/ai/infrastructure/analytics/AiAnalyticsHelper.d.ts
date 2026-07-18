export declare class AiAnalyticsHelper {
    static trackUsage(provider: string, tokens: number, cost: number): void;
    static trackPopularTopic(topic: string): void;
    static trackKnowledgeGap(topic: string): void;
    static trackCrawlStats(targetUrl: string, pagesCrawled: number): void;
}
