"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNameValidator = void 0;
class EntityNameValidator {
    static validate(name) {
        return name.length >= 1 && name.length <= 255;
    }
}
exports.EntityNameValidator = EntityNameValidator;
//# sourceMappingURL=EntityNameValidator.js.map