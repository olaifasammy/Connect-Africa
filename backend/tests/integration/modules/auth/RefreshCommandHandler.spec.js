"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RefreshCommandHandler_1 = require("@modules/auth/application/handlers/RefreshCommandHandler");
describe('RefreshCommandHandler', () => {
    const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };
    const mockAudit = { log: jest.fn() };
    const handler = new RefreshCommandHandler_1.RefreshCommandHandler(mockJwt, mockAudit);
    it('should refresh token', async () => {
        mockJwt.verifyToken.mockReturnValue('user123');
        mockJwt.generateToken.mockReturnValue('new-token');
        const result = await handler.handle({ refreshToken: 'old-token', userId: 'user123' });
        expect(result).toBe('new-token');
    });
});
//# sourceMappingURL=RefreshCommandHandler.spec.js.map