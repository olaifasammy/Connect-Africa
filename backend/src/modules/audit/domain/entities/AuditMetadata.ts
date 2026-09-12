import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface AuditMetadataProps {
  key: string;
  value: string;
}

export class AuditMetadata extends Entity<AuditMetadataProps> {
  private constructor(props: AuditMetadataProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: AuditMetadataProps, id?: UniqueEntityId): AuditMetadata {
    return new AuditMetadata(props, id);
  }

  get key(): string {
    return this.props.key;
  }

  get value(): string {
    return this.props.value;
  }
}
