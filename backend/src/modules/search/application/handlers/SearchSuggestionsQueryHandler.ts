import { injectable, inject } from 'inversify';
import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';

export class SearchSuggestionsQuery {
  constructor(public readonly query: string) {}
}

@injectable()
export class SearchSuggestionsQueryHandler {
  constructor(@inject('ISearchRepository') private readonly repository: SearchRepository) {}

  async handle(query: SearchSuggestionsQuery): Promise<string[]> {
    return await this.repository.getSuggestions(query.query);
  }
}
