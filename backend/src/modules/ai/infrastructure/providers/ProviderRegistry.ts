import { Provider } from '../../domain/entities/Provider';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';

export class ProviderRegistry {
  private providers: Map<string, IAiGateway> = new Map();

  register(provider: Provider, instance: IAiGateway): void {
    this.providers.set(provider.id, instance);
  }

  get(providerId: string): IAiGateway | undefined {
    return this.providers.get(providerId);
  }
}
