import { IMetricsProvider } from '../../monitoring/IMetricsProvider';
export declare class PrometheusMetricsProvider implements IMetricsProvider {
    private registry;
    private counters;
    private histograms;
    private gauges;
    constructor();
    incrementCounter(name: string, labels: Record<string, string>): void;
    observeDuration(name: string, duration: number, labels: Record<string, string>): void;
    setGauge(name: string, value: number, labels: Record<string, string>): void;
    getMetrics(): Promise<string>;
}
