import { EntitySuggestionService } from '../../../../ai/public';
export declare class EntityAiIntegrationService {
    private readonly suggestionService;
    constructor(suggestionService: EntitySuggestionService);
    suggestEntities(content: string): Promise<string[]>;
}
