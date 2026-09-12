import { injectable } from 'inversify';

import {
  SearchDocument,
  SearchResourceType,
} from '../../domain/models/SearchDocument';

import {
  SearchFilters,
  SearchSort,
  SearchSortOrder,
} from '../../domain/repositories/ISearchRepository';

export interface SearchResultItem {
  readonly document: SearchDocument;
  readonly score: number;
}

export interface SearchResult {
  readonly documents: SearchResultItem[];
  readonly facets?: Record<
    string,
    Record<string, number>
  >;
  readonly total: number;
  readonly nextCursor?: string;
}

@injectable()
export abstract class SearchProvider {
  abstract createIndex(
    name: string,
  ): Promise<void>;

  abstract deleteIndex(
    name: string,
  ): Promise<void>;

  abstract rebuildIndex(
    name: string,
  ): Promise<void>;

  abstract findById(
    id: string,
  ): Promise<SearchDocument | null>;

  abstract index(
    document: SearchDocument,
  ): Promise<void>;

  abstract update(
    document: SearchDocument,
  ): Promise<void>;

  abstract autocomplete(
    query: string,
  ): Promise<string[]>;

  abstract getSuggestions(
    query: string,
  ): Promise<string[]>;

  abstract getTrending(): Promise<string[]>;

  abstract search(
    query: string,
    filters?: SearchFilters,
    sortBy?: SearchSort,
    sortOrder?: SearchSortOrder,
    limit?: number,
    cursor?: string,
    includeFacets?: readonly string[],
  ): Promise<SearchResult>;

  abstract bulkIndex(
    documents: readonly SearchDocument[],
  ): Promise<void>;

  abstract delete(
    id: string,
  ): Promise<void>;
}