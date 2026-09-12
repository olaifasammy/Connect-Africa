import { Container, inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { ArticlePublishedEvent } from '@modules/article/public';
import { NotificationService } from '../domain/services/NotificationService';
import { Notification } from '../domain/entities/NotificationEntities';
import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../domain/value-objects/NotificationValueObjects';
import crypto from 'crypto';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class NotificationModuleInstaller implements IModuleInstaller {
  constructor(@inject(NotificationService) private readonly notificationService: NotificationService) {}

  async install(_container: Container, eventBus: EventBus): Promise<void> {
    await eventBus.subscribe(
      ArticlePublishedEvent.name,
      async (_event: ArticlePublishedEvent) => {
        const notification = new Notification(
          new NotificationId(crypto.randomUUID()),
          new RecipientId('system-admin'),
          new TemplateId('article-published'),
          ChannelType.IN_APP,
          DeliveryStatus.PENDING,
          new Date(),
          false
        );
        try {
          await this.notificationService.send(notification);
        } catch {
          // Failure isolation
        }
      }
    );
  }
}
