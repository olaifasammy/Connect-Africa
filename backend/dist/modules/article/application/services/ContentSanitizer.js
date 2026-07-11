"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSanitizer = void 0;
const jsdom_1 = require("jsdom");
const dompurify_1 = __importDefault(require("dompurify"));
const window = new jsdom_1.JSDOM('').window;
const DOMPurify = (0, dompurify_1.default)(window);
class ContentSanitizer {
    static sanitize(content) {
        return DOMPurify.sanitize(content, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'br', 'blockquote'],
            ALLOWED_ATTR: ['href', 'title'],
        });
    }
}
exports.ContentSanitizer = ContentSanitizer;
//# sourceMappingURL=ContentSanitizer.js.map