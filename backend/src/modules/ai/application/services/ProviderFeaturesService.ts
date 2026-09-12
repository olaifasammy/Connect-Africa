import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { logger } from '@shared/logger/Logger';

@provide(ProviderFeaturesService, true)
@injectable()
export class ProviderFeaturesService {
  async performHealthCheck(providerId: string): Promise<boolean> {
    logger.info(`[HEALTH] Checking health for ${providerId}`);
    return true;
  }
}
