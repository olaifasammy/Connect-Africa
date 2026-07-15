import { IOntologyGraphService } from '../../../ontology/application/services/IOntologyGraphService';
import { ISearchRepository } from '../../../search/domain/repositories/ISearchRepository';
import { ISearchResult } from '../../../search/domain/repositories/ISearchRepository';
export declare class OntologyAwareSearchService {
    private readonly ontologyGraphService;
    private readonly searchRepository;
    constructor(ontologyGraphService: IOntologyGraphService, searchRepository: ISearchRepository);
    search(query: string, filters?: Record<string, any>, entityTypeId?: string): Promise<ISearchResult>;
}
