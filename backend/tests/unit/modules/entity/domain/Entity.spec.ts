import { Entity } from '../../../../../src/modules/entity/domain/entities/Entity';
import { EntityId } from '../../../../../src/modules/entity/domain/value-objects/EntityId';
import { EntityName } from '../../../../../src/modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '../../../../../src/modules/entity/domain/value-objects/EntityMetadata';
import { UniqueEntityId } from '../../../../../src/shared/domain/UniqueEntityId';

describe('Entity Aggregate', () => {
  it('should create a valid entity', () => {
    const id = EntityId.create(new UniqueEntityId().toString());
    const name = EntityName.create('Test Entity');
    const metadata = EntityMetadata.create({ tags: ['test'] });
    const entity = Entity.create(id, name, 'Type', metadata);
    expect(entity.name.value).toBe('Test Entity');
  });
});
