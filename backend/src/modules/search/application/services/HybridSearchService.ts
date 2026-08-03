import { injectable, inject } from 'inversify';
import { ISemanticSearchProvider } from '@modules/search/domain/services/ISemanticSearchProvider';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';
import { SearchDocument } from '@modules/search/domain/models/SearchDocument';

@injectable()
export class HybridSearchService {
  constructor(
    @inject('ISemanticSearchProvider') private readonly semanticProvider: ISemanticSearchProvider,
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async search(query: string, limit: number = 10): Promise<SearchDocument[]> {
    // 1. Get embedding for the query
    const embedding = await this.semanticProvider.embed(query);
    
    // 2. Perform semantic search to get IDs
    const semanticIds = await this.semanticProvider.search(embedding, limit * 2);
    
    // 3. Perform full-text search using existing repository
    const fullTextResults = await this.searchRepository.search(query, undefined, 'relevance', 'desc', limit * 2);
    
    // 4. Combine and deduplicate (Simple implementation, can be improved with RRF)
    const combinedResults = new Map<string, SearchDocument>();
    
    for (const doc of fullTextResults.documents) {
        combinedResults.set(doc.id.toString(), doc);
    }
    
    // Placeholder for fetching documents by IDs from semantic search
    // In a production system, these would be fetched efficiently.
    
    return Array.from(combinedResults.values()).slice(0, limit);
  }
}
