import { Provider } from '../entities/Provider';
import { IProviderRepository } from '../repositories/IProviderRepository';

export class ProviderSelectionService {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async selectBestProvider(): Promise<Provider> {
    const providers = await this.providerRepository.findAllEnabled();
    if (providers.length === 0) {
      throw new Error('No enabled AI providers available');
    }
    // Simple priority-based selection
    return providers.sort((a, b) => b.priority - a.priority)[0];
  }
}
