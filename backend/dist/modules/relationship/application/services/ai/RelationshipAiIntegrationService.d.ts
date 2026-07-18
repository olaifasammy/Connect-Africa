import { RelationshipSuggestionService } from '../../../../ai/application/services/RelationshipSuggestionService';
export declare class RelationshipAiIntegrationService {
    private readonly suggestionService;
    constructor(suggestionService: RelationshipSuggestionService);
    suggestRelationships(entities: string[]): Promise<string[]>;
}
