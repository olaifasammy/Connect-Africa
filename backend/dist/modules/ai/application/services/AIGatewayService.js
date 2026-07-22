"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIGatewayService = void 0;
const ProviderSelectionService_1 = require("../../domain/services/ProviderSelectionService");
const ProviderRegistry_1 = require("../../infrastructure/providers/ProviderRegistry");
const PromptSanitizationService_1 = require("../../infrastructure/security/PromptSanitizationService");
const inversify_1 = require("inversify");
let AIGatewayService = class AIGatewayService {
    selectionService;
    registry;
    promptRepository;
    sanitizationService;
    tokenUsageService;
    constructor(selectionService, registry, promptRepository, sanitizationService, tokenUsageService) {
        this.selectionService = selectionService;
        this.registry = registry;
        this.promptRepository = promptRepository;
        this.sanitizationService = sanitizationService;
        this.tokenUsageService = tokenUsageService;
    }
    async processRequest(request) {
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
};
exports.AIGatewayService = AIGatewayService;
exports.AIGatewayService = AIGatewayService = __decorate([
    (0, inversify_1.injectable)(),
    __param(2, (0, inversify_1.inject)('IPromptRepository')),
    __param(4, (0, inversify_1.inject)('ITokenUsageService')),
    __metadata("design:paramtypes", [ProviderSelectionService_1.ProviderSelectionService,
        ProviderRegistry_1.ProviderRegistry, Object, PromptSanitizationService_1.PromptSanitizationService, Object])
], AIGatewayService);
//# sourceMappingURL=AIGatewayService.js.map