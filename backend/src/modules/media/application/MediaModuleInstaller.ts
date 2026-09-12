import { Container } from 'inversify';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { provide } from 'inversify-binding-decorators';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { ArticleLinkedToMediaHandler } from '@modules/media/application/events/ArticleLinkedToMediaHandler';
import { ArticleUpdatedEvent } from '@modules/article/public';

import { injectable } from 'inversify';
@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class MediaModuleInstaller implements IModuleInstaller {
  async install(container: Container, eventBus: EventBus): Promise<void> {
    const articleLinkedToMediaHandler = container.get(ArticleLinkedToMediaHandler);
    await eventBus.subscribe(ArticleUpdatedEvent.name, async (event: any) => {
      await articleLinkedToMediaHandler.handle(event);
    });
  }
}
