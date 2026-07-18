import { Pool } from 'pg';
import { PostgresEntityRepository } from '@modules/entity/infrastructure/PostgresEntityRepository';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('PostgresEntityRepository', () => {
  let pool: Pool;
  let repository: PostgresEntityRepository;

  beforeAll(() => {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    repository = new PostgresEntityRepository(pool);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should save and find an entity', async () => {
    const id = EntityId.create(new UniqueEntityId().toString());
    const entity = Entity.create(id, EntityName.create('Repo Test'), 'Type', EntityMetadata.create({ tags: [] }));
    await repository.save(entity);
    const found = await repository.findById(id);
    expect(found?.name.value).toBe('Repo Test');
  });
});
