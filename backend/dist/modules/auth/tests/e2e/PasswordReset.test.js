"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Password Reset E2E', () => {
    it('should reset password for a registered user', async () => {
        const email = `test-${Date.now()}@example.com`;
        const password = 'Password123!';
        const newPassword = 'NewPassword123!';
        // 1. Register
        await (0, supertest_1.default)(app)
            .post('/api/v1/auth/register')
            .send({ email, password });
        // 2. Reset Password
        const resetRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/reset-password')
            .send({ email, newPassword });
        expect(resetRes.status).toBe(200);
        // 3. Login with new password
        const loginRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/login')
            .send({ email, password: newPassword });
        expect(loginRes.status).toBe(200);
    });
});
//# sourceMappingURL=PasswordReset.test.js.map