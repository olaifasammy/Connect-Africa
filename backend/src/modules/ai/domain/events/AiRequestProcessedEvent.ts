export interface IAiRequestProcessedEvent {
  requestId: string;
  provider: string;
  tokensUsed: number;
  timestamp: Date;
}
