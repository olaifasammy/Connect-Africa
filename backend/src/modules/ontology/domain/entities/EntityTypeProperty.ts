import { Entity as BaseEntity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { DomainError } from '../errors/DomainError';
import { OntologyId } from '../value-objects/OntologyId';
import { PropertyDefinition } from '../value-objects/PropertyDefinition';
import { CardinalityRule } from '../value-objects/CardinalityRule';

export interface EntityTypePropertyProps {
  entityTypeId: UniqueEntityId;
  ontologyId: OntologyId;
  name: string;
  definition: PropertyDefinition;
  cardinality: CardinalityRule;
  required: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class EntityTypeProperty
  extends BaseEntity<EntityTypePropertyProps>
{
  private constructor(
    props: EntityTypePropertyProps,
    id?: UniqueEntityId,
  ) {
    super(
      {
        ...props,
        name: props.name.trim(),
        createdAt: new Date(props.createdAt),
        updatedAt: new Date(props.updatedAt),
      },
      id,
    );

    this.validateInvariants();
  }

  public static create(
    props: EntityTypePropertyProps,
    id?: UniqueEntityId,
  ): EntityTypeProperty {
    return new EntityTypeProperty(
      props,
      id,
    );
  }

  public static reconstruct(
    props: EntityTypePropertyProps,
    id: UniqueEntityId,
  ): EntityTypeProperty {
    return new EntityTypeProperty(
      props,
      id,
    );
  }

  private validateInvariants(): void {
    if (!this.props.entityTypeId) {
      throw new DomainError(
        'Entity Type Property must belong to an Entity Type.',
      );
    }

    if (!this.props.ontologyId) {
      throw new DomainError(
        'Entity Type Property must belong to an ontology.',
      );
    }

    if (!this.props.name) {
      throw new DomainError(
        'Entity Type Property name is required.',
      );
    }

    if (this.props.name.length > 255) {
      throw new DomainError(
        'Entity Type Property name cannot exceed 255 characters.',
      );
    }

    if (!(this.props.definition instanceof PropertyDefinition)) {
      throw new DomainError(
        'Entity Type Property must have a valid property definition.',
      );
    }

    if (!(this.props.cardinality instanceof CardinalityRule)) {
      throw new DomainError(
        'Entity Type Property must have a valid cardinality rule.',
      );
    }

    if (typeof this.props.required !== 'boolean') {
      throw new DomainError(
        'Entity Type Property required flag must be boolean.',
      );
    }

    if (
      this.props.required &&
      this.props.cardinality.min < 1
    ) {
      throw new DomainError(
        'A required property must have a minimum cardinality of at least 1.',
      );
    }

    if (!(this.props.createdAt instanceof Date)) {
      throw new DomainError(
        'Entity Type Property createdAt must be a valid date.',
      );
    }

    if (
      Number.isNaN(
        this.props.createdAt.getTime(),
      )
    ) {
      throw new DomainError(
        'Entity Type Property createdAt must be a valid date.',
      );
    }

    if (!(this.props.updatedAt instanceof Date)) {
      throw new DomainError(
        'Entity Type Property updatedAt must be a valid date.',
      );
    }

    if (
      Number.isNaN(
        this.props.updatedAt.getTime(),
      )
    ) {
      throw new DomainError(
        'Entity Type Property updatedAt must be a valid date.',
      );
    }
  }

  public update(
    name: string,
    definition: PropertyDefinition,
    cardinality: CardinalityRule,
    required: boolean,
  ): void {
    const normalizedName = name?.trim();

    if (!normalizedName) {
      throw new DomainError(
        'Entity Type Property name is required.',
      );
    }

    if (normalizedName.length > 255) {
      throw new DomainError(
        'Entity Type Property name cannot exceed 255 characters.',
      );
    }

    if (
      !(definition instanceof PropertyDefinition)
    ) {
      throw new DomainError(
        'Entity Type Property must have a valid property definition.',
      );
    }

    if (
      !(cardinality instanceof CardinalityRule)
    ) {
      throw new DomainError(
        'Entity Type Property must have a valid cardinality rule.',
      );
    }

    if (typeof required !== 'boolean') {
      throw new DomainError(
        'Entity Type Property required flag must be boolean.',
      );
    }

    if (
      required &&
      cardinality.min < 1
    ) {
      throw new DomainError(
        'A required property must have a minimum cardinality of at least 1.',
      );
    }

    this.props.name = normalizedName;
    this.props.definition = definition;
    this.props.cardinality = cardinality;
    this.props.required = required;

    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  get entityTypeId(): UniqueEntityId {
    return this.props.entityTypeId;
  }

  get ontologyId(): OntologyId {
    return this.props.ontologyId;
  }

  get name(): string {
    return this.props.name;
  }

  get definition(): PropertyDefinition {
    return this.props.definition;
  }

  get cardinality(): CardinalityRule {
    return this.props.cardinality;
  }

  get required(): boolean {
    return this.props.required;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }
}