import { inject } from 'inversify';
import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { IAiGateway } from '../../domain/interfaces/IAiGateway';

@provide(ExpansionRequestService, true)
@injectable()
export class ExpansionRequestService {
  constructor(
    @inject('IAiGateway') private readonly aiGateway: IAiGateway
  ) {}

  async requestExpansion(content: string): Promise<string> {
    const response = await this.aiGateway.processRequest({
      prompt: `Expand the following content: ${content}`
    });
    return response.content;
  }
}
