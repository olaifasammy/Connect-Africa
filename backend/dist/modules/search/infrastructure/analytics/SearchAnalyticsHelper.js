"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAnalyticsHelper = void 0;
class SearchAnalyticsHelper {
    metricsProvider;
    constructor(metricsProvider) {
        this.metricsProvider = metricsProvider;
    }
    logSearch(query, resultCount, durationMs) {
        this.metricsProvider.incrementCounter('search_queries_total', { query: query.toLowerCase() });
        this.metricsProvider.observeDuration('search_latency_seconds', durationMs / 1000, { query: query.toLowerCase() });
        if (resultCount === 0) {
            this.metricsProvider.incrementCounter('search_zero_results_total', { query: query.toLowerCase() });
        }
    }
    trackPopularQuery(query) {
        this.metricsProvider.incrementCounter('search_popular_queries_total', { query: query.toLowerCase() });
    }
}
exports.SearchAnalyticsHelper = SearchAnalyticsHelper;
//# sourceMappingURL=SearchAnalyticsHelper.js.map