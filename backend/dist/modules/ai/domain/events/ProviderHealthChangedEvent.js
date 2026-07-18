"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderHealthChangedEvent = void 0;
class ProviderHealthChangedEvent {
    providerId;
    status;
    timestamp;
    constructor(providerId, status, timestamp) {
        this.providerId = providerId;
        this.status = status;
        this.timestamp = timestamp;
    }
}
exports.ProviderHealthChangedEvent = ProviderHealthChangedEvent;
//# sourceMappingURL=ProviderHealthChangedEvent.js.map