"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const metricsMiddleware = (metricsProvider) => (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        metricsProvider.incrementCounter('http_requests_total', { method: req.method, route: req.route?.path || req.path, status: res.statusCode.toString() });
        metricsProvider.observeDuration('http_request_duration_seconds', duration / 1000, { method: req.method, route: req.route?.path || req.path });
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
//# sourceMappingURL=MetricsMiddleware.js.map