"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
const Result_1 = require("../../../../shared/utils/Result");
class EmailValidator {
    validate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return new Result_1.Success(undefined);
        }
        return new Result_1.Failure(new Error('Invalid email format'));
    }
}
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=EmailValidator.js.map