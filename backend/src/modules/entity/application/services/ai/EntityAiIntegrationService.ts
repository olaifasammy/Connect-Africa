import { EntitySuggestionService } from '@modules/ai/public';

export class EntityAiIntegrationService {
  constructor(private readonly suggestionService: EntitySuggestionService) {}

  async suggestEntities(content: string): Promise<string[]> {
    return this.suggestionService.suggest(content);
  }
}
