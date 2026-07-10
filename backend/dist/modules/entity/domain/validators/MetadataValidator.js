"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValidator = void 0;
class MetadataValidator {
    static validate(description, source) {
        return (description ? description.length <= 2000 : true) &&
            (source ? source.length <= 255 : true);
    }
}
exports.MetadataValidator = MetadataValidator;
//# sourceMappingURL=MetadataValidator.js.map