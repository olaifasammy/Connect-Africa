import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { SendNotificationCommand } from '../commands/SendNotificationCommand';
import { NotificationService } from '../../domain/services/NotificationService';
import { Notification } from '../../domain/entities/NotificationEntities';
import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../../domain/value-objects/NotificationValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(SendNotificationHandler, true)
@injectable()
export class SendNotificationHandler {
  constructor(
    @inject(NotificationService) private readonly notificationService: NotificationService
  ) {}

  async handle(command: SendNotificationCommand): Promise<string> {
    const notification = new Notification(
      new NotificationId(new UniqueEntityId().toString()),
      new RecipientId(command.recipientId),
      new TemplateId(command.templateId),
      command.channel,
      DeliveryStatus.PENDING,
      new Date()
    );

    await this.notificationService.send(notification);
    return notification.id.value;
  }
}
