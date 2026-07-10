"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameValidator = void 0;
const Result_1 = require("../../../../shared/utils/Result");
class UsernameValidator {
    validate(username) {
        // Alphanumeric, between 3 and 20 characters
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (usernameRegex.test(username)) {
            return new Result_1.Success(undefined);
        }
        return new Result_1.Failure(new Error('Invalid username format'));
    }
}
exports.UsernameValidator = UsernameValidator;
//# sourceMappingURL=UsernameValidator.js.map