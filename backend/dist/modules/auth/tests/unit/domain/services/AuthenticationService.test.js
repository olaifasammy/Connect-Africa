"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../../../../../auth/domain/services/AuthenticationService");
const User_1 = require("../../../../../auth/domain/entities/User");
const UniqueEntityId_1 = require("../../../../../../shared/domain/UniqueEntityId");
const Email_1 = require("../../../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../../../auth/domain/value-objects/PasswordHash");
describe('AuthenticationService', () => {
    let authenticationService;
    let passwordHasher;
    let auditLogger;
    beforeEach(() => {
        passwordHasher = {
            hash: jest.fn(),
            compare: jest.fn(),
        };
        auditLogger = {
            log: jest.fn(),
        };
        authenticationService = new AuthenticationService_1.AuthenticationService(passwordHasher, auditLogger);
    });
    it('should return true for valid password', async () => {
        const user = new User_1.User({
            email: new Email_1.Email('test@test.com'),
            passwordHash: new PasswordHash_1.PasswordHash('hashed_password'),
            isActive: true,
        }, new UniqueEntityId_1.UniqueEntityId());
        passwordHasher.compare.mockResolvedValue(true);
        const result = await authenticationService.verifyPassword(user, 'plain_password');
        expect(result).toBe(true);
        expect(passwordHasher.compare).toHaveBeenCalledWith('plain_password', 'hashed_password');
    });
    it('should return false for invalid password', async () => {
        const user = new User_1.User({
            email: new Email_1.Email('test@test.com'),
            passwordHash: new PasswordHash_1.PasswordHash('hashed_password'),
            isActive: true,
        }, new UniqueEntityId_1.UniqueEntityId());
        passwordHasher.compare.mockResolvedValue(false);
        const result = await authenticationService.verifyPassword(user, 'wrong_password');
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=AuthenticationService.test.js.map