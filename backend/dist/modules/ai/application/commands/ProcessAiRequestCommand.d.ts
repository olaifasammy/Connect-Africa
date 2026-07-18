import { IAiRequest } from '../../domain/interfaces/IAiGateway';
export declare class ProcessAiRequestCommand {
    readonly request: IAiRequest;
    constructor(request: IAiRequest);
}
