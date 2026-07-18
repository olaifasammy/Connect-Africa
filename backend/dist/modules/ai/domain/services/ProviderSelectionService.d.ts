import { Provider } from '../entities/Provider';
import { IProviderRepository } from '../repositories/IProviderRepository';
export declare class ProviderSelectionService {
    private readonly providerRepository;
    constructor(providerRepository: IProviderRepository);
    selectBestProvider(): Promise<Provider>;
}
