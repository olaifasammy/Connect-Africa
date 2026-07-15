"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeTypeValidator = void 0;
class MimeTypeValidator {
    static isValid(mimeType) {
        // Basic validation, could be expanded.
        return !!mimeType.value && mimeType.value.includes('/');
    }
}
exports.MimeTypeValidator = MimeTypeValidator;
//# sourceMappingURL=MimeTypeValidator.js.map