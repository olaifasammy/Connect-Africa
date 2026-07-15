"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Update Profile E2E', () => {
    it('should update profile display name for an authenticated user', async () => {
        // 1. Register/Login to get a valid token
        const email = `profile-test-${Date.now()}@example.com`;
        const password = 'Password123!';
        await (0, supertest_1.default)(app)
            .post('/api/v1/auth/register')
            .send({ email, password });
        const loginRes = await (0, supertest_1.default)(app)
            .post('/api/v1/auth/login')
            .send({ email, password });
        const token = loginRes.body.data.token;
        // 2. Update Profile
        const updateRes = await (0, supertest_1.default)(app)
            .put('/api/v1/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ displayName: 'New Name' });
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.success).toBe(true);
    });
});
//# sourceMappingURL=UpdateProfile.test.js.map