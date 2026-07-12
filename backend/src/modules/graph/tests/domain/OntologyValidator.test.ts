import { OntologyValidator } from '@modules/graph/domain/services/OntologyValidator';
import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';
import { GraphValidationError } from '@modules/graph/domain/errors/GraphErrors';

describe('OntologyValidator', () => {
  let ontologyValidator: OntologyValidator;
  let mockOntologyService: jest.Mocked<IOntologyGraphService>;

  beforeEach(() => {
    mockOntologyService = {
      validateEntityType: jest.fn(),
      validateRelationshipType: jest.fn(),
    } as jest.Mocked<IOntologyGraphService>;
    
    ontologyValidator = new OntologyValidator(mockOntologyService);
  });

  it('should validate node successfully', async () => {
    mockOntologyService.validateEntityType.mockResolvedValue(true);
    await expect(ontologyValidator.validateNode('validType')).resolves.not.toThrow();
  });

  it('should throw GraphValidationError for invalid node type', async () => {
    mockOntologyService.validateEntityType.mockResolvedValue(false);
    await expect(ontologyValidator.validateNode('invalidType')).rejects.toThrow(GraphValidationError);
  });

  it('should validate edge successfully', async () => {
    mockOntologyService.validateRelationshipType.mockResolvedValue(true);
    await expect(ontologyValidator.validateEdge('relType', 'sourceType', 'targetType')).resolves.not.toThrow();
  });

  it('should throw GraphValidationError for invalid edge', async () => {
    mockOntologyService.validateRelationshipType.mockResolvedValue(false);
    await expect(ontologyValidator.validateEdge('relType', 'sourceType', 'targetType')).rejects.toThrow(GraphValidationError);
  });
});
