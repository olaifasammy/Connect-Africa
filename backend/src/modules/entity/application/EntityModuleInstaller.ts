import { Container } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

import { ArticleLinkedToEntityHandler } from '@modules/entity/application/events/ArticleLinkedToEntityHandler';
import { ArticleUpdatedEvent } from '@modules/article/public';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class EntityModuleInstaller implements IModuleInstaller {
  async install(
    container: Container,
    eventBus: EventBus,
  ): Promise<void> {
    const articleLinkedToEntityHandler =
      container.get(ArticleLinkedToEntityHandler);

    await eventBus.subscribe(
      ArticleUpdatedEvent.name,
      async (event: ArticleUpdatedEvent) => {
        await articleLinkedToEntityHandler.handle(event);
      },
    );
  }
}