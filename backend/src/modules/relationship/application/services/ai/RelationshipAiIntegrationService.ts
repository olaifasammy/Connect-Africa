import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { RelationshipSuggestionService } from '../../../../ai/application/services/RelationshipSuggestionService';

@provide(RelationshipAiIntegrationService, true)
@injectable()
export class RelationshipAiIntegrationService {
  constructor(private readonly suggestionService: RelationshipSuggestionService) {}

  async suggestRelationships(entities: string[]): Promise<string[]> {
    return this.suggestionService.suggest(entities);
  }
}
