import { Provider } from '../entities/Provider';

export interface IProviderSelectionPolicy {
  isEligible(provider: Provider): boolean;
}

export class DefaultProviderSelectionPolicy implements IProviderSelectionPolicy {
  isEligible(provider: Provider): boolean {
    return provider.isEnabled;
  }
}
