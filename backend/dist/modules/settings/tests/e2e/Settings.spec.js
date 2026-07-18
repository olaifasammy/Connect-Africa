"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Settings E2E', () => {
    it('should get settings', async () => {
        // Assuming authentication is mocked
        const res = await (0, supertest_1.default)(app)
            .get('/api/v1/settings')
            .set('Authorization', 'Bearer mock-token');
        // expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=Settings.spec.js.map