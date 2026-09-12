import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { DomainError } from '../errors/DomainError';

export interface OntologyVersionProps {
  ontologyId: UniqueEntityId;
  version: number;
  isPublished: boolean;
  createdAt: Date;
}

export class OntologyVersion extends AggregateRoot<OntologyVersionProps> {
  private constructor(
    props: OntologyVersionProps,
    id?: UniqueEntityId,
  ) {
    super(
      {
        ...props,
        createdAt: new Date(props.createdAt),
      },
      id,
    );

    this.validateInvariants();
  }

  public static create(
    props: OntologyVersionProps,
    id?: UniqueEntityId,
  ): OntologyVersion {
    return new OntologyVersion(props, id);
  }

  public static reconstruct(
    props: OntologyVersionProps,
    id: UniqueEntityId,
  ): OntologyVersion {
    return new OntologyVersion(props, id);
  }

  private validateInvariants(): void {
    if (
      !Number.isInteger(this.props.version) ||
      this.props.version < 1
    ) {
      throw new DomainError(
        'Ontology version must be an integer greater than or equal to 1.',
      );
    }

    if (!this.props.ontologyId) {
      throw new DomainError(
        'Ontology version must reference an ontology.',
      );
    }

    if (!(this.props.createdAt instanceof Date)) {
      throw new DomainError(
        'Ontology version createdAt must be a valid date.',
      );
    }

    if (
      Number.isNaN(
        this.props.createdAt.getTime(),
      )
    ) {
      throw new DomainError(
        'Ontology version createdAt must be a valid date.',
      );
    }
  }

  public publish(): void {
    if (this.props.isPublished) {
      throw new DomainError(
        'Ontology version is already published.',
      );
    }

    this.props.isPublished = true;
  }

  /**
   * Published ontology versions are immutable.
   * This guard is intentionally explicit so application
   * services cannot accidentally mutate a published version.
   */
  public assertMutable(): void {
    if (this.props.isPublished) {
      throw new DomainError(
        'Published ontology versions are immutable.',
      );
    }
  }

  get version(): number {
    return this.props.version;
  }

  get ontologyId(): UniqueEntityId {
    return this.props.ontologyId;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }
}