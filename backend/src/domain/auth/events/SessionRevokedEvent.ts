import { DomainEvent } from '@domain/shared/DomainEvent';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

export class SessionRevokedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly sessionId: string) {
    super(userId);
  }
}
