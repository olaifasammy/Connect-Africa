import { Entity } from '../../src/modules/entity/domain/entities/Entity';
import { EntityId } from '../../src/modules/entity/domain/value-objects/EntityId';
import { EntityName } from '../../src/modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '../../src/modules/entity/domain/value-objects/EntityMetadata';
import { UniqueEntityId } from '../../src/shared/domain/UniqueEntityId';

export class EntityFactory {
  static create(props: Partial<{ id: string; name: string; type: string }> = {}): Entity {
    const id = EntityId.create(props.id || new UniqueEntityId().toString());
    const name = EntityName.create(props.name || 'Test Entity');
    const type = props.type || 'Generic';
    const metadata = EntityMetadata.create({ tags: [] });
    return Entity.create(id, name, type, metadata);
  }
}
