"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OntologyValidator_1 = require("../../../graph/domain/services/OntologyValidator");
const GraphErrors_1 = require("../../../graph/domain/errors/GraphErrors");
describe('OntologyValidator', () => {
    let ontologyValidator;
    let mockOntologyService;
    beforeEach(() => {
        mockOntologyService = {
            validateEntityType: jest.fn(),
            validateRelationshipType: jest.fn(),
            validateCardinality: jest.fn(),
            validateMetadataSchema: jest.fn(),
        };
        ontologyValidator = new OntologyValidator_1.OntologyValidator(mockOntologyService);
    });
    it('should validate node successfully', async () => {
        mockOntologyService.validateEntityType.mockResolvedValue(true);
        await expect(ontologyValidator.validateNode('validType')).resolves.not.toThrow();
    });
    it('should throw GraphValidationError for invalid node type', async () => {
        mockOntologyService.validateEntityType.mockResolvedValue(false);
        await expect(ontologyValidator.validateNode('invalidType')).rejects.toThrow(GraphErrors_1.GraphValidationError);
    });
    it('should validate edge successfully', async () => {
        mockOntologyService.validateRelationshipType.mockResolvedValue(true);
        await expect(ontologyValidator.validateEdge('relType', 'sourceType', 'targetType')).resolves.not.toThrow();
    });
    it('should throw GraphValidationError for invalid edge', async () => {
        mockOntologyService.validateRelationshipType.mockResolvedValue(false);
        await expect(ontologyValidator.validateEdge('relType', 'sourceType', 'targetType')).rejects.toThrow(GraphErrors_1.GraphValidationError);
    });
});
//# sourceMappingURL=OntologyValidator.test.js.map