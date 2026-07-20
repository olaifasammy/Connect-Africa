import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { logger } from '@shared/logger/Logger';

export class BootstrapService {
  private static pgProvider: PostgresProvider;

  static async run(): Promise<void> {
    logger.info('Starting application bootstrap...');

    // Initialize Database
    this.pgProvider = new PostgresProvider();
    await this.pgProvider.connect();
    
    logger.info('Application bootstrap completed successfully.');
  }

  static async shutdown(): Promise<void> {
    logger.info('Starting application shutdown...');

    // Close Database
    if (this.pgProvider) {
      await this.pgProvider.disconnect();
    }

    logger.info('Application shutdown completed successfully.');
  }
}
