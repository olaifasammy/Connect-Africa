import { IOntologyGraphService } from '../../../ontology/public';
export declare class OntologySuggestionService {
    private readonly ontologyGraphService;
    constructor(ontologyGraphService: IOntologyGraphService);
    suggest(content: string): string[];
}
