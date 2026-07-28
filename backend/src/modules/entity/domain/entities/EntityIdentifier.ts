import { Entity as BaseEntity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { ExternalIdentifier } from '../value-objects/EntityValueObjects';

/**
 * EntityIdentifier Entity.
 * Represents an external system identifier for an Entity.
 */
interface EntityIdentifierProps {
  entityId: EntityId;
  identifier: ExternalIdentifier;
  createdAt: Date;
}

export class EntityIdentifier extends BaseEntity<EntityIdentifierProps> {
  constructor(props: EntityIdentifierProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get entityId(): EntityId { return this.props.entityId; }
  get identifier(): ExternalIdentifier { return this.props.identifier; }
  get createdAt(): Date { return this.props.createdAt; }
}
