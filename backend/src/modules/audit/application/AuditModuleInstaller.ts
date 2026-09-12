import { Container } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { injectable } from 'inversify';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class AuditModuleInstaller implements IModuleInstaller {
  async install(container: Container, eventBus: EventBus): Promise<void> {
    // Audit module currently has no event subscriptions in BootstrapService.
  }
}
