import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
interface NotificationSettingsProps {
    enabled: boolean;
}
export declare class NotificationSettings extends Entity<NotificationSettingsProps> {
    constructor(props: NotificationSettingsProps, id?: UniqueEntityId);
}
export {};
