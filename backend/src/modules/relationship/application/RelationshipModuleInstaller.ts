import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { Container } from 'inversify';

import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { EntityMergedHandler } from './handlers/EntityMergedHandler';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class RelationshipModuleInstaller implements IModuleInstaller {
  async install(
    container: Container,
    eventBus: EventBus,
  ): Promise<void> {
    const entityMergedHandler = container.get(EntityMergedHandler);
    await eventBus.subscribe(EntityMergedEvent, (event) =>
      entityMergedHandler.handle(event),
    );
  }
}
