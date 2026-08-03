import { AggregateRoot } from '@shared/domain/AggregateRoot';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { UserId } from '../value-objects/UserId';

export interface UserPreferencesProps {
  userId: UserId;
  receiveEmailNotifications: boolean;
  receivePushNotifications: boolean;
}

export class UserPreferences extends AggregateRoot<UserPreferencesProps> {
  private constructor(props: UserPreferencesProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UserPreferencesProps, id?: UniqueEntityId): UserPreferences {
    return new UserPreferences(props, id);
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get receiveEmailNotifications(): boolean {
    return this.props.receiveEmailNotifications;
  }

  get receivePushNotifications(): boolean {
    return this.props.receivePushNotifications;
  }

  updateNotifications(email: boolean, push: boolean): void {
    this.props.receiveEmailNotifications = email;
    this.props.receivePushNotifications = push;
  }
}
