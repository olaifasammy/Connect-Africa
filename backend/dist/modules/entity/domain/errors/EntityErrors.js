"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.ValidationError = exports.EntityError = void 0;
class EntityError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'EntityError';
    }
}
exports.EntityError = EntityError;
class ValidationError extends EntityError {
    constructor(message) {
        super('VALIDATION_ERROR', message);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends EntityError {
    constructor(message = 'Unauthorized') {
        super('UNAUTHORIZED', message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=EntityErrors.js.map