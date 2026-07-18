import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { UserId } from '../../../auth/public';
export interface UserSettingsProps {
    userId: UserId;
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
    updatedAt: Date;
}
export declare class UserSettings extends AggregateRoot<UserSettingsProps> {
    private constructor();
    static create(props: UserSettingsProps, id?: UniqueEntityId): UserSettings;
    get userId(): UserId;
    get theme(): 'light' | 'dark';
    get notificationsEnabled(): boolean;
    get updatedAt(): Date;
    updateTheme(theme: 'light' | 'dark'): void;
    toggleNotifications(enabled: boolean): void;
}
