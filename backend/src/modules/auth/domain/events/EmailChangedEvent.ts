import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class EmailChangedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly newEmail: string) {
    super(userId);
  }
}
