"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityValidator = void 0;
class EntityValidator {
    static validate(entity) {
        if (!entity.name.value)
            throw new Error('Entity name is required.');
        if (!entity.type)
            throw new Error('Entity type is required.');
    }
}
exports.EntityValidator = EntityValidator;
//# sourceMappingURL=EntityValidator.js.map