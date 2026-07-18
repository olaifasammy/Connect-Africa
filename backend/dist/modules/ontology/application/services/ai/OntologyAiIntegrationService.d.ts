import { OntologySuggestionService } from '../../../../ai/application/services/OntologySuggestionService';
export declare class OntologyAiIntegrationService {
    private readonly suggestionService;
    constructor(suggestionService: OntologySuggestionService);
    requestTaxonomySuggestions(content: string): Promise<string[]>;
}
