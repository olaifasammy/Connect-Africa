import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UserRegisteredEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly email: string) {
    super(userId);
  }
}
