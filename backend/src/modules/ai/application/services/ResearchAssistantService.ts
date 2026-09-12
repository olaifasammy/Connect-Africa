import { inject } from 'inversify';
import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { IAiGateway } from '../../domain/interfaces/IAiGateway';

@provide(ResearchAssistantService, true)
@injectable()
export class ResearchAssistantService {
  constructor(
    @inject('IAiGateway') private readonly aiGateway: IAiGateway
  ) {}

  async research(topic: string): Promise<string> {
    const response = await this.aiGateway.processRequest({
      prompt: `Research the topic: ${topic}`
    });
    return response.content;
  }
}
