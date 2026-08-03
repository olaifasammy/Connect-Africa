import { logger } from '@shared/logger/Logger';

export class ProviderFeaturesService {
  async performHealthCheck(providerId: string): Promise<boolean> {
    logger.info(`[HEALTH] Checking health for ${providerId}`);
    return true;
  }
}
