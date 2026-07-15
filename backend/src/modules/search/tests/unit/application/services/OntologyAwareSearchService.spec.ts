import { OntologyAwareSearchService } from '@modules/search/application/services/OntologyAwareSearchService';
import { IOntologyGraphService } from '@modules/ontology/application/services/IOntologyGraphService';
import { ISearchRepository } from '@modules/search/domain/repositories/ISearchRepository';

describe('OntologyAwareSearchService', () => {
  let service: OntologyAwareSearchService;
  let mockOntologyGraphService: jest.Mocked<IOntologyGraphService>;
  let mockSearchRepository: jest.Mocked<ISearchRepository>;

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
    service = new OntologyAwareSearchService(mockOntologyGraphService, mockSearchRepository);
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
