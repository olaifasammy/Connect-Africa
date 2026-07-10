"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceValidator = exports.NamespaceValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class NamespaceValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'NAMESPACE_VALIDATION_ERROR');
    }
}
exports.NamespaceValidationError = NamespaceValidationError;
class NamespaceValidator {
    static validate(namespace) {
        if (!namespace || namespace.trim() === '') {
            throw new NamespaceValidationError('Namespace is required');
        }
        // Namespace pattern validation (e.g., must be a valid URI/URL identifier)
        const namespaceRegex = /^[a-zA-Z0-9_\-\.]+$/;
        if (!namespaceRegex.test(namespace)) {
            throw new NamespaceValidationError('Invalid namespace format');
        }
    }
}
exports.NamespaceValidator = NamespaceValidator;
//# sourceMappingURL=NamespaceValidator.js.map