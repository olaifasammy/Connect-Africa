import { ProcessAiRequestCommand } from '../commands/ProcessAiRequestCommand';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';
import { IAiResponse } from '../../domain/interfaces/IAiGateway';
export declare class ProcessAiRequestHandler {
    private readonly aiGateway;
    constructor(aiGateway: IAiGateway);
    handle(command: ProcessAiRequestCommand): Promise<IAiResponse>;
}
