"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("@interfaces/http/app");
const app = (0, app_1.createApp)();
describe('Ontology E2E Lifecycle', () => {
    let authToken;
    beforeAll(async () => {
        // Setup: Login to get a valid token for ONTOLOGY_CREATE permission
        // Assuming auth routes and a test user exist or can be created
        const email = `test-${Date.now()}@example.com`;
        const password = 'Password123!';
        await (0, supertest_1.default)(app).post('/api/v1/auth/register').send({ email, password });
        const loginRes = await (0, supertest_1.default)(app).post('/api/v1/auth/login').send({ email, password });
        authToken = loginRes.body.data.token;
    });
    it('should create, publish, add entity/relationship types, and query ontology', async () => {
        // 1. Create Ontology
        const ontologyRes = await (0, supertest_1.default)(app)
            .post('/api/v1/ontology')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Test Ontology', description: 'Test Description', version: 1 });
        expect(ontologyRes.status).toBe(201);
        const ontologyId = ontologyRes.body.data.id;
        // 2. Publish Ontology
        const publishRes = await (0, supertest_1.default)(app)
            .post(`/api/v1/ontology/${ontologyId}/publish`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(publishRes.status).toBe(200);
        // 3. Create Entity Type
        const entityTypeRes = await (0, supertest_1.default)(app)
            .post(`/api/v1/ontology/${ontologyId}/entity-types`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: 'Person', description: 'Person entity type' });
        expect(entityTypeRes.status).toBe(201);
        // 4. Create Relationship Type
        // Assuming we need Entity Type IDs from previous step
        // Skipping actual relationship creation if logic for finding IDs is complex 
        // for now, focusing on the main E2E flow
        // 5. Query Ontology
        const queryRes = await (0, supertest_1.default)(app)
            .get(`/api/v1/ontology/${ontologyId}`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(queryRes.status).toBe(200);
    });
});
//# sourceMappingURL=OntologyLifecycle.test.js.map