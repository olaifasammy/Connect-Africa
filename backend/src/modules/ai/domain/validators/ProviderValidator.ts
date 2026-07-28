import { Provider } from '../entities/Provider';

export interface IProviderValidator {
  validate(provider: Provider): boolean;
}

export class ProviderValidator implements IProviderValidator {
  validate(provider: Provider): boolean {
    return provider.name.length > 0;
  }
}
