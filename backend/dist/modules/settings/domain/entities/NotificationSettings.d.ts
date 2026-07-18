import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { NotificationPreference } from '../value-objects/SettingsValueObjects';
interface NotificationSettingsProps {
    enabled: boolean;
    preference: NotificationPreference;
}
export declare class NotificationSettings extends Entity<NotificationSettingsProps> {
    private constructor();
    static create(props: NotificationSettingsProps, id?: UniqueEntityId): NotificationSettings;
    get enabled(): boolean;
    get preference(): NotificationPreference;
    enable(): void;
    disable(): void;
    updatePreference(preference: NotificationPreference): void;
}
export {};
