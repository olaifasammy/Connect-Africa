import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class OntologyVersionCreatedEvent extends DomainEvent {
  constructor(public readonly ontologyVersionId: UniqueEntityId) {
    super(ontologyVersionId);
  }
}
