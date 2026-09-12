import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { AutocompleteQuery } from '../queries/AutocompleteQuery';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';

@provide(AutocompleteQueryHandler, true)
@injectable()
export class AutocompleteQueryHandler {
  constructor(
    @inject('ISearchRepository') private readonly searchRepository: ISearchRepository
  ) {}

  async handle(query: AutocompleteQuery): Promise<string[]> {
    if (query.query.length < 2) return [];
    return await this.searchRepository.autocomplete(query.query);
  }
}
