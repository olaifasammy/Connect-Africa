import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SessionRevokedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly sessionId: string) {
    super(userId);
  }
}
