"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRegistry = void 0;
class ProviderRegistry {
    providers = new Map();
    register(provider, instance) {
        this.providers.set(provider.id, instance);
    }
    get(providerId) {
        return this.providers.get(providerId);
    }
}
exports.ProviderRegistry = ProviderRegistry;
//# sourceMappingURL=ProviderRegistry.js.map