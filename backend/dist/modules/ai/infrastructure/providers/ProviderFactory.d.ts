import { Provider } from '../../domain/entities/Provider';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';
export interface IProviderFactory {
    createProvider(provider: Provider): IAiGateway;
}
export declare class ProviderFactory implements IProviderFactory {
    createProvider(provider: Provider): IAiGateway;
}
