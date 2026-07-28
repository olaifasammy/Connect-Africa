import { injectable, inject } from 'inversify';
import { SearchQuery } from '../queries/SearchQuery';
import { SearchResponseDto } from '../../interfaces/dto/SearchDTOs';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';
import { SearchAnalyticsHelper } from '../../infrastructure/analytics/SearchAnalyticsHelper';

@injectable()
export class SearchQueryHandler {
  private readonly analytics: SearchAnalyticsHelper;
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository,
    @inject('IMetricsProvider') private readonly metricsProvider: IMetricsProvider
  ) {
    this.analytics = new SearchAnalyticsHelper(metricsProvider);
  }

  async handle(query: SearchQuery): Promise<SearchResponseDto> {
    const { request } = query;
    const page = request.page || 1;
    const limit = request.limit || 10;
    const offset = (page - 1) * limit;

    const startTime = Date.now();
    const { documents, facets } = await this.searchRepository.search(
      request.query, 
      request.filters, 
      request.sortBy, 
      request.sortOrder,
      limit,
      offset,
      request.includeFacets
    );
    const duration = Date.now() - startTime;
    
    this.analytics.logSearch(request.query, documents.length, duration);
    
    const results = documents.map(doc => ({
      id: doc.id.toString(),
      title: doc.content?.title || 'Untitled',
      resourceType: doc.resourceType,
      snippet: doc.content?.snippet || '',
      score: 0.0 // TODO: Properly map rank/score from SearchDocument
    }));

    return {
      results,
      total: results.length, // TODO: Update ISearchRepository to return total count for pagination
      page,
      limit,
      facets
    };
  }
}
