import { IAiGateway } from '../../domain/interfaces/IAiGateway';

export class ResearchAssistantService {
  constructor(private readonly aiGateway: IAiGateway) {}

  async research(topic: string): Promise<string> {
    const response = await this.aiGateway.processRequest({
      prompt: `Research the topic: ${topic}`
    });
    return response.content;
  }
}
