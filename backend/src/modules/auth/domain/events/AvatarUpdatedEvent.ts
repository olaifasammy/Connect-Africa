import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class AvatarUpdatedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly avatarUrl: string) {
    super(userId);
  }
}
