"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correlationIdMiddleware = void 0;
const uuid_1 = require("uuid");
const Logger_1 = require("../../../logger/Logger");
const correlationIdMiddleware = (req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || (0, uuid_1.v4)();
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    Logger_1.logger.info(`${req.method} ${req.url} - CorrelationID: ${correlationId}`);
    next();
};
exports.correlationIdMiddleware = correlationIdMiddleware;
//# sourceMappingURL=CorrelationIdMiddleware.js.map