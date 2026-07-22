import { IAiGateway, IAiRequest, IAiResponse } from '../../domain/interfaces/IAiGateway';
import { ProviderSelectionService } from '../../domain/services/ProviderSelectionService';
import { ProviderRegistry } from '../../infrastructure/providers/ProviderRegistry';
import { IPromptRepository } from '../../domain/repositories/IPromptRepository';
import { PromptSanitizationService } from '../../infrastructure/security/PromptSanitizationService';
import { ITokenUsageService } from '../../domain/services/TokenUsageService';
export declare class AIGatewayService implements IAiGateway {
    private readonly selectionService;
    private readonly registry;
    private readonly promptRepository;
    private readonly sanitizationService;
    private readonly tokenUsageService;
    constructor(selectionService: ProviderSelectionService, registry: ProviderRegistry, promptRepository: IPromptRepository, sanitizationService: PromptSanitizationService, tokenUsageService: ITokenUsageService);
    processRequest(request: IAiRequest): Promise<IAiResponse>;
}
