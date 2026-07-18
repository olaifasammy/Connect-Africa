import { Provider } from '../../domain/entities/Provider';
export declare class ProviderAuditHelper {
    static logProviderChange(provider: Provider, action: 'ADD' | 'REMOVE' | 'ENABLE' | 'DISABLE'): void;
}
