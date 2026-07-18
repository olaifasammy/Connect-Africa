import { IAiGateway } from '../../domain/interfaces/IAiGateway';
export declare class ResearchAssistantService {
    private readonly aiGateway;
    constructor(aiGateway: IAiGateway);
    research(topic: string): Promise<string>;
}
