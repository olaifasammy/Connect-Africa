"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Email Verification E2E', () => {
    it('should verify email for a registered user', async () => {
        const email = `test-${Date.now()}@example.com`;
        const password = 'Password123!';
        // 1. Register
        const registerRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/register')
            .send({ email, password });
        // In a real system, we'd get a user ID from the registration response
        // or a database. Assuming for this test registration returns the userId
        // or we can fetch it. For simplicity, let's assume we can get it from the registration.
        const userId = registerRes.body.data?.userId;
        // 2. Verify Email
        const verifyRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/verify-email')
            .send({ userId });
        expect(verifyRes.status).toBe(200);
        expect(verifyRes.body.success).toBe(true);
    });
});
//# sourceMappingURL=EmailVerification.test.js.map