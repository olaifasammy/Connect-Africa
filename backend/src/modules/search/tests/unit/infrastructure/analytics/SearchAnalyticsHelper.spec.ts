import { SearchAnalyticsHelper } from '@modules/search/infrastructure/analytics/SearchAnalyticsHelper';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

describe('SearchAnalyticsHelper', () => {
  let mockMetrics: jest.Mocked<IMetricsProvider>;
  let helper: SearchAnalyticsHelper;

  beforeEach(() => {
    mockMetrics = {
      incrementCounter: jest.fn(),
      observeDuration: jest.fn(),
      setGauge: jest.fn(),
    };
    helper = new SearchAnalyticsHelper(mockMetrics);
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
