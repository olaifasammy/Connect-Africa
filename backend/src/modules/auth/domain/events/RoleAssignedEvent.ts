import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RoleAssignedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly roleId: string) {
    super(userId);
  }
}
