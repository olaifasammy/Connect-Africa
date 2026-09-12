import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { Container } from 'inversify';

import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class RelationshipModuleInstaller implements IModuleInstaller {
  async install(
    _container: Container,
    _eventBus: EventBus,
  ): Promise<void> {
    // Relationship currently has no module-owned event subscriptions.
    //
    // RelationshipCreated/Updated/Deleted events are emitted by the
    // aggregate and consumed by downstream modules such as Graph.
  }
}