"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAuditMiddleware = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
const AiAuditMiddleware = (req, res, next) => {
    const user = req.user;
    AuditLogger_1.AuditLogger.log({
        user: user?.id || 'anonymous',
        action: `AI_${req.method}_${req.originalUrl}`,
        resource: 'AI_GATEWAY',
        status: 'SUCCESS'
    });
    next();
};
exports.AiAuditMiddleware = AiAuditMiddleware;
//# sourceMappingURL=AiAuditMiddleware.js.map