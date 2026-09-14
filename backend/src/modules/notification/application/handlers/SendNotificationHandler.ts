import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { SendNotificationCommand } from '../commands/SendNotificationCommand';
import { NotificationService } from '../../domain/services/NotificationService';
import { Notification } from '../../domain/entities/NotificationEntities';
import {
  NotificationId,
  RecipientId,
  TemplateId,
  NotificationType,
  DeliveryStatus,
} from '../../domain/value-objects/NotificationValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(SendNotificationHandler, true)
@injectable()
export class SendNotificationHandler {
  constructor(
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {}

  async handle(command: SendNotificationCommand): Promise<string> {
    const notification = new Notification(
      new NotificationId(new UniqueEntityId().toString()),
      new RecipientId(command.recipientId),
      command.type,
      command.title,
      command.content,
      command.targetUrl,
      command.channel,
      DeliveryStatus.PENDING,
      new Date(),
      false,
      command.templateId ? new TemplateId(command.templateId) : null,
    );

    await this.notificationService.send(notification);

    return notification.id.value;
  }
}
