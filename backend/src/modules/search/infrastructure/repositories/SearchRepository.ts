import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import {
  SearchDocument,
} from '../../domain/models/SearchDocument';

import {
  ISearchRepository,
  ISearchResult,
  SearchFilters,
  SearchSort,
  SearchSortOrder,
} from '../../domain/repositories/ISearchRepository';

import {
  SearchProvider,
} from '../search/SearchProvider';

@provide('ISearchRepository', true)
@injectable()
export class SearchRepository
  implements ISearchRepository
{
  constructor(
    @inject('SearchProvider')
    private readonly searchProvider: SearchProvider,
  ) {}

  async findById(
    id: UniqueEntityId,
  ): Promise<SearchDocument | null> {
    return this.searchProvider.findById(
      id.toString(),
    );
  }

  async save(
    document: SearchDocument,
  ): Promise<void> {
    /*
     * Provider-level upsert semantics are authoritative.
     * This avoids the race condition caused by a separate
     * find-then-insert/update sequence.
     */
    await this.searchProvider.index(
      document,
    );
  }

  async delete(
    id: UniqueEntityId,
  ): Promise<void> {
    await this.searchProvider.delete(
      id.toString(),
    );
  }

  async autocomplete(
    query: string,
  ): Promise<string[]> {
    return this.searchProvider.autocomplete(
      query,
    );
  }

  async getSuggestions(
    query: string,
  ): Promise<string[]> {
    return this.searchProvider.getSuggestions(
      query,
    );
  }

  async getTrending(): Promise<string[]> {
    return this.searchProvider.getTrending();
  }

  async search(
    query: string,
    filters?: SearchFilters,
    sortBy?: SearchSort,
    sortOrder?: SearchSortOrder,
    limit?: number,
    cursor?: string,
    includeFacets?: readonly string[],
  ): Promise<ISearchResult> {
    return this.searchProvider.search(
      query,
      filters,
      sortBy,
      sortOrder,
      limit,
      cursor,
      includeFacets,
    );
  }

  async bulkSave(
    documents: readonly SearchDocument[],
  ): Promise<void> {
    await this.searchProvider.bulkIndex(
      documents,
    );
  }

  async runInTransaction<T>(
    callback: (
      repository: ISearchRepository,
    ) => Promise<T>,
  ): Promise<T> {
    /*
     * SearchProvider currently owns persistence
     * transactions. Repository-level transaction
     * boundaries will be introduced only when the
     * provider exposes a real transaction context.
     */
    return callback(this);
  }
}