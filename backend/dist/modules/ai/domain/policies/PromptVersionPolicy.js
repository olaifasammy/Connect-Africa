"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptVersionPolicy = void 0;
class PromptVersionPolicy {
    isCompatible(prompt, version) {
        return version <= prompt.version;
    }
}
exports.PromptVersionPolicy = PromptVersionPolicy;
//# sourceMappingURL=PromptVersionPolicy.js.map