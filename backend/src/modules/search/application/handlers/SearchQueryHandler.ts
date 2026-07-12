import { injectable, inject } from 'inversify';
import { SearchQuery } from '../queries/SearchQuery';
import { SearchResponseDto } from '../../interfaces/dto/SearchDTOs';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';

@injectable()
export class SearchQueryHandler {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(query: SearchQuery): Promise<SearchResponseDto> {
    const { request } = query;
    const page = request.page || 1;
    const limit = request.limit || 10;
    const offset = (page - 1) * limit;

    const documents = await this.searchRepository.search(
      request.query, 
      request.filters, 
      request.sortBy, 
      request.sortOrder,
      limit,
      offset
    );
    
    const results = documents.map(doc => ({
      id: doc.id.toString(),
      title: doc.content?.title || 'Untitled',
      resourceType: doc.resourceType,
      snippet: doc.content?.snippet || '',
      score: 0.0 // Placeholder until ranking is implemented in provider
    }));

    return {
      results,
      total: results.length, // TODO: Update ISearchRepository to return total count for pagination
      page,
      limit
    };
  }
}
