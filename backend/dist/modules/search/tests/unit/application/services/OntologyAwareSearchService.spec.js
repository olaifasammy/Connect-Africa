"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OntologyAwareSearchService_1 = require("../../../../../search/application/services/OntologyAwareSearchService");
describe('OntologyAwareSearchService', () => {
    let service;
    let mockOntologyGraphService;
    let mockSearchRepository;
    beforeEach(() => {
        mockOntologyGraphService = {
            validateEntityType: jest.fn(),
            validateRelationshipType: jest.fn(),
            validateCardinality: jest.fn(),
            validateMetadataSchema: jest.fn(),
        };
        mockSearchRepository = {
            findById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            search: jest.fn(),
            bulkSave: jest.fn(),
            autocomplete: jest.fn(),
            getSuggestions: jest.fn(),
            getTrending: jest.fn(),
            runInTransaction: jest.fn(),
        };
        service = new OntologyAwareSearchService_1.OntologyAwareSearchService(mockOntologyGraphService, mockSearchRepository);
    });
    it('should validate entity type if provided', async () => {
        mockOntologyGraphService.validateEntityType.mockResolvedValue(true);
        mockSearchRepository.search.mockResolvedValue({ documents: [] });
        await service.search('query', {}, 'type1');
        expect(mockOntologyGraphService.validateEntityType).toHaveBeenCalledWith('type1');
        expect(mockSearchRepository.search).toHaveBeenCalledWith('query', { resourceType: 'type1' });
    });
    it('should throw error if entity type is invalid', async () => {
        mockOntologyGraphService.validateEntityType.mockResolvedValue(false);
        await expect(service.search('query', {}, 'invalidType')).rejects.toThrow('Invalid entity type: invalidType');
    });
});
//# sourceMappingURL=OntologyAwareSearchService.spec.js.map