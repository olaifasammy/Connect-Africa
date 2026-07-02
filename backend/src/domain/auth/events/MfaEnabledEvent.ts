import { DomainEvent } from '@domain/shared/DomainEvent';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export class MfaEnabledEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId) {
    super(userId);
  }
}
