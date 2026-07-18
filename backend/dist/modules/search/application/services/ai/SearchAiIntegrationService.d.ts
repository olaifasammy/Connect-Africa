import { ResearchAssistantService } from '../../../../ai/application/services/ResearchAssistantService';
export declare class SearchAiIntegrationService {
    private readonly researchAssistant;
    constructor(researchAssistant: ResearchAssistantService);
    enrichSearchQuery(query: string): Promise<string>;
}
