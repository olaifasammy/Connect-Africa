import { IAiRequest } from '../../domain/interfaces/IAiGateway';

export class ProcessAiRequestCommand {
  constructor(public readonly request: IAiRequest) {}
}
