import { provide } from 'inversify-binding-decorators';
import { injectable, Container } from 'inversify';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class ArticleModuleInstaller implements IModuleInstaller {
  async install(_container: Container, _eventBus: EventBus): Promise<void> {
    // Article module installer initialization.
    // Downstream cross-module subscriptions (Entity, Media, Search, Audit, Analytics)
    // subscribe independently via public contracts.
  }
}
