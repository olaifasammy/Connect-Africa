"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentValidator = void 0;
class DocumentValidator {
    static isValid(mimeType) {
        const validDocumentTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ];
        return validDocumentTypes.includes(mimeType.value);
    }
}
exports.DocumentValidator = DocumentValidator;
//# sourceMappingURL=DocumentValidator.js.map