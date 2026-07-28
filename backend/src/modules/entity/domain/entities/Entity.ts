import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { EntityId } from '../value-objects/EntityId';
import { EntityName } from '../value-objects/EntityName';
import { EntityMetadata } from '../value-objects/EntityMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EntityCreatedEvent } from '../events/EntityCreatedEvent';

/**
 * Entity Aggregate Root Props.
 */
interface EntityProps {
  name: EntityName;
  type: string; // E.g., 'Person', 'Organization'
  metadata: EntityMetadata;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Entity Aggregate Root.
 * Manages the lifecycle and metadata of a core platform entity.
 */
export class Entity extends AggregateRoot<EntityProps> {
  private constructor(props: EntityProps, id?: UniqueEntityId) {
    super(props, id);
    this.validateInvariants();
  }

  /**
   * Validates business invariants.
   */
  private validateInvariants(): void {
    if (!this.props.name) {
      throw new Error('Business Rule Violation: Entity name is required.');
    }
    if (!this.props.type || this.props.type.trim() === '') {
      throw new Error('Business Rule Violation: Entity type is required.');
    }
  }

  /**
   * Factory method to create a new Entity.
   */
  public static create(
    id: EntityId,
    name: EntityName,
    type: string,
    metadata: EntityMetadata
  ): Entity {
    const entity = new Entity({ 
      name, 
      type, 
      metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    }, new UniqueEntityId(id.value));
    
    entity.addDomainEvent(new EntityCreatedEvent(entity));
    return entity;
  }

  /**
   * Rehydrates an existing Entity from persistence.
   */
  public static rehydrate(
    id: UniqueEntityId,
    name: EntityName,
    type: string,
    metadata: EntityMetadata,
    createdAt: Date,
    updatedAt: Date
  ): Entity {
    return new Entity({ name, type, metadata, createdAt, updatedAt }, id);
  }

  get entityId(): EntityId {
    return EntityId.create(this._id.toString());
  }

  get name(): EntityName {
    return this.props.name;
  }

  get type(): string {
    return this.props.type;
  }

  get metadata(): EntityMetadata {
    return this.props.metadata;
  }

  /**
   * Merges another entity into this one.
   */
  public merge(otherEntity: Entity): void {
    // Basic merge implementation: transfer metadata and update timestamps
    this.props.metadata = this.props.metadata.merge(otherEntity.metadata);
    this.props.updatedAt = new Date();
  }
}
