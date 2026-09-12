import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { OntologySuggestionService } from '../../../../ai/application/services/OntologySuggestionService';

@provide(OntologyAiIntegrationService, true)
@injectable()
export class OntologyAiIntegrationService {
  constructor(private readonly suggestionService: OntologySuggestionService) {}

  async requestTaxonomySuggestions(content: string): Promise<string[]> {
    return this.suggestionService.suggest(content);
  }
}
