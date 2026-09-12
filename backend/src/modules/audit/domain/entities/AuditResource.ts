import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { ResourceId } from '../value-objects/AuditValueObjects';

interface AuditResourceProps {
  id: ResourceId;
  type: string;
}

export class AuditResource extends Entity<AuditResourceProps> {
  private constructor(props: AuditResourceProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: AuditResourceProps, id?: UniqueEntityId): AuditResource {
    return new AuditResource(props, id);
  }

  get resourceId(): ResourceId {
    return this.props.id;
  }

  get type(): string {
    return this.props.type;
  }
}
