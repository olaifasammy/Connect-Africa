export interface IAIAnalyticsService {
  trackInteraction(data: Record<string, unknown>): Promise<void>;
}
