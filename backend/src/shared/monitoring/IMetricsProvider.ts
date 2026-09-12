export interface IMetricsProvider {
  incrementCounter(name: string, labels: Record<string, string>): void;
  observeDuration(name: string, duration: number, labels: Record<string, string>): void;
  setGauge(name: string, value: number, labels: Record<string, string>): void;
}
