"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderFeaturesService = void 0;
const Logger_1 = require("../../../../shared/logger/Logger");
class ProviderFeaturesService {
    async performHealthCheck(providerId) {
        Logger_1.logger.info(`[HEALTH] Checking health for ${providerId}`);
        return true;
    }
}
exports.ProviderFeaturesService = ProviderFeaturesService;
//# sourceMappingURL=ProviderFeaturesService.js.map