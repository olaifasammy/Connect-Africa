import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { SearchDocument } from '../models/SearchDocument';

export interface ISearchRepository {
  findById(id: UniqueEntityId): Promise<SearchDocument | null>;
  save(document: SearchDocument): Promise<void>;
  delete(id: UniqueEntityId): Promise<void>;
  search(query: string): Promise<SearchDocument[]>;
  bulkSave(documents: SearchDocument[]): Promise<void>;
}
