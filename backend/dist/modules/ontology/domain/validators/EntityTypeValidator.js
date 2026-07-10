"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTypeValidator = exports.EntityTypeValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class EntityTypeValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ENTITY_TYPE_VALIDATION_ERROR');
    }
}
exports.EntityTypeValidationError = EntityTypeValidationError;
class EntityTypeValidator {
    static validate(props) {
        if (!props.name || props.name.trim() === '') {
            throw new EntityTypeValidationError('Name is required');
        }
        if (!props.description || props.description.trim() === '') {
            throw new EntityTypeValidationError('Description is required');
        }
    }
}
exports.EntityTypeValidator = EntityTypeValidator;
//# sourceMappingURL=EntityTypeValidator.js.map