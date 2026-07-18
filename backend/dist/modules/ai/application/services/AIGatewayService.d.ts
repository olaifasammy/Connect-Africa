import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
import { ProviderSelectionService } from '../../domain/services/ProviderSelectionService';
import { ProviderRegistry } from '../../infrastructure/providers/ProviderRegistry';
export declare class AIGatewayService implements IAiGateway {
    private readonly selectionService;
    private readonly registry;
    constructor(selectionService: ProviderSelectionService, registry: ProviderRegistry);
    processRequest(request: IAiRequest): Promise<IAiResponse>;
}
