import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { UserId } from '../value-objects/UserId';
export interface UserPreferencesProps {
    userId: UserId;
    receiveEmailNotifications: boolean;
    receivePushNotifications: boolean;
}
export declare class UserPreferences extends AggregateRoot<UserPreferencesProps> {
    private constructor();
    static create(props: UserPreferencesProps, id?: UniqueEntityId): UserPreferences;
    get userId(): UserId;
    get receiveEmailNotifications(): boolean;
    get receivePushNotifications(): boolean;
    updateNotifications(email: boolean, push: boolean): void;
}
