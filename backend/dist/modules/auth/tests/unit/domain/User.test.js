"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../../auth/domain/entities/User");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
const Email_1 = require("../../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../../auth/domain/value-objects/PasswordHash");
describe('User', () => {
    it('should create a valid user', () => {
        const email = new Email_1.Email('test@connectafrica.com');
        const passwordHash = new PasswordHash_1.PasswordHash('hashed_password');
        const user = new User_1.User({ email, passwordHash, isActive: true }, new UniqueEntityId_1.UniqueEntityId());
        expect(user.email.value).toBe('test@connectafrica.com');
        expect(user.passwordHash.value).toBe('hashed_password');
    });
});
//# sourceMappingURL=User.test.js.map