"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnableMfaCommandHandler_1 = require("@modules/auth/application/handlers/mfa/EnableMfaCommandHandler");
const AuditLogger_1 = require("@modules/auth/infrastructure/AuditLogger");
jest.mock('@modules/auth/infrastructure/AuditLogger');
describe('EnableMfaCommandHandler', () => {
    it('should generate MFA secret', async () => {
        const mockRepo = { save: jest.fn(), findById: jest.fn(), findByEmail: jest.fn() };
        const mockTotp = { generateSecret: jest.fn().mockReturnValue('SECRET123'), generateUrl: jest.fn(), verifyCode: jest.fn() };
        const mockEvent = { publish: jest.fn() };
        const handler = new EnableMfaCommandHandler_1.EnableMfaCommandHandler(mockRepo, mockTotp, mockEvent);
        const result = await handler.handle({ userId: 'user1' });
        expect(result.secret).toBe('SECRET123');
        expect(AuditLogger_1.AuditLogger.log).toHaveBeenCalled();
    });
});
//# sourceMappingURL=EnableMfaCommandHandler.test.js.map