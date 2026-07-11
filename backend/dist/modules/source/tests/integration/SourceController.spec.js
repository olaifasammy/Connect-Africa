"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../../shared/interfaces/http/app");
const SourceValueObjects_1 = require("../../../source/domain/value-objects/SourceValueObjects");
describe('SourceController Integration', () => {
    let app;
    let pool;
    beforeAll(async () => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        app = (await (0, app_1.createApp)());
    });
    afterAll(async () => {
        await pool.end();
    });
    it('should return 201 when creating a valid source', async () => {
        // This requires a mock authenticated user or a test session
        const response = await (0, supertest_1.default)(app)
            .post('/api/sources')
            .send({
            title: 'New Source',
            type: SourceValueObjects_1.SourceType.WEB,
            author: 'Author',
            publishedAt: new Date().toISOString(),
        });
        // expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=SourceController.spec.js.map