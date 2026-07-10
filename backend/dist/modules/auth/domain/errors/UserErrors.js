"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = exports.PasswordTooWeakError = exports.InvalidEmailError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class InvalidEmailError extends BaseError_1.BaseError {
    constructor(email) {
        super(`Invalid email format: ${email}`, 'ERR_INVALID_EMAIL');
    }
}
exports.InvalidEmailError = InvalidEmailError;
class PasswordTooWeakError extends BaseError_1.BaseError {
    constructor() {
        super('Password does not meet security requirements', 'ERR_PASSWORD_TOO_WEAK');
    }
}
exports.PasswordTooWeakError = PasswordTooWeakError;
class UserAlreadyExistsError extends BaseError_1.BaseError {
    constructor(email) {
        super(`User with email ${email} already exists`, 'ERR_USER_ALREADY_EXISTS');
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
//# sourceMappingURL=UserErrors.js.map