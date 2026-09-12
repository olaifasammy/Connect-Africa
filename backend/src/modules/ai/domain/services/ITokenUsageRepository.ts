export interface TokenUsageRecord {
  providerId: string;
  tokens: number;
  timestamp: Date;
}

export interface ITokenUsageRepository {
  save(record: TokenUsageRecord): Promise<void>;
}
