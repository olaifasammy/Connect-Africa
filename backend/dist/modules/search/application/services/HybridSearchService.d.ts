import { ISemanticSearchProvider } from '../../../search/domain/services/ISemanticSearchProvider';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { SearchDocument } from '../../../search/domain/models/SearchDocument';
export declare class HybridSearchService {
    private readonly semanticProvider;
    private readonly searchRepository;
    constructor(semanticProvider: ISemanticSearchProvider, searchRepository: ISearchRepository);
    search(query: string, limit?: number): Promise<SearchDocument[]>;
}
