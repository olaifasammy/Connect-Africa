import { Entity as BaseEntity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EntityId } from '../value-objects/EntityId';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import {
  EntityStatus,
  VersionNumber,
} from '../value-objects/EntityValueObjects';

interface EntityVersionProps {
  entityId: EntityId;
  versionNumber: VersionNumber;
  name: string;
  type: string;
  metadata: EntityMetadata;
  status: EntityStatus;
  createdAt: Date;
}

export class EntityVersion extends BaseEntity<EntityVersionProps> {
  private constructor(
    props: EntityVersionProps,
    id?: UniqueEntityId
  ) {
    super(props, id);
  }

  public static create(
    props: EntityVersionProps,
    id?: UniqueEntityId
  ): EntityVersion {
    if (!props.name.trim()) {
      throw new Error('Entity version name cannot be empty.');
    }

    if (!props.type.trim()) {
      throw new Error('Entity version type cannot be empty.');
    }

    return new EntityVersion(
      {
        ...props,
        name: props.name.trim(),
        type: props.type.trim(),
        createdAt: new Date(props.createdAt),
      },
      id
    );
  }

  get entityId(): EntityId {
    return this.props.entityId;
  }

  get versionNumber(): VersionNumber {
    return this.props.versionNumber;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): string {
    return this.props.type;
  }

  get metadata(): EntityMetadata {
    return this.props.metadata;
  }

  get status(): EntityStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }
}
