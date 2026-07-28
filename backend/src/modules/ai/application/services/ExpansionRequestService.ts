import { IAiGateway } from '../../domain/interfaces/IAiGateway';

export class ExpansionRequestService {
  constructor(private readonly aiGateway: IAiGateway) {}

  async requestExpansion(content: string): Promise<string> {
    const response = await this.aiGateway.processRequest({
      prompt: `Expand the following content: ${content}`
    });
    return response.content;
  }
}
