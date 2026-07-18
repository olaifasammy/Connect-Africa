"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.DATABASE_URL = 'postgres://localhost:5432/test';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.JWT_SECRET = 'this-is-a-very-long-and-secure-secret-that-is-at-least-32-characters';
const JwtProvider_1 = require("@shared/infrastructure/security/JwtProvider");
describe('JwtProvider', () => {
    it('should generate and verify token', () => {
        const jwtProvider = new JwtProvider_1.JwtProvider();
        const token = jwtProvider.generateToken('user123');
        expect(jwtProvider.verifyToken(token)).toBe('user123');
    });
});
//# sourceMappingURL=JwtProvider.test.js.map