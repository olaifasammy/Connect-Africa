import { SearchDocument } from '../../domain/models/SearchDocument';

export interface SearchResult {
  documents: SearchDocument[];
  facets?: Record<string, Record<string, number>>;
}

export abstract class SearchProvider {
  // Index Operations
  abstract createIndex(name: string): Promise<void>;
  abstract deleteIndex(name: string): Promise<void>;
  abstract rebuildIndex(name: string): Promise<void>;

  // Document Operations
  abstract findById(id: string): Promise<SearchDocument | null>;
  abstract index(document: SearchDocument): Promise<void>; // Create
  abstract update(document: SearchDocument): Promise<void>; // Update
  abstract autocomplete(query: string): Promise<string[]>;
  abstract getSuggestions(query: string): Promise<string[]>;
  abstract getTrending(): Promise<string[]>;
  abstract search(
    query: string, 
    filters?: Record<string, any>,
    sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity',
    sortOrder?: 'asc' | 'desc',
    limit?: number,
    offset?: number,
    includeFacets?: string[]
  ): Promise<SearchResult>;
  abstract bulkIndex(documents: SearchDocument[]): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
