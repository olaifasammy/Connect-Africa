"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalIdentifierValidator = void 0;
class ExternalIdentifierValidator {
    static validate(id) {
        return id.length >= 1 && id.length <= 100;
    }
}
exports.ExternalIdentifierValidator = ExternalIdentifierValidator;
//# sourceMappingURL=ExternalIdentifierValidator.js.map