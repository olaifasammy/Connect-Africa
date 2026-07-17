import { ProcessAiRequestCommand } from '../commands/ProcessAiRequestCommand';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';
import { IAiResponse } from '../../domain/interfaces/IAiGateway';

export class ProcessAiRequestHandler {
  constructor(private readonly aiGateway: IAiGateway) {}

  async handle(command: ProcessAiRequestCommand): Promise<IAiResponse> {
    return this.aiGateway.processRequest(command.request);
  }
}
