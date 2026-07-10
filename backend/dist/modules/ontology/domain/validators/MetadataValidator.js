"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValidator = exports.MetadataValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class MetadataValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'METADATA_VALIDATION_ERROR');
    }
}
exports.MetadataValidationError = MetadataValidationError;
class MetadataValidator {
    static validate(props) {
        if (!props.key || props.key.trim() === '') {
            throw new MetadataValidationError('Key is required');
        }
        if (!props.value || props.value.trim() === '') {
            throw new MetadataValidationError('Value is required');
        }
    }
}
exports.MetadataValidator = MetadataValidator;
//# sourceMappingURL=MetadataValidator.js.map