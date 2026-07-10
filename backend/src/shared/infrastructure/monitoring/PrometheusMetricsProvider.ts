import { Counter, Histogram, Registry, Gauge, collectDefaultMetrics } from 'prom-client';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

export class PrometheusMetricsProvider implements IMetricsProvider {
  private registry: Registry;
  private counters: Map<string, Counter<string>> = new Map();
  private histograms: Map<string, Histogram<string>> = new Map();
  private gauges: Map<string, Gauge<string>> = new Map();

  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });
  }

  incrementCounter(name: string, labels: Record<string, string>): void {
    if (!this.counters.has(name)) {
      this.counters.set(name, new Counter({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
    }
    this.counters.get(name)!.inc(labels);
  }

  observeDuration(name: string, duration: number, labels: Record<string, string>): void {
    if (!this.histograms.has(name)) {
      this.histograms.set(name, new Histogram({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
    }
    this.histograms.get(name)!.observe(labels, duration);
  }

  setGauge(name: string, value: number, labels: Record<string, string>): void {
    if (!this.gauges.has(name)) {
      this.gauges.set(name, new Gauge({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
    }
    this.gauges.get(name)!.set(labels, value);
  }

  async getMetrics(): Promise<string> {
    return await this.registry.metrics();
  }
}
