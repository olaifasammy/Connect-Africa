import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditId, CorrelationId, Timestamp } from '../value-objects/AuditValueObjects';
import { AuditActor } from '../entities/AuditActor';
import { AuditResource } from '../entities/AuditResource';
import { AuditMetadata } from '../entities/AuditMetadata';

interface AuditEntryProps {
  action: string;
  actor: AuditActor;
  resource: AuditResource;
  metadata: AuditMetadata[];
  correlationId: CorrelationId;
  timestamp: Timestamp;
}

export class AuditEntry extends AggregateRoot<AuditEntryProps> {
  private constructor(props: AuditEntryProps, id?: AuditId) {
    super(props, id || new AuditId());
  }

  static create(props: AuditEntryProps, id?: AuditId): AuditEntry {
    return new AuditEntry(props, id);
  }

  get action(): string {
    return this.props.action;
  }

  get actor(): AuditActor {
    return this.props.actor;
  }

  get resource(): AuditResource {
    return this.props.resource;
  }

  get metadata(): AuditMetadata[] {
    return this.props.metadata;
  }

  get correlationId(): CorrelationId {
    return this.props.correlationId;
  }

  get timestamp(): Timestamp {
    return this.props.timestamp;
  }
}
