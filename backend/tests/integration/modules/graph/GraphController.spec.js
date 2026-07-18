"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const GraphRoutes_1 = require("@modules/graph/interfaces/routes/GraphRoutes");
describe('GraphController Integration', () => {
    let app;
    let mockAuthMiddleware;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        mockAuthMiddleware = {
            authenticate: async (req, res, next) => {
                req.user = { id: 'test-user-id', role: { hasPermission: () => true } };
                next();
                return undefined;
            }
        };
        const mockController = {
            createNode: jest.fn().mockImplementation((req, res) => res.status(201).send()),
            createEdge: jest.fn().mockImplementation((req, res) => res.status(201).send()),
            getNode: jest.fn().mockImplementation((req, res) => res.json({})),
            search: jest.fn().mockImplementation((req, res) => res.json([])),
            shortestPath: jest.fn().mockImplementation((req, res) => res.json([]))
        };
        app.use('/graph', (0, GraphRoutes_1.graphRoutes)(mockController, mockAuthMiddleware));
    });
    it('should POST /graph/nodes', async () => {
        const response = await (0, supertest_1.default)(app)
            .post('/graph/nodes')
            .send({ entityId: 'n1', type: 'person' });
        expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=GraphController.spec.js.map