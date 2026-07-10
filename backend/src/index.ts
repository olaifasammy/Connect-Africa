import 'reflect-metadata';
import { createApp } from '@shared/interfaces/http/app';
import { appConfig } from '@config/app';
import { logger } from '@shared/logger/Logger';
import { BootstrapService } from '@bootstrap/startup/BootstrapService';

const start = async () => {
  await BootstrapService.run();

  const app = createApp();

  app.listen(appConfig.port, () => {
    logger.info(`Server running on port ${appConfig.port} in ${appConfig.nodeEnv} mode`);
  });
};

start().catch((err) => {
  logger.error('Failed to start application', err);
  process.exit(1);
});
