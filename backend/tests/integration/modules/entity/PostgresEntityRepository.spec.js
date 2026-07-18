"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const PostgresEntityRepository_1 = require("@modules/entity/infrastructure/PostgresEntityRepository");
const Entity_1 = require("@modules/entity/domain/entities/Entity");
const EntityId_1 = require("@modules/entity/domain/value-objects/EntityId");
const EntityName_1 = require("@modules/entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("@modules/entity/domain/value-objects/EntityMetadata");
const UniqueEntityId_1 = require("@shared/domain/UniqueEntityId");
describe('PostgresEntityRepository', () => {
    let pool;
    let repository;
    beforeAll(() => {
        pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
        repository = new PostgresEntityRepository_1.PostgresEntityRepository(pool);
    });
    afterAll(async () => {
        await pool.end();
    });
    it('should save and find an entity', async () => {
        const id = EntityId_1.EntityId.create(new UniqueEntityId_1.UniqueEntityId().toString());
        const entity = Entity_1.Entity.create(id, EntityName_1.EntityName.create('Repo Test'), 'Type', EntityMetadata_1.EntityMetadata.create({ tags: [] }));
        await repository.save(entity);
        const found = await repository.findById(id);
        expect(found?.name.value).toBe('Repo Test');
    });
});
//# sourceMappingURL=PostgresEntityRepository.spec.js.map