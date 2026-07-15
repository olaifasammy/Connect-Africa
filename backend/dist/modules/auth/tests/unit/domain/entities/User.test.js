"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../../../auth/domain/entities/User");
const Email_1 = require("../../../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../../../auth/domain/value-objects/PasswordHash");
describe('User', () => {
    it('should create a new user and emit UserCreatedEvent', () => {
        const email = new Email_1.Email('test@example.com');
        const passwordHash = new PasswordHash_1.PasswordHash('hashed_password');
        const user = new User_1.User({ email, passwordHash, isActive: true });
        expect(user.email.value).toBe('test@example.com');
        expect(user.passwordHash.value).toBe('hashed_password');
        expect(user.domainEvents).toHaveLength(1);
        expect(user.domainEvents[0].constructor.name).toBe('UserCreatedEvent');
    });
});
//# sourceMappingURL=User.test.js.map