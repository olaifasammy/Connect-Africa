import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
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
export declare class UserSettings extends AggregateRoot<UserSettingsProps> {
    private constructor();
    static create(props: UserSettingsProps, id?: UniqueEntityId): UserSettings;
    get userId(): UserId;
    get theme(): 'light' | 'dark';
    get language(): string;
    get timeZone(): string;
    get notificationPreferences(): Record<string, boolean>;
    get privacySettings(): Record<string, boolean>;
    get accessibilitySettings(): Record<string, any>;
    updateSettings(props: Partial<Omit<UserSettingsProps, 'userId'>>): void;
}
