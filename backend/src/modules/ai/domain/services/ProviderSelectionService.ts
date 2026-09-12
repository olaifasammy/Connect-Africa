import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { Provider } from '../entities/Provider';
import { IProviderRepository } from '../repositories/IProviderRepository';

@provide(ProviderSelectionService, true)
@injectable()
export class ProviderSelectionService {
  constructor(
    @inject('IProviderRepository') private readonly providerRepository: IProviderRepository
  ) {}

  async selectBestProvider(): Promise<Provider> {
    const providers = await this.providerRepository.findAllEnabled();
    if (providers.length === 0) {
      throw new Error('No enabled AI providers available');
    }
    // Simple priority-based selection
    return providers.sort((a, b) => b.priority - a.priority)[0];
  }
}
