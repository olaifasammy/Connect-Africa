import { UniqueOntologyPolicy } from '@modules/ontology/domain/policies/UniqueOntologyPolicy';
import { IOntologyRepository } from '@modules/ontology/domain/repositories/IOntologyRepository';
import { DomainError } from '@modules/ontology/domain/errors/DomainError';

describe('UniqueOntologyPolicy', () => {
  let mockRepository: jest.Mocked<IOntologyRepository>;
  let policy: UniqueOntologyPolicy;

  beforeEach(() => {
    mockRepository = {
      exists: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn()
    } as any;
    policy = new UniqueOntologyPolicy(mockRepository);
  });

  it('should not throw if ontology name is unique', async () => {
    mockRepository.exists.mockResolvedValue(false);
    await expect(policy.validate('New Ontology')).resolves.not.toThrow();
  });

  it('should throw DomainError if ontology name exists', async () => {
    mockRepository.exists.mockResolvedValue(true);
    await expect(policy.validate('Existing Ontology')).rejects.toThrow(DomainError);
  });
});
