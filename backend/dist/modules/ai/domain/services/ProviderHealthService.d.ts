import { ProviderHealth } from '../entities/ProviderHealth';
export interface IProviderHealthService {
    updateHealth(health: ProviderHealth): Promise<void>;
}
