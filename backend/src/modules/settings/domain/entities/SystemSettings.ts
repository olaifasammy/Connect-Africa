import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

interface SystemSettingsProps {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  updatedAt: Date;
}

export class SystemSettings extends AggregateRoot<SystemSettingsProps> {
  private constructor(props: SystemSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: SystemSettingsProps, id?: UniqueEntityId): SystemSettings {
    return new SystemSettings(props, id);
  }
}
