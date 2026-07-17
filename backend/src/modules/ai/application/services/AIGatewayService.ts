import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
import { ProviderSelectionService } from '../../domain/services/ProviderSelectionService';
import { ProviderRegistry } from '../../infrastructure/providers/ProviderRegistry';

export class AIGatewayService implements IAiGateway {
  constructor(
    private readonly selectionService: ProviderSelectionService,
    private readonly registry: ProviderRegistry
  ) {}

  async processRequest(request: IAiRequest): Promise<IAiResponse> {
    const provider = await this.selectionService.selectBestProvider();
    const gateway = this.registry.get(provider.id);
    
    if (!gateway) {
      throw new Error(`Provider instance for ${provider.name} not registered`);
    }
    
    return gateway.processRequest(request);
  }
}
