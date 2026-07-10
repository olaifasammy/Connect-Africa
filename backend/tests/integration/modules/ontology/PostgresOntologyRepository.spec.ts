import { PostgresOntologyRepository } from '@modules/ontology/infrastructure/PostgresOntologyRepository';
import { PostgresProvider } from '@infrastructure/database/PostgresProvider';
import { Ontology } from '@modules/ontology/domain/entities/Ontology';
import { OntologyId } from '@modules/ontology/domain/value-objects/OntologyId';

describe('PostgresOntologyRepository Integration', () => {
  let postgresProvider: PostgresProvider;
  let repository: PostgresOntologyRepository;

  beforeAll(async () => {
    postgresProvider = new PostgresProvider();
    // Pool is managed statically by PostgresProvider
    repository = new PostgresOntologyRepository(postgresProvider);
  });

  afterAll(async () => {
    await postgresProvider.pool.end();
  });

  it('should save and find an ontology', async () => {
    const ontology = Ontology.create({
      name: 'Integration Test Ontology',
      description: 'Test description',
      version: 1,
      isPublished: false,
      isArchived: false
    });

    await repository.save(ontology);
    const found = await repository.findById(OntologyId.create(ontology.id.toString()));

    expect(found).not.toBeNull();
    expect(found?.name).toBe('Integration Test Ontology');
  });
});
