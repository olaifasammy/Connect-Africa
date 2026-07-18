"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresOntologyRepository_1 = require("@modules/ontology/infrastructure/PostgresOntologyRepository");
const PostgresProvider_1 = require("@infrastructure/database/PostgresProvider");
const Ontology_1 = require("@modules/ontology/domain/entities/Ontology");
const OntologyId_1 = require("@modules/ontology/domain/value-objects/OntologyId");
describe('PostgresOntologyRepository Integration', () => {
    let postgresProvider;
    let repository;
    beforeAll(async () => {
        postgresProvider = new PostgresProvider_1.PostgresProvider();
        // Pool is managed statically by PostgresProvider
        repository = new PostgresOntologyRepository_1.PostgresOntologyRepository(postgresProvider);
    });
    afterAll(async () => {
        await postgresProvider.pool.end();
    });
    it('should save and find an ontology', async () => {
        const ontology = Ontology_1.Ontology.create({
            name: 'Integration Test Ontology',
            description: 'Test description',
            version: 1,
            isPublished: false,
            isArchived: false
        });
        await repository.save(ontology);
        const found = await repository.findById(OntologyId_1.OntologyId.create(ontology.id.toString()));
        expect(found).not.toBeNull();
        expect(found?.name).toBe('Integration Test Ontology');
    });
});
//# sourceMappingURL=PostgresOntologyRepository.spec.js.map