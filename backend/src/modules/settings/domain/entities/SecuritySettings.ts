import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface SecuritySettingsProps {
  mfaEnabled: boolean;
}

export class SecuritySettings extends Entity<SecuritySettingsProps> {
  private constructor(props: SecuritySettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: SecuritySettingsProps, id?: UniqueEntityId): SecuritySettings {
    return new SecuritySettings(props, id);
  }

  get mfaEnabled(): boolean { return this.props.mfaEnabled; }

  enableMfa(): void {
    this.props.mfaEnabled = true;
  }

  disableMfa(): void {
    this.props.mfaEnabled = false;
  }
}
