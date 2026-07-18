import { TokenUsage } from '../entities/TokenUsage';
export interface ITokenUsageRepository {
    save(usage: TokenUsage): Promise<void>;
    findByProvider(providerId: string): Promise<TokenUsage[]>;
}
