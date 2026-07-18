import { Notification } from '../entities/NotificationEntities';
import { NotificationTemplate } from '../entities/NotificationEntities';
export declare class NotificationValidator {
    validate(notification: Notification): boolean;
}
export declare class TemplateValidator {
    validate(template: NotificationTemplate): boolean;
}
