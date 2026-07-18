"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProviderSelectionPolicy = void 0;
class DefaultProviderSelectionPolicy {
    isEligible(provider) {
        return provider.isEnabled;
    }
}
exports.DefaultProviderSelectionPolicy = DefaultProviderSelectionPolicy;
//# sourceMappingURL=ProviderSelectionPolicy.js.map