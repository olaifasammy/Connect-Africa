"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = require("@modules/auth/domain/value-objects/Email");
const UserErrors_1 = require("@modules/auth/domain/errors/UserErrors");
describe('Email Value Object', () => {
    it('should create a valid email', () => {
        const email = new Email_1.Email('test@example.com');
        expect(email.value).toBe('test@example.com');
    });
    it('should throw an error for invalid email', () => {
        expect(() => new Email_1.Email('invalid-email')).toThrow(UserErrors_1.InvalidEmailError);
    });
});
//# sourceMappingURL=Email.test.js.map