import { OntologySuggestionService } from '../../../../ai/application/services/OntologySuggestionService';

export class OntologyAiIntegrationService {
  constructor(private readonly suggestionService: OntologySuggestionService) {}

  async requestTaxonomySuggestions(content: string): Promise<string[]> {
    return this.suggestionService.suggest(content);
  }
}
