"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordPolicy_1 = require("@modules/auth/domain/policies/PasswordPolicy");
describe('PasswordPolicy', () => {
    it('should accept strong password', () => {
        expect(PasswordPolicy_1.PasswordPolicy.isStrong('StrongPass1!')).toBe(true);
    });
    it('should reject short password', () => {
        expect(PasswordPolicy_1.PasswordPolicy.isStrong('Short1!')).toBe(false);
    });
    it('should reject password missing special char', () => {
        expect(PasswordPolicy_1.PasswordPolicy.isStrong('StrongPassword1')).toBe(false);
    });
});
//# sourceMappingURL=PasswordPolicy.test.js.map