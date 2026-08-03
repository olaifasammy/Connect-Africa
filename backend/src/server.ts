import 'reflect-metadata';
import { createApp } from '@shared/interfaces/http/app';
import { appConfig } from '@config/app';
import { logger } from '@shared/logger/Logger';
import { BootstrapService } from '@bootstrap/startup/BootstrapService';

/**
 * Initializes and starts the application server.
 */
async function bootstrap(): Promise<void> {
  try {
    // 1. Run essential startup services (DB connections, migrations, etc.)
    await BootstrapService.run();

    // 2. Initialize the Express/Fastify application instance
    const app = createApp();

    // 3. Start listening for incoming traffic
    const { port, nodeEnv } = appConfig;
    
    const server = app.listen(port, () => {
      logger.info(`🚀 Server successfully running on port ${port} [Mode: ${nodeEnv}]`);
    });

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}, starting graceful shutdown...`);
      server.close(async () => {
        logger.info('Server closed.');
        await BootstrapService.shutdown();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    
  } catch (error) {
    logger.error('💥 Critical failure during application startup:', error);
    process.exit(1);
  }
}

// Handle unexpected global rejections outside the main lifecycle
process.on('unhandledRejection', (reason) => {
  logger.error('⚠️ Unhandled Promise Rejection detected:', reason);
  process.exit(1);
});

// Execute the bootstrap sequence
void bootstrap();
