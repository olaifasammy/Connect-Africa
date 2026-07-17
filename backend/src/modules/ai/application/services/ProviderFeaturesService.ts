export class ProviderFeaturesService {
  async performHealthCheck(providerId: string): Promise<boolean> {
    console.log(`[HEALTH] Checking health for ${providerId}`);
    return true;
  }
}
