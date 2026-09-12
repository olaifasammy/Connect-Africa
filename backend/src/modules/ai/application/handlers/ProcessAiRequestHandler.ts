import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { ProcessAiRequestCommand } from '../commands/ProcessAiRequestCommand';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';
import { IAiResponse } from '../../domain/interfaces/IAiGateway';

@provide(ProcessAiRequestHandler, true)
@injectable()
export class ProcessAiRequestHandler {
  constructor(@inject('IAiGateway') private readonly aiGateway: IAiGateway) {}

  async handle(command: ProcessAiRequestCommand): Promise<IAiResponse> {
    return this.aiGateway.processRequest(command.request);
  }
}
