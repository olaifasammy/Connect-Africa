import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { OntologyId } from '../value-objects/OntologyId';
import { RelationshipTypeCreatedEvent } from '../events/RelationshipTypeCreatedEvent';
import { RelationshipTypeUpdatedEvent } from '../events/RelationshipTypeUpdatedEvent';
import { RelationshipTypeDeletedEvent } from '../events/RelationshipTypeDeletedEvent';
import { DomainError } from '../errors/DomainError';

export interface RelationshipTypeProps {
  ontologyId: OntologyId;
  name: string;
  description: string;
  sourceEntityTypeId: UniqueEntityId;
  targetEntityTypeId: UniqueEntityId;
}

export class RelationshipType extends AggregateRoot<RelationshipTypeProps> {
  private constructor(
    props: RelationshipTypeProps,
    id?: UniqueEntityId,
  ) {
    super(
      {
        ...props,
        name: props.name.trim(),
        description: props.description.trim(),
      },
      id,
    );

    this.validateInvariants();
  }

  public static create(
    props: RelationshipTypeProps,
    id?: UniqueEntityId,
  ): RelationshipType {
    const relationshipType =
      new RelationshipType(
        props,
        id,
      );

    if (!id) {
      relationshipType.addDomainEvent(
        new RelationshipTypeCreatedEvent(
          relationshipType.id,
        ),
      );
    }

    return relationshipType;
  }

  public static reconstruct(
    props: RelationshipTypeProps,
    id: UniqueEntityId,
  ): RelationshipType {
    return new RelationshipType(
      props,
      id,
    );
  }

  private validateInvariants(): void {
    if (!this.props.ontologyId) {
      throw new DomainError(
        'Relationship Type must belong to an ontology.',
      );
    }

    if (!this.props.name) {
      throw new DomainError(
        'Relationship Type name is required.',
      );
    }

    if (this.props.name.length > 255) {
      throw new DomainError(
        'Relationship Type name cannot exceed 255 characters.',
      );
    }

    if (!this.props.sourceEntityTypeId) {
      throw new DomainError(
        'Relationship Type source Entity Type is required.',
      );
    }

    if (!this.props.targetEntityTypeId) {
      throw new DomainError(
        'Relationship Type target Entity Type is required.',
      );
    }
  }

  public update(
    name: string,
    description: string,
  ): void {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new DomainError(
        'Relationship Type name is required.',
      );
    }

    if (normalizedName.length > 255) {
      throw new DomainError(
        'Relationship Type name cannot exceed 255 characters.',
      );
    }

    this.props.name = normalizedName;
    this.props.description =
      description?.trim() ?? '';

    this.addDomainEvent(
      new RelationshipTypeUpdatedEvent(
        this.id,
      ),
    );
  }

  public delete(): void {
    this.addDomainEvent(
      new RelationshipTypeDeletedEvent(
        this.id,
      ),
    );
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get sourceEntityTypeId(): UniqueEntityId {
    return this.props.sourceEntityTypeId;
  }

  get targetEntityTypeId(): UniqueEntityId {
    return this.props.targetEntityTypeId;
  }

  get ontologyId(): OntologyId {
    return this.props.ontologyId;
  }
}
