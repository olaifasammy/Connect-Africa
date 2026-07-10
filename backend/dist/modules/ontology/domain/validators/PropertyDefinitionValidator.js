"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyDefinitionValidator = exports.PropertyDefinitionValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class PropertyDefinitionValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'PROPERTY_DEFINITION_VALIDATION_ERROR');
    }
}
exports.PropertyDefinitionValidationError = PropertyDefinitionValidationError;
class PropertyDefinitionValidator {
    static validate(props) {
        if (!props.name || props.name.trim() === '') {
            throw new PropertyDefinitionValidationError('Name is required');
        }
        if (!props.dataType || props.dataType.trim() === '') {
            throw new PropertyDefinitionValidationError('Data type is required');
        }
    }
}
exports.PropertyDefinitionValidator = PropertyDefinitionValidator;
//# sourceMappingURL=PropertyDefinitionValidator.js.map