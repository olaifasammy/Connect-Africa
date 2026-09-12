import { Container } from 'inversify';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { provide } from 'inversify-binding-decorators';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';

import { injectable } from 'inversify';
@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class NotificationModuleInstaller implements IModuleInstaller {
  async install(container: Container, eventBus: EventBus): Promise<void> {
    // No relevant event subscriptions in BootstrapService
  }
}
