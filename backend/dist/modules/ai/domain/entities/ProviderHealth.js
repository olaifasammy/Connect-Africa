"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderHealth = void 0;
class ProviderHealth {
    providerId;
    status;
    lastCheckedAt;
    latencyMs;
    constructor(providerId, status, lastCheckedAt, latencyMs) {
        this.providerId = providerId;
        this.status = status;
        this.lastCheckedAt = lastCheckedAt;
        this.latencyMs = latencyMs;
    }
}
exports.ProviderHealth = ProviderHealth;
//# sourceMappingURL=ProviderHealth.js.map