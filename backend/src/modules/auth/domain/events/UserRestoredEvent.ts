import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UserRestoredEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId) {
    super(userId);
  }
}
