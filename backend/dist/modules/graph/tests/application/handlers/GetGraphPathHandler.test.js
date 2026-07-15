"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetGraphPathHandler_1 = require("../../../../graph/application/handlers/GetGraphPathHandler");
const GetGraphPathQuery_1 = require("../../../../graph/application/queries/GetGraphPathQuery");
const GraphEntities_1 = require("../../../../graph/domain/entities/GraphEntities");
const AuditLogger_1 = require("../../../../../shared/infrastructure/logging/AuditLogger");
jest.mock('@infrastructure/logging/AuditLogger');
describe('GetGraphPathHandler', () => {
    let handler;
    let mockRepo;
    beforeEach(() => {
        mockRepo = {
            getNeighbors: jest.fn(),
            findShortestPath: jest.fn(),
            saveNode: jest.fn(),
            updateNode: jest.fn(),
            deleteNode: jest.fn(),
            saveEdge: jest.fn(),
            updateEdge: jest.fn(),
            deleteEdge: jest.fn(),
            existsEdge: jest.fn(),
            depthTraversal: jest.fn(),
            breadthTraversal: jest.fn(),
            findByLabel: jest.fn(),
            findByOntologyType: jest.fn(),
            findEdgesByType: jest.fn(),
            filterByMetadata: jest.fn(),
            findById: jest.fn(),
            runInTransaction: jest.fn(),
        };
        handler = new GetGraphPathHandler_1.GetGraphPathHandler(mockRepo);
        jest.spyOn(AuditLogger_1.AuditLogger, 'log').mockImplementation(() => { });
    });
    it('should return shortest path and log success', async () => {
        const mockNodes = [new GraphEntities_1.GraphNode('id1', 'type1', ['label1'], {})];
        mockRepo.findShortestPath.mockResolvedValue(mockNodes);
        const result = await handler.handle(new GetGraphPathQuery_1.GetGraphPathQuery('id1', 'id2'), 'user1', '127.0.0.1');
        expect(result).toBe(mockNodes);
        expect(AuditLogger_1.AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'SUCCESS' }));
    });
    it('should throw error and log failure', async () => {
        mockRepo.findShortestPath.mockRejectedValue(new Error('DB Error'));
        await expect(handler.handle(new GetGraphPathQuery_1.GetGraphPathQuery('id1', 'id2'), 'user1', '127.0.0.1')).rejects.toThrow('DB Error');
        expect(AuditLogger_1.AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'FAILURE' }));
    });
});
//# sourceMappingURL=GetGraphPathHandler.test.js.map