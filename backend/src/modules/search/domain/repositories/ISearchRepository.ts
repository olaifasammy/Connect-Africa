import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import {
  SearchDocument,
  SearchResourceType,
} from '../models/SearchDocument';

export type SearchSort =
  | 'relevance'
  | 'alphabetical'
  | 'dateCreated'
  | 'dateUpdated'
  | 'popularity';

export type SearchSortOrder =
  | 'asc'
  | 'desc';

export interface SearchFilters {
  readonly ontology?: string;
  readonly relationshipType?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
  readonly author?: string;
  readonly language?: string;
  readonly status?: string;
  readonly resourceType?: SearchResourceType;
  readonly dateRange?: {
    readonly start?: string;
    readonly end?: string;
  };
}

export interface SearchResultItem {
  readonly document: SearchDocument;
  readonly score: number;
}

export interface ISearchResult {
  readonly documents: SearchResultItem[];
  readonly facets?: Record<
    string,
    Record<string, number>
  >;
  readonly total: number;
  readonly nextCursor?: string;
}

export interface ISearchRepository {
  findById(
    id: UniqueEntityId,
  ): Promise<SearchDocument | null>;

  save(
    document: SearchDocument,
  ): Promise<void>;

  delete(
    id: UniqueEntityId,
  ): Promise<void>;

  autocomplete(
    query: string,
  ): Promise<string[]>;

  getSuggestions(
    query: string,
  ): Promise<string[]>;

  getTrending(): Promise<string[]>;

  search(
    query: string,
    filters?: SearchFilters,
    sortBy?: SearchSort,
    sortOrder?: SearchSortOrder,
    limit?: number,
    cursor?: string,
    includeFacets?: readonly string[],
  ): Promise<ISearchResult>;

  bulkSave(
    documents: readonly SearchDocument[],
  ): Promise<void>;

  runInTransaction<T>(
    callback: (
      repository: ISearchRepository,
    ) => Promise<T>,
  ): Promise<T>;
}