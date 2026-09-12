import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { NotificationPreference } from '../value-objects/SettingsValueObjects';

interface NotificationSettingsProps {
  enabled: boolean;
  preference: NotificationPreference;
}

export class NotificationSettings extends Entity<NotificationSettingsProps> {
  private constructor(props: NotificationSettingsProps, id?: UniqueEntityId) {
    super(props, id || new UniqueEntityId());
  }

  static create(props: NotificationSettingsProps, id?: UniqueEntityId): NotificationSettings {
    return new NotificationSettings(props, id);
  }

  get enabled(): boolean { return this.props.enabled; }
  get preference(): NotificationPreference { return this.props.preference; }

  enable(): void {
    this.props.enabled = true;
  }

  disable(): void {
    this.props.enabled = false;
  }

  updatePreference(preference: NotificationPreference): void {
    this.props.preference = preference;
  }
}
