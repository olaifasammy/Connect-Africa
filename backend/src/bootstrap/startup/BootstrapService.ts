import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { container, autoDiscoverBindings } from '@bootstrap/container/container';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { OutboxDispatcher } from '@workers/OutboxDispatcher';
import { IModuleInstaller } from '@shared/application/IModuleInstaller';
import { MODULE_INSTALLER_SYMBOL } from '@shared/application/ModuleInstallerSymbol';
import { buildProviderModule } from 'inversify-binding-decorators';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export interface BootstrapStatus {
  postgres: boolean;
  redis: boolean;
}

export class BootstrapService {
  private static pgProvider: PostgresProvider;

  static async run(): Promise<BootstrapStatus> {
    const pattern = process.env.NODE_ENV === 'test' ? 'src/**/*.ts' : 'dist/**/*.js';
    await autoDiscoverBindings(container, pattern);
    container.load(buildProviderModule());

    this.pgProvider = container.get<PostgresProvider>('PostgresProvider');

    let postgres = false;
    let redis = false;

    try {
      await this.pgProvider.connect();
      postgres = true;
    } catch {
      postgres = false;
    }

    try {
      const cacheProvider = container.get<CacheProvider>(CacheProvider);
      redis = await cacheProvider.healthCheck();
    } catch {
      redis = false;
    }

    const outboxDispatcher = container.get(OutboxDispatcher);
    outboxDispatcher.start();

    const eventBus = container.get<EventBus>('EventBus');
    const installers = container.getAll<IModuleInstaller>(
      MODULE_INSTALLER_SYMBOL,
    );

    for (const installer of installers) {
      await installer.install(container, eventBus);
    }

    return {
      postgres,
      redis,
    };
  }

  static async shutdown(): Promise<void> {
    if (this.pgProvider) {
      await this.pgProvider.disconnect();
    }
  }
}
