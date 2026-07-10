import { Entity as BaseEntity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import { VersionNumber } from '../value-objects/EntityValueObjects';

/**
 * EntityVersion Entity.
 * Represents a historical snapshot of an Entity aggregate.
 */
interface EntityVersionProps {
  entityId: EntityId;
  versionNumber: VersionNumber;
  metadata: EntityMetadata;
  createdAt: Date;
}

export class EntityVersion extends BaseEntity<EntityVersionProps> {
  private constructor(props: EntityVersionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: EntityVersionProps, id?: UniqueEntityId): EntityVersion {
    return new EntityVersion(props, id);
  }

  get entityId(): EntityId { return this.props.entityId; }
  get versionNumber(): VersionNumber { return this.props.versionNumber; }
  get metadata(): EntityMetadata { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
}
