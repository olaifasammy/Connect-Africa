import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class OntologyId extends UniqueEntityId {
  private constructor(value?: string) {
    super(value);
  }

  public static create(value?: string): OntologyId {
    return new OntologyId(value);
  }
}
