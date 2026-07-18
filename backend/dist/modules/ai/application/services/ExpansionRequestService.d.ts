import { IAiGateway } from '../../domain/interfaces/IAiGateway';
export declare class ExpansionRequestService {
    private readonly aiGateway;
    constructor(aiGateway: IAiGateway);
    requestExpansion(content: string): Promise<string>;
}
