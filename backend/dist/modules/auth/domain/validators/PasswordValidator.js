"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
const Result_1 = require("../../../../shared/utils/Result");
class PasswordValidator {
    validate(password) {
        // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (passwordRegex.test(password)) {
            return new Result_1.Success(undefined);
        }
        return new Result_1.Failure(new Error('Password does not meet complexity requirements'));
    }
}
exports.PasswordValidator = PasswordValidator;
//# sourceMappingURL=PasswordValidator.js.map