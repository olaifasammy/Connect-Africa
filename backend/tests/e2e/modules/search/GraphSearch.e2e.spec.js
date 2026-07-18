"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../shared/interfaces/http/app");
describe('Graph Search E2E', () => {
    it('should search graph neighbors via API', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/api/search/graph')
            .query({ type: 'neighbors', entityId: 'test-id' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('nodes');
    });
});
//# sourceMappingURL=GraphSearch.e2e.spec.js.map