import { Provider } from '../../domain/entities/Provider';
import { IAiGateway } from '../../domain/interfaces/IAiGateway';
export declare class ProviderRegistry {
    private providers;
    register(provider: Provider, instance: IAiGateway): void;
    get(providerId: string): IAiGateway | undefined;
}
