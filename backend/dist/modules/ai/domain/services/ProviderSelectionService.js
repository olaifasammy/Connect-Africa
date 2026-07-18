"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderSelectionService = void 0;
class ProviderSelectionService {
    providerRepository;
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async selectBestProvider() {
        const providers = await this.providerRepository.findAllEnabled();
        if (providers.length === 0) {
            throw new Error('No enabled AI providers available');
        }
        // Simple priority-based selection
        return providers.sort((a, b) => b.priority - a.priority)[0];
    }
}
exports.ProviderSelectionService = ProviderSelectionService;
//# sourceMappingURL=ProviderSelectionService.js.map