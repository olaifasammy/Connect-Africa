import { HybridSearchService } from '@modules/search/public';

export class ContextRetrievalService {
  constructor(
    private readonly searchService: HybridSearchService
  ) {}

  async retrieve(query: string): Promise<string> {
    const results = await this.searchService.search(query);
    return JSON.stringify(results);
  }
}
