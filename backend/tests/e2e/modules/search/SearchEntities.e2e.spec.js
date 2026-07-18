"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../shared/interfaces/http/app"); // Assuming this is where the app is exported
describe('Search E2E', () => {
    it('should search entities via API', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/api/search')
            .query({ query: 'test' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results');
    });
});
//# sourceMappingURL=SearchEntities.e2e.spec.js.map