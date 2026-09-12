import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { EntitySuggestionService } from '@modules/ai/public';

@provide(EntityAiIntegrationService, true)
@injectable()
export class EntityAiIntegrationService {
  constructor(private readonly suggestionService: EntitySuggestionService) {}

  async suggestEntities(content: string): Promise<string[]> {
    return this.suggestionService.suggest(content);
  }
}
