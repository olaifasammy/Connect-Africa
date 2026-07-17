import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserId, IPAddress, UserAgent } from '../value-objects/AuditValueObjects';

interface AuditActorProps {
  userId: UserId;
  actorType: string;
  ipAddress: IPAddress;
  userAgent: UserAgent;
}

export class AuditActor extends Entity<AuditActorProps> {
  private constructor(props: AuditActorProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: AuditActorProps, id?: UniqueEntityId): AuditActor {
    return new AuditActor(props, id);
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get actorType(): string {
    return this.props.actorType;
  }

  get ipAddress(): IPAddress {
    return this.props.ipAddress;
  }

  get userAgent(): UserAgent {
    return this.props.userAgent;
  }
}
