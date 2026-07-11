"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresGraphRepository_1 = require("../../../graph/infrastructure/PostgresGraphRepository");
describe('PostgresGraphRepository', () => {
    let repository;
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
        };
        repository = new PostgresGraphRepository_1.PostgresGraphRepository(mockDb);
    });
    it('should get neighbors and map to entities', async () => {
        mockDb.query.mockResolvedValueOnce({
            rows: [
                {
                    relationship_id: 'rel1',
                    source_id: 's1',
                    target_id: 't1',
                    type_id: 'relType',
                    source_type: 'type1',
                    target_type: 'type2',
                },
            ],
        });
        const result = await repository.getNeighbors('s1');
        expect(result.nodes).toHaveLength(2);
        expect(result.edges).toHaveLength(1);
        expect(mockDb.query).toHaveBeenCalled();
    });
    it('should find shortest path and return array of nodes', async () => {
        mockDb.query.mockResolvedValueOnce({
            rows: [{ path: ['n1', 'n2', 'n3'] }],
        });
        const result = await repository.findShortestPath('n1', 'n3');
        expect(result).toHaveLength(3);
        expect(result[0].entityId).toBe('n1');
        expect(result[2].entityId).toBe('n3');
    });
});
//# sourceMappingURL=PostgresGraphRepository.test.js.map