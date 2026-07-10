import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserId } from '@modules/auth/domain/value-objects/UserId';

export interface UserSettingsProps {
  userId: UserId;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  updatedAt: Date;
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
  get notificationsEnabled(): boolean { return this.props.notificationsEnabled; }
  get updatedAt(): Date { return this.props.updatedAt; }

  public updateTheme(theme: 'light' | 'dark'): void {
    this.props.theme = theme;
    this.props.updatedAt = new Date();
  }

  public toggleNotifications(enabled: boolean): void {
    this.props.notificationsEnabled = enabled;
    this.props.updatedAt = new Date();
  }
}
