import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { EntityId } from '../value-objects/EntityId';
import { EntityName } from '../value-objects/EntityName';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import { EntityTypeId } from '../value-objects/EntityValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EntityCreatedEvent } from '../events/EntityCreatedEvent';

interface EntityProps {
  name: EntityName;
  typeId: EntityTypeId;
  metadata: EntityMetadata;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export class Entity extends AggregateRoot<EntityProps> {
  private constructor(
    props: EntityProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.props.name) {
      throw new Error(
        'Business Rule Violation: Entity name is required.',
      );
    }

    if (!this.props.typeId) {
      throw new Error(
        'Business Rule Violation: Entity type ID is required.',
      );
    }
  }

  public static create(
    id: EntityId,
    name: EntityName,
    typeId: EntityTypeId,
    metadata: EntityMetadata,
  ): Entity {
    const now = new Date();

    const entity = new Entity(
      {
        name,
        typeId,
        metadata,
        status: 'DRAFT',
        createdAt: now,
        updatedAt: now,
      },
      new UniqueEntityId(id.value),
    );

    entity.addDomainEvent(
      new EntityCreatedEvent(entity),
    );

    return entity;
  }

  public static rehydrate(
    id: UniqueEntityId,
    name: EntityName,
    typeId: EntityTypeId,
    metadata: EntityMetadata,
    status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED',
    createdAt: Date,
    updatedAt: Date,
  ): Entity {
    return new Entity(
      {
        name,
        typeId,
        metadata,
        status,
        createdAt,
        updatedAt,
      },
      id,
    );
  }

  get entityId(): EntityId {
    return EntityId.create(this._id.toString());
  }

  get status(): 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'ARCHIVED' {
    return this.props.status;
  }

  get name(): EntityName {
    return this.props.name;
  }

  get typeId(): EntityTypeId {
    return this.props.typeId;
  }

  /**
   * Compatibility accessor.
   * Returns the Ontology EntityType identifier.
   */
  get type(): string {
    return this.props.typeId.value;
  }

  get metadata(): EntityMetadata {
    return this.props.metadata;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  public updateName(name: EntityName): void {
    if (this.props.status === 'ARCHIVED') {
      throw new Error(
        'Archived entities cannot be updated.',
      );
    }

    this.props.name = name;
    this.touch();
  }

  public updateMetadata(
    metadata: EntityMetadata,
  ): void {
    if (this.props.status === 'ARCHIVED') {
      throw new Error(
        'Archived entities cannot be updated.',
      );
    }

    this.props.metadata = metadata;
    this.touch();
  }

  public submitForReview(): void {
    if (this.props.status !== 'DRAFT' && this.props.status !== 'REJECTED') {
      throw new Error(
        'Only DRAFT or REJECTED entities can be submitted for review.',
      );
    }
    this.props.status = 'PENDING_REVIEW';
    this.touch();
  }

  public approve(): void {
    if (this.props.status !== 'PENDING_REVIEW') {
      throw new Error(
        'Only PENDING_REVIEW entities can be approved.',
      );
    }
    this.props.status = 'APPROVED';
    this.touch();
  }

  public reject(): void {
    if (this.props.status !== 'PENDING_REVIEW') {
      throw new Error(
        'Only PENDING_REVIEW entities can be rejected.',
      );
    }
    this.props.status = 'REJECTED';
    this.touch();
  }

  public publish(): void {
    if (this.props.status !== 'DRAFT' && this.props.status !== 'APPROVED') {
      throw new Error(
        'Only DRAFT or APPROVED entities can be published.',
      );
    }

    this.props.status = 'PUBLISHED';
    this.touch();
  }

  public archive(): void {
    if (this.props.status === 'ARCHIVED') {
      throw new Error(
        'Entity is already archived.',
      );
    }

    this.props.status = 'ARCHIVED';
    this.touch();
  }

  public restore(): void {
    if (this.props.status !== 'ARCHIVED') {
      throw new Error(
        'Only ARCHIVED entities can be restored.',
      );
    }

    this.props.status = 'DRAFT';
    this.touch();
  }

  public merge(otherEntity: Entity): void {
    if (this.props.status === 'ARCHIVED') {
      throw new Error(
        'Archived entities cannot be merged.',
      );
    }

    if (
      this.entityId.value ===
      otherEntity.entityId.value
    ) {
      throw new Error(
        'An entity cannot be merged with itself.',
      );
    }

    this.props.metadata =
      this.props.metadata.merge(
        otherEntity.metadata,
      );

    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}