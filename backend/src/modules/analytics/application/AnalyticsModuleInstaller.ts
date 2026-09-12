import { Container, inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AnalyticsEventSubscriber } from './services/AnalyticsEventSubscriber';

@provide(MODULE_INSTALLER_SYMBOL, true)
@injectable()
export class AnalyticsModuleInstaller implements IModuleInstaller {
  constructor(@inject(AnalyticsEventSubscriber) private readonly eventSubscriber: AnalyticsEventSubscriber) {}

  async install(_container: Container, _eventBus: EventBus): Promise<void> {
    await this.eventSubscriber.subscribeToAll();
  }
}
