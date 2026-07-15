import { IMetricsProvider } from '../../../../shared/monitoring/IMetricsProvider';
export declare class SearchAnalyticsHelper {
    private readonly metricsProvider;
    constructor(metricsProvider: IMetricsProvider);
    logSearch(query: string, resultCount: number, durationMs: number): void;
    trackPopularQuery(query: string): void;
}
