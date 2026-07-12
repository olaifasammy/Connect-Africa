import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { SearchDocument } from '../models/SearchDocument';

export interface ISearchRepository {
  findById(id: UniqueEntityId): Promise<SearchDocument | null>;
  save(document: SearchDocument): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
  autocomplete(query: string): Promise<string[]>;
  search(
    query: string, 
    filters?: Record<string, any>, 
    sortBy?: 'relevance' | 'alphabetical' | 'dateCreated' | 'dateUpdated' | 'popularity',
    sortOrder?: 'asc' | 'desc',
    limit?: number,
    offset?: number
  ): Promise<SearchDocument[]>;
  bulkSave(documents: SearchDocument[]): Promise<void>;
}
