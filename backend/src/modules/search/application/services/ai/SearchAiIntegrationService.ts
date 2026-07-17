import { ResearchAssistantService } from '../../../../ai/application/services/ResearchAssistantService';

export class SearchAiIntegrationService {
  constructor(private readonly researchAssistant: ResearchAssistantService) {}

  async enrichSearchQuery(query: string): Promise<string> {
    // Example: Use AI to expand/refine search query
    return this.researchAssistant.research(query);
  }
}
