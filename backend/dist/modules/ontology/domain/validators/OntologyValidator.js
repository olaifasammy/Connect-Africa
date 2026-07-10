"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyValidator = exports.OntologyValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class OntologyValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ONTOLOGY_VALIDATION_ERROR');
    }
}
exports.OntologyValidationError = OntologyValidationError;
class OntologyValidator {
    static validate(props) {
        if (!props.name || props.name.trim() === '') {
            throw new OntologyValidationError('Name is required');
        }
        if (!props.description || props.description.trim() === '') {
            throw new OntologyValidationError('Description is required');
        }
    }
}
exports.OntologyValidator = OntologyValidator;
//# sourceMappingURL=OntologyValidator.js.map