import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface SecuritySettingsProps {
  mfaEnabled: boolean;
}

export class SecuritySettings extends Entity<SecuritySettingsProps> {
  constructor(props: SecuritySettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
