import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface AuditLogRequestedEventPayload {
  action: string;
  actorId: string;
  actorType: string;
  ipAddress: string;
  userAgent: string;
  resourceId: string;
  resourceType: string;
  metadata: { key: string; value: string }[];
}

export class AuditLogRequestedEvent extends DomainEvent {
  constructor(public readonly payload: AuditLogRequestedEventPayload) {
    super(new UniqueEntityId(payload.actorId));
  }
}
