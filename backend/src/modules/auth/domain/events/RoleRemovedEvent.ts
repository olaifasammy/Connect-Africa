import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RoleRemovedEvent extends DomainEvent {
  constructor(
    public readonly userId: UniqueEntityId,
    public readonly role: string,
  ) {
    super(userId);
  }
}
