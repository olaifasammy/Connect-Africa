"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchAnalyticsHelper_1 = require("../../../../../search/infrastructure/analytics/SearchAnalyticsHelper");
describe('SearchAnalyticsHelper', () => {
    let mockMetrics;
    let helper;
    beforeEach(() => {
        mockMetrics = {
            incrementCounter: jest.fn(),
            observeDuration: jest.fn(),
            setGauge: jest.fn(),
        };
        helper = new SearchAnalyticsHelper_1.SearchAnalyticsHelper(mockMetrics);
    });
    it('should track search queries and latency', () => {
        helper.logSearch('test query', 5, 150);
        expect(mockMetrics.incrementCounter).toHaveBeenCalledWith('search_queries_total', { query: 'test query' });
        expect(mockMetrics.observeDuration).toHaveBeenCalledWith('search_latency_seconds', 0.15, { query: 'test query' });
    });
    it('should track zero-result queries', () => {
        helper.logSearch('no results', 0, 100);
        expect(mockMetrics.incrementCounter).toHaveBeenCalledWith('search_zero_results_total', { query: 'no results' });
    });
});
//# sourceMappingURL=SearchAnalyticsHelper.spec.js.map