import { SearchQuery } from '../queries/SearchQuery';
import { SearchResponseDto } from '../../interfaces/dto/SearchDTOs';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { IMetricsProvider } from '../../../../shared/monitoring/IMetricsProvider';
export declare class SearchQueryHandler {
    private readonly searchRepository;
    private readonly metricsProvider;
    private readonly analytics;
    constructor(searchRepository: ISearchRepository, metricsProvider: IMetricsProvider);
    handle(query: SearchQuery): Promise<SearchResponseDto>;
}
