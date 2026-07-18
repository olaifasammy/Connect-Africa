"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProviderHealthHandler = void 0;
class GetProviderHealthHandler {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async handle(query) {
        const provider = await this.providerRepository.findById(query.providerId);
        if (!provider)
            throw new Error('Provider not found');
        // In production, this would query a health monitor service
        return {
            providerId: provider.id,
            name: provider.name,
            status: provider.isEnabled ? 'HEALTHY' : 'UNHEALTHY'
        };
    }
}
exports.GetProviderHealthHandler = GetProviderHealthHandler;
//# sourceMappingURL=GetProviderHealthHandler.js.map