import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { SearchDocument } from '../../domain/models/SearchDocument';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
import { SearchProvider } from '../search/SearchProvider';
export declare class SearchRepository implements ISearchRepository {
    private readonly searchProvider;
    constructor(searchProvider: SearchProvider);
    findById(id: UniqueEntityId): Promise<SearchDocument | null>;
    save(document: SearchDocument): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
    search(query: string): Promise<SearchDocument[]>;
    bulkSave(documents: SearchDocument[]): Promise<void>;
}
