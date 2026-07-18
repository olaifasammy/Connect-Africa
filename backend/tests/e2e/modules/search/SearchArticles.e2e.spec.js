"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../shared/interfaces/http/app");
describe('Search Articles E2E', () => {
    it('should search articles via API', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/api/search')
            .query({ query: 'article-title', filters: { resourceType: 'article' } });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('results');
    });
});
//# sourceMappingURL=SearchArticles.e2e.spec.js.map