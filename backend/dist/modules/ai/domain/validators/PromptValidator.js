"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptValidator = void 0;
class PromptValidator {
    validate(prompt) {
        return prompt.content.length > 0 && prompt.name.length > 0;
    }
}
exports.PromptValidator = PromptValidator;
//# sourceMappingURL=PromptValidator.js.map