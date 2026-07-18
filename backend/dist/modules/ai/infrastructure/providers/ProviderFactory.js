"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderFactory = void 0;
const GeminiProvider_1 = require("./GeminiProvider");
class ProviderFactory {
    createProvider(provider) {
        switch (provider.name) {
            case 'Gemini':
                return new GeminiProvider_1.GeminiProvider();
            default:
                throw new Error(`Provider ${provider.name} not supported`);
        }
    }
}
exports.ProviderFactory = ProviderFactory;
//# sourceMappingURL=ProviderFactory.js.map