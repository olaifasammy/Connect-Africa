"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const LoginCommandHandler_1 = require("@modules/auth/application/handlers/LoginCommandHandler");
const User_1 = require("@modules/auth/domain/entities/User");
const Email_1 = require("@modules/auth/domain/value-objects/Email");
const PasswordHash_1 = require("@modules/auth/domain/value-objects/PasswordHash");
describe('LoginCommandHandler', () => {
    const mockUserRepo = {
        save: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
    };
    const mockHasher = { hash: jest.fn(), compare: jest.fn() };
    const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };
    const mockEventBus = {
        publish: jest.fn(),
    };
    const mockAuditRepository = {
        save: jest.fn(),
        log: jest.fn(),
    };
    const handler = new LoginCommandHandler_1.LoginCommandHandler(mockUserRepo, mockHasher, mockJwt, mockAuditRepository, mockEventBus);
    it('should return token for valid credentials', async () => {
        const user = new User_1.User({ email: new Email_1.Email('test@test.com'), passwordHash: new PasswordHash_1.PasswordHash('hash') });
        mockUserRepo.findByEmail.mockResolvedValue(user);
        mockHasher.compare.mockResolvedValue(true);
        mockJwt.generateToken.mockReturnValue('token');
        const result = await handler.handle({ email: 'test@test.com', password: 'password' });
        expect(result).toBe('token');
    });
});
//# sourceMappingURL=LoginCommandHandler.spec.js.map