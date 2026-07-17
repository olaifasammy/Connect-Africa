import { Provider } from '../../domain/entities/Provider';
import { GeminiProvider } from './GeminiProvider';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';

export interface IProviderFactory {
  createProvider(provider: Provider): IAiGateway;
}

export class ProviderFactory implements IProviderFactory {
  createProvider(provider: Provider): IAiGateway {
    switch (provider.name) {
      case 'Gemini':
        return new GeminiProvider();
      default:
        throw new Error(`Provider ${provider.name} not supported`);
    }
  }
}
