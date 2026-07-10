"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasValidator = void 0;
class AliasValidator {
    static validate(alias) {
        return alias.length >= 1 && alias.length <= 100;
    }
}
exports.AliasValidator = AliasValidator;
//# sourceMappingURL=AliasValidator.js.map