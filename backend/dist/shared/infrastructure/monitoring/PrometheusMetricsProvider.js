"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusMetricsProvider = void 0;
const prom_client_1 = require("prom-client");
class PrometheusMetricsProvider {
    registry;
    counters = new Map();
    histograms = new Map();
    gauges = new Map();
    constructor() {
        this.registry = new prom_client_1.Registry();
        (0, prom_client_1.collectDefaultMetrics)({ register: this.registry });
    }
    incrementCounter(name, labels) {
        if (!this.counters.has(name)) {
            this.counters.set(name, new prom_client_1.Counter({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
        }
        this.counters.get(name).inc(labels);
    }
    observeDuration(name, duration, labels) {
        if (!this.histograms.has(name)) {
            this.histograms.set(name, new prom_client_1.Histogram({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
        }
        this.histograms.get(name).observe(labels, duration);
    }
    setGauge(name, value, labels) {
        if (!this.gauges.has(name)) {
            this.gauges.set(name, new prom_client_1.Gauge({ name, help: name, labelNames: Object.keys(labels), registers: [this.registry] }));
        }
        this.gauges.get(name).set(labels, value);
    }
    async getMetrics() {
        return await this.registry.metrics();
    }
}
exports.PrometheusMetricsProvider = PrometheusMetricsProvider;
//# sourceMappingURL=PrometheusMetricsProvider.js.map