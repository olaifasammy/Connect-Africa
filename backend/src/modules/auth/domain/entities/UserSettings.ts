import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserId } from '../value-objects/UserId';

export interface UserSettingsProps {
  userId: UserId;
  theme: 'light' | 'dark';
  language: string;
  timeZone: string;
  notificationPreferences: Record<string, boolean>;
  privacySettings: Record<string, boolean>;
  accessibilitySettings: Record<string, any>;
}

export class UserSettings extends AggregateRoot<UserSettingsProps> {
  private constructor(props: UserSettingsProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UserSettingsProps, id?: UniqueEntityId): UserSettings {
    return new UserSettings(props, id);
  }

  get userId(): UserId { return this.props.userId; }
  get theme(): 'light' | 'dark' { return this.props.theme; }
  get language(): string { return this.props.language; }
  get timeZone(): string { return this.props.timeZone; }
  get notificationPreferences(): Record<string, boolean> { return this.props.notificationPreferences; }
  get privacySettings(): Record<string, boolean> { return this.props.privacySettings; }
  get accessibilitySettings(): Record<string, any> { return this.props.accessibilitySettings; }

  updateSettings(props: Partial<Omit<UserSettingsProps, 'userId'>>): void {
    Object.assign(this.props, props);
  }
}
