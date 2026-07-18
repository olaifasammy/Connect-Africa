"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAnalyticsHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class AiAnalyticsHelper {
    static trackUsage(provider, tokens, cost) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'AI_USAGE_METRIC',
            resource: `Provider:${provider}`,
            status: 'SUCCESS'
        });
    }
    static trackPopularTopic(topic) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'POPULAR_TOPIC_METRIC',
            resource: `Topic:${topic}`,
            status: 'SUCCESS'
        });
    }
    static trackKnowledgeGap(topic) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'KNOWLEDGE_GAP_METRIC',
            resource: `Topic:${topic}`,
            status: 'SUCCESS'
        });
    }
    static trackCrawlStats(targetUrl, pagesCrawled) {
        AuditLogger_1.AuditLogger.log({
            user: 'system',
            action: 'CRAWL_STATS_METRIC',
            resource: `Target:${targetUrl}`,
            status: 'SUCCESS'
        });
    }
}
exports.AiAnalyticsHelper = AiAnalyticsHelper;
//# sourceMappingURL=AiAnalyticsHelper.js.map