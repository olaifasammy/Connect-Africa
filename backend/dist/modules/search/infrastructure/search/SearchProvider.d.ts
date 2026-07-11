import { SearchDocument } from '../../domain/models/SearchDocument';
export declare abstract class SearchProvider {
    abstract createIndex(name: string): Promise<void>;
    abstract deleteIndex(name: string): Promise<void>;
    abstract rebuildIndex(name: string): Promise<void>;
    abstract findById(id: string): Promise<SearchDocument | null>;
    abstract index(document: SearchDocument): Promise<void>;
    abstract update(document: SearchDocument): Promise<void>;
    abstract search(query: string): Promise<SearchDocument[]>;
    abstract bulkIndex(documents: SearchDocument[]): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
