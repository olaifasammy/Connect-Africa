"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderFeaturesService = void 0;
class ProviderFeaturesService {
    async performHealthCheck(providerId) {
        console.log(`[HEALTH] Checking health for ${providerId}`);
        return true;
    }
}
exports.ProviderFeaturesService = ProviderFeaturesService;
//# sourceMappingURL=ProviderFeaturesService.js.map