"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresProvider_1 = require("../../../../shared/infrastructure/database/PostgresProvider");
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
        // or a database. 
        const pool = PostgresProvider_1.PostgresProvider.getPool();
        const userRes = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        const userId = userRes.rows[0].id;
        // 2. Verify Email
        const verifyRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/verify-email')
            .send({ userId });
        expect(verifyRes.status).toBe(200);
        expect(verifyRes.body.success).toBe(true);
    });
    afterAll(async () => {
        await PostgresProvider_1.PostgresProvider.getPool().end();
    });
});
//# sourceMappingURL=EmailVerification.test.js.map