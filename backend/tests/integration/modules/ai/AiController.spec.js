"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../../src/index");
describe('AiController Integration', () => {
    it('should process a valid AI request', async () => {
        // Assuming a test user with ADMIN role exists or we bypass for test
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/v1/ai/process')
            .set('Authorization', 'Bearer <TEST_ADMIN_TOKEN>')
            .send({
            prompt: 'Research the impact of AI in Africa',
            provider: 'Gemini'
        });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.content).toBeDefined();
    });
});
//# sourceMappingURL=AiController.spec.js.map