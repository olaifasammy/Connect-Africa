import { Notification } from '../entities/NotificationEntities';
import { NotificationTemplate } from '../entities/NotificationEntities';

export class NotificationValidator {
  validate(notification: Notification): boolean {
    return !!notification.id && !!notification.recipientId;
  }
}

export class TemplateValidator {
  validate(template: NotificationTemplate): boolean {
    return !!template.id && !!template.content;
  }
}
