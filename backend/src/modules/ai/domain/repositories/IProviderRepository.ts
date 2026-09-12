import { Provider } from '../entities/Provider';

export interface IProviderRepository {
  save(provider: Provider): Promise<void>;
  findById(id: string): Promise<Provider | null>;
  findAllEnabled(): Promise<Provider[]>;
}
