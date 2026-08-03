import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
import { ProviderSelectionService } from '../../domain/services/ProviderSelectionService';
import { ProviderRegistry } from '../../infrastructure/providers/ProviderRegistry';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { PromptSanitizationService } from '../../infrastructure/security/PromptSanitizationService';
import { ITokenUsageService } from '../../domain/services/TokenUsageService';
import { injectable, inject } from 'inversify';

@injectable()
export class AIGatewayService implements IAiGateway {
  constructor(
    private readonly selectionService: ProviderSelectionService,
    private readonly registry: ProviderRegistry,
    @inject('IPromptRepository') private readonly promptRepository: IPromptRepository,
    private readonly sanitizationService: PromptSanitizationService,
    @inject('ITokenUsageService') private readonly tokenUsageService: ITokenUsageService
  ) {}

  async processRequest(request: IAiRequest): Promise<IAiResponse> {
    // 1. Sanitize input
    request.prompt = this.sanitizationService.sanitize(request.prompt);

    // 2. Retrieve template if name provided
    if (request.templateName) {
        const template = await this.promptRepository.findByName(request.templateName);
        if (template) {
            request.prompt = template.content; // Inject template
        }
    }

    const provider = await this.selectionService.selectBestProvider();
    const gateway = this.registry.get(provider.id);
    
    if (!gateway) {
      throw new Error(`Provider instance for ${provider.name} not registered`);
    }
    
    const response = await gateway.processRequest(request);

    // 3. Track usage (token count estimation)
    await this.tokenUsageService.recordUsage(provider.id, response.tokenCount || 0);
    
    return response;
  }
}
