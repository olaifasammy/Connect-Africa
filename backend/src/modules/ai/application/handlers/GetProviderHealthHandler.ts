import { IProviderRepository } from '../../domain/repositories/IProviderRepository';
import { GetProviderHealthQuery } from '../queries/GetProviderHealthQuery';

export class GetProviderHealthHandler {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async handle(query: GetProviderHealthQuery) {
    const provider = await this.providerRepository.findById(query.providerId);
    if (!provider) throw new Error('Provider not found');
    
    // In production, this would query a health monitor service
    return {
      providerId: provider.id,
      name: provider.name,
      status: provider.isEnabled ? 'HEALTHY' : 'UNHEALTHY'
    };
  }
}
