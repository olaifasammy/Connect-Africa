"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const JwtProvider_1 = require("@infrastructure/security/JwtProvider");
// Mocking appConfig for JWT secret
jest.mock('@config/app', () => ({
    appConfig: {
        jwt: { secret: 'super-secret-key-that-is-long-enough-32-chars', expiration: '1ms' }
    }
}));
describe('JWT Security', () => {
    it('should throw error for expired token', async () => {
        const jwtProvider = new JwtProvider_1.JwtProvider();
        const token = jwtProvider.generateToken('user123');
        // Simulate expiry delay
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(() => jwtProvider.verifyToken(token)).toThrow('Invalid or expired token');
    });
});
//# sourceMappingURL=JwtSecurity.test.js.map