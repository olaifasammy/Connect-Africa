import { AggregateRoot } from '@shared/domain/AggregateRoot';

import {
  EntityId,
  RelationshipId,
  RelationshipTypeId,
} from '../value-objects/RelationshipValueObjects';

import {
  RelationshipValidationError,
} from '../errors/RelationshipErrors';

import {
  RelationshipCreatedEvent,
} from '../events/RelationshipCreatedEvent';

import {
  RelationshipDeletedEvent,
  RelationshipUpdatedEvent,
} from '../events/RelationshipEvents';

interface RelationshipProps {
  sourceEntityId: EntityId;
  targetEntityId: EntityId;
  relationshipTypeId: RelationshipTypeId;
  createdAt: Date;
}

/**
 * Relationship Aggregate Root.
 *
 * Relationship is the canonical owner of the semantic edge
 * between two entities. Graph is a downstream representation.
 */
export class Relationship
  extends AggregateRoot<RelationshipProps>
{
  constructor(
    id: RelationshipId,
    props: RelationshipProps,
  ) {
    Relationship.validateProps(props);

    super(
      {
        ...props,
        createdAt: new Date(props.createdAt.getTime()),
      },
      id,
    );

    this.validateInvariants();
  }

  get sourceEntityId(): EntityId {
    return this.props.sourceEntityId;
  }

  get targetEntityId(): EntityId {
    return this.props.targetEntityId;
  }

  get relationshipTypeId(): RelationshipTypeId {
    return this.props.relationshipTypeId;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt.getTime());
  }

  private static validateProps(
    props: RelationshipProps,
  ): void {
    if (!props.sourceEntityId) {
      throw new RelationshipValidationError(
        'Source entity ID is required.',
      );
    }

    if (!props.targetEntityId) {
      throw new RelationshipValidationError(
        'Target entity ID is required.',
      );
    }

    if (!props.relationshipTypeId) {
      throw new RelationshipValidationError(
        'Relationship type ID is required.',
      );
    }

    if (
      !(props.createdAt instanceof Date) ||
      Number.isNaN(props.createdAt.getTime())
    ) {
      throw new RelationshipValidationError(
        'Relationship createdAt must be a valid date.',
      );
    }
  }

  private validateInvariants(): void {
    if (
      this.props.sourceEntityId.equals(
        this.props.targetEntityId,
      )
    ) {
      throw new RelationshipValidationError(
        'Source and target entity cannot be the same.',
      );
    }
  }

  static create(
    id: RelationshipId,
    sourceEntityId: EntityId,
    targetEntityId: EntityId,
    relationshipTypeId: RelationshipTypeId,
  ): Relationship {
    const relationship = new Relationship(id, {
      sourceEntityId,
      targetEntityId,
      relationshipTypeId,
      createdAt: new Date(),
    });

    relationship.addDomainEvent(
      new RelationshipCreatedEvent(
        id.toString(),
        sourceEntityId.value,
        targetEntityId.value,
        relationshipTypeId.value,
      ),
    );

    return relationship;
  }

  public updateRelationshipType(
    relationshipTypeId: RelationshipTypeId,
  ): void {
    if (!relationshipTypeId) {
      throw new RelationshipValidationError(
        'Relationship type ID is required.',
      );
    }

    const previousRelationshipTypeId =
      this.props.relationshipTypeId.value;

    if (
      previousRelationshipTypeId ===
      relationshipTypeId.value
    ) {
      return;
    }

    this.props.relationshipTypeId =
      relationshipTypeId;

    this.validateInvariants();

    this.addDomainEvent(
      new RelationshipUpdatedEvent(
        this.id.toString(),
        this.sourceEntityId.value,
        this.targetEntityId.value,
        previousRelationshipTypeId,
        relationshipTypeId.value,
      ),
    );
  }

  public delete(): void {
    this.addDomainEvent(
      new RelationshipDeletedEvent(
        this.id.toString(),
        this.sourceEntityId.value,
        this.targetEntityId.value,
        this.relationshipTypeId.value,
      ),
    );
  }

  static reconstruct(
    id: RelationshipId,
    sourceEntityId: EntityId,
    targetEntityId: EntityId,
    relationshipTypeId: RelationshipTypeId,
    createdAt: Date,
  ): Relationship {
    return new Relationship(id, {
      sourceEntityId,
      targetEntityId,
      relationshipTypeId,
      createdAt,
    });
  }
}