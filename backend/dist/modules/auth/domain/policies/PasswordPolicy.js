"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordPolicy = void 0;
class PasswordPolicy {
    static isStrong(password) {
        // Requirements: Minimum 10 chars, at least one number, one special char
        const minLength = 10;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasNumber && hasSpecial;
    }
}
exports.PasswordPolicy = PasswordPolicy;
//# sourceMappingURL=PasswordPolicy.js.map