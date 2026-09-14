import { Container, inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { NotificationService } from '../domain/services/NotificationService';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class NotificationModuleInstaller implements IModuleInstaller {
  constructor(
    @inject(NotificationService)
    private readonly notificationService: NotificationService,
  ) {}

  async install(_container: Container, _eventBus: EventBus): Promise<void> {
    /*
     * ArticlePublishedEvent currently carries only articleId and does not
     * provide an audience/subscriber set. We therefore do not create
     * synthetic notifications for a hardcoded recipient.
     *
     * Future flow:
     * ArticlePublishedEvent
     *   -> audience resolution
     *   -> notification creation for each recipient
     *
     * NotificationService remains available for explicit/system/AI
     * notification creation.
     */
    void this.notificationService;
  }
}
