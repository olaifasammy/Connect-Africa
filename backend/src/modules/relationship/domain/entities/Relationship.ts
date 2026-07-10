import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { RelationshipId, EntityId, RelationshipTypeId } from '../value-objects/RelationshipValueObjects';
import { RelationshipCreatedEvent } from '../events/RelationshipCreatedEvent';

interface RelationshipProps {
  sourceEntityId: EntityId;
  targetEntityId: EntityId;
  relationshipTypeId: RelationshipTypeId;
  createdAt: Date;
}

/**
 * Relationship Aggregate Root.
 * Manages the lifecycle of a semantic relationship between two entities.
 */
export class Relationship extends AggregateRoot<RelationshipProps> {
  constructor(
    id: RelationshipId,
    props: RelationshipProps
  ) {
    super(props, id);
    this.validateInvariants();
  }

  get sourceEntityId(): EntityId { return this.props.sourceEntityId; }
  get targetEntityId(): EntityId { return this.props.targetEntityId; }
  get relationshipTypeId(): RelationshipTypeId { return this.props.relationshipTypeId; }
  get createdAt(): Date { return this.props.createdAt; }

  /**
   * Validates core business invariants of a relationship.
   * @throws Error if invariants are violated.
   */
  private validateInvariants(): void {
    if (this.props.sourceEntityId.equals(this.props.targetEntityId)) {
      throw new Error('Business Rule Violation: Source and target entity cannot be the same.');
    }
  }

  /**
   * Factory method to create a new Relationship.
   */
  static create(
    id: RelationshipId,
    sourceEntityId: EntityId,
    targetEntityId: EntityId,
    relationshipTypeId: RelationshipTypeId
  ): Relationship {
    const relationship = new Relationship(id, {
      sourceEntityId,
      targetEntityId,
      relationshipTypeId,
      createdAt: new Date()
    });

    relationship.addDomainEvent(new RelationshipCreatedEvent(
      id.toString(),
      sourceEntityId.getProps().value,
      targetEntityId.getProps().value,
      relationshipTypeId.getProps().value
    ));

    return relationship;
  }

  /**
   * Reconstructs an existing Relationship from persistent storage.
   */
  static reconstruct(
    id: RelationshipId,
    sourceEntityId: EntityId,
    targetEntityId: EntityId,
    relationshipTypeId: RelationshipTypeId,
    createdAt: Date
    ): Relationship {
    return new Relationship(id, { sourceEntityId, targetEntityId, relationshipTypeId, createdAt });
  }
}

