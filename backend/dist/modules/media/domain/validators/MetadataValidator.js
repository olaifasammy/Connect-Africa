"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValidator = void 0;
class MetadataValidator {
    static isValid(metadata) {
        return !!metadata.key && metadata.key.length > 0 && !!metadata.value && metadata.value.length > 0;
    }
}
exports.MetadataValidator = MetadataValidator;
//# sourceMappingURL=MetadataValidator.js.map