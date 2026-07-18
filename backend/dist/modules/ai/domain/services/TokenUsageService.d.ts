export interface ITokenUsageService {
    recordUsage(providerId: string, tokens: number): Promise<void>;
}
