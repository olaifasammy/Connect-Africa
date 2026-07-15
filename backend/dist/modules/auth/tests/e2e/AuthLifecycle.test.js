"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Auth E2E Lifecycle', () => {
    it('should register, login, and refresh token', async () => {
        const email = `test-${Date.now()}@example.com`;
        const password = 'Password123!';
        // 1. Register
        const registerRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/register')
            .send({ email, password });
        expect(registerRes.status).toBe(201);
        // 2. Login
        const loginRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/login')
            .send({ email, password });
        expect(loginRes.status).toBe(200);
        const token = loginRes.body.data.token;
        expect(token).toBeDefined();
        // 3. Logout
        const logoutRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`);
        expect(logoutRes.status).toBe(200);
    });
});
//# sourceMappingURL=AuthLifecycle.test.js.map