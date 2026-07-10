import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { DomainError } from '../errors/DomainError';

export interface OntologyVersionProps {
  version: number;
  isPublished: boolean;
  createdAt: Date;
}

export class OntologyVersion extends AggregateRoot<OntologyVersionProps> {
  private constructor(props: OntologyVersionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: OntologyVersionProps, id?: UniqueEntityId): OntologyVersion {
    if (props.version < 1) {
      throw new DomainError('Ontology version must be at least 1.');
    }
    return new OntologyVersion(props, id);
  }

  get version(): number {
    return this.props.version;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }

  public publish(): void {
    if (this.props.isPublished) {
      throw new DomainError('Version is already published.');
    }
    this.props.isPublished = true;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
