import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

@provide(SearchAnalyticsHelper, true)
@injectable()
export class SearchAnalyticsHelper {
  constructor(
    @inject('IMetricsProvider') private readonly metricsProvider: IMetricsProvider
  ) {}

  logSearch(query: string, resultCount: number, durationMs: number): void {
    this.metricsProvider.incrementCounter('search_queries_total', { query: query.toLowerCase() });
    this.metricsProvider.observeDuration('search_latency_seconds', durationMs / 1000, { query: query.toLowerCase() });
    if (resultCount === 0) {
      this.metricsProvider.incrementCounter('search_zero_results_total', { query: query.toLowerCase() });
    }
  }

  trackPopularQuery(query: string): void {
    this.metricsProvider.incrementCounter('search_popular_queries_total', { query: query.toLowerCase() });
  }
}
