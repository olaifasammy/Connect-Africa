import { Pool } from 'pg';
import { SearchProvider, SearchResult } from './SearchProvider';
import { SearchDocument } from '../../domain/models/SearchDocument';
export declare class PostgresSearchProvider extends SearchProvider {
    private readonly pool;
    constructor(pool: Pool);
    createIndex(name: string): Promise<void>;
    deleteIndex(name: string): Promise<void>;
    rebuildIndex(name: string): Promise<void>;
    findById(id: string): Promise<SearchDocument | null>;
    index(document: SearchDocument): Promise<void>;
    update(document: SearchDocument): Promise<void>;
    search(query: string, filters?: Record<string, any>, sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity', sortOrder?: 'asc' | 'desc', limit?: number, offset?: number, includeFacets?: string[]): Promise<SearchResult>;
    bulkIndex(documents: SearchDocument[]): Promise<void>;
    autocomplete(query: string): Promise<string[]>;
    getSuggestions(query: string): Promise<string[]>;
    getTrending(): Promise<string[]>;
    delete(id: string): Promise<void>;
}
