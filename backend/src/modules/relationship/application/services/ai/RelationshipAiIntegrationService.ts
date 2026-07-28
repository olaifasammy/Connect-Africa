import { RelationshipSuggestionService } from '../../../../ai/application/services/RelationshipSuggestionService';

export class RelationshipAiIntegrationService {
  constructor(private readonly suggestionService: RelationshipSuggestionService) {}

  async suggestRelationships(entities: string[]): Promise<string[]> {
    return this.suggestionService.suggest(entities);
  }
}
