"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptSanitizationService = void 0;
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
class PromptSanitizationService {
    purifier;
    constructor() {
        const window = new jsdom_1.JSDOM('').window;
        this.purifier = (0, dompurify_1.default)(window);
    }
    sanitize(prompt) {
        // Basic sanitization against XSS/Injection
        return this.purifier.sanitize(prompt);
    }
}
exports.PromptSanitizationService = PromptSanitizationService;
//# sourceMappingURL=PromptSanitizationService.js.map