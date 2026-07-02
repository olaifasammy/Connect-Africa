import { DomainEvent } from '@domain/shared/DomainEvent';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export class UserCreatedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly email: string) {
    super(userId);
  }
}
