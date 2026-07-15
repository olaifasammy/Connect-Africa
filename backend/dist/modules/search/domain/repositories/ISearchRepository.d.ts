import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { SearchDocument } from '../models/SearchDocument';
export interface ISearchResult {
    documents: SearchDocument[];
    facets?: Record<string, Record<string, number>>;
}
export interface ISearchRepository {
    findById(id: UniqueEntityId): Promise<SearchDocument | null>;
    save(document: SearchDocument): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
    autocomplete(query: string): Promise<string[]>;
    getSuggestions(query: string): Promise<string[]>;
    getTrending(): Promise<string[]>;
    search(query: string, filters?: Record<string, any>, sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity', sortOrder?: 'asc' | 'desc', limit?: number, offset?: number, includeFacets?: string[]): Promise<ISearchResult>;
    bulkSave(documents: SearchDocument[]): Promise<void>;
    runInTransaction<T>(callback: (repo: ISearchRepository) => Promise<T>): Promise<T>;
}
