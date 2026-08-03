import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';

export class AiAnalyticsHelper {
  static trackUsage(provider: string, tokens: number, cost: number): void {
    AuditLogger.log({
      user: 'system',
      action: 'AI_USAGE_METRIC',
      resource: `Provider:${provider}`,
      status: 'SUCCESS'
    });
  }

  static trackPopularTopic(topic: string): void {
    AuditLogger.log({
      user: 'system',
      action: 'POPULAR_TOPIC_METRIC',
      resource: `Topic:${topic}`,
      status: 'SUCCESS'
    });
  }

  static trackKnowledgeGap(topic: string): void {
    AuditLogger.log({
      user: 'system',
      action: 'KNOWLEDGE_GAP_METRIC',
      resource: `Topic:${topic}`,
      status: 'SUCCESS'
    });
  }

  static trackCrawlStats(targetUrl: string, pagesCrawled: number): void {
    AuditLogger.log({
      user: 'system',
      action: 'CRAWL_STATS_METRIC',
      resource: `Target:${targetUrl}`,
      status: 'SUCCESS'
    });
  }
}
