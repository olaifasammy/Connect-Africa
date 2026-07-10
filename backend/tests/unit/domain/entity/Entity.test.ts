import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('Entity Aggregate Root', () => {
  it('should create a valid entity', () => {
    const id = EntityId.create(new UniqueEntityId().toString());
    const name = EntityName.create('Test Entity');
    const metadata = EntityMetadata.create({ tags: ['test'] });
    const type = 'Person';

    const entity = Entity.create(id, name, type, metadata);

    expect(entity.entityId).toEqual(id);
    expect(entity.name.value).toBe('Test Entity');
    expect(entity.type).toBe('Person');
  });

  it('should throw error for empty name', () => {
    expect(() => EntityName.create('')).toThrow('Entity name cannot be empty');
  });
});
