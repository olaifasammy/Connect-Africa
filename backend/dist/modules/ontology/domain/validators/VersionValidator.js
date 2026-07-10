"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionValidator = exports.VersionValidationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class VersionValidationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'VERSION_VALIDATION_ERROR');
    }
}
exports.VersionValidationError = VersionValidationError;
class VersionValidator {
    static validate(version) {
        if (isNaN(version) || version <= 0) {
            throw new VersionValidationError('Version must be a positive number');
        }
    }
}
exports.VersionValidator = VersionValidator;
//# sourceMappingURL=VersionValidator.js.map