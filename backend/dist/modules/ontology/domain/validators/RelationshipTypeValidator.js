"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTypeValidator = exports.RelationshipTypeValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class RelationshipTypeValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'RELATIONSHIP_TYPE_VALIDATION_ERROR');
    }
}
exports.RelationshipTypeValidationError = RelationshipTypeValidationError;
class RelationshipTypeValidator {
    static validate(props) {
        if (!props.name || props.name.trim() === '') {
            throw new RelationshipTypeValidationError('Name is required');
        }
        if (!props.description || props.description.trim() === '') {
            throw new RelationshipTypeValidationError('Description is required');
        }
    }
}
exports.RelationshipTypeValidator = RelationshipTypeValidator;
//# sourceMappingURL=RelationshipTypeValidator.js.map