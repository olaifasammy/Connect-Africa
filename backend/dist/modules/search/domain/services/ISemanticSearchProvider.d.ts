import { SearchDocument } from '../models/SearchDocument';
export interface ISemanticSearchProvider {
    embed(text: string): Promise<number[]>;
    search(embedding: number[], limit: number): Promise<string[]>;
    index(document: SearchDocument, embedding: number[]): Promise<void>;
    delete(id: string): Promise<void>;
}
