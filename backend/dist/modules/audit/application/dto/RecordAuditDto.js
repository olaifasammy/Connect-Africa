"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordAuditRequestSchema = void 0;
const zod_1 = require("zod");
exports.RecordAuditRequestSchema = zod_1.z.object({
    action: zod_1.z.string().min(1),
    actorId: zod_1.z.string().uuid(),
    actorType: zod_1.z.string().min(1),
    ipAddress: zod_1.z.string(),
    userAgent: zod_1.z.string().min(1),
    resourceId: zod_1.z.string().uuid(),
    resourceType: zod_1.z.string().min(1),
    metadata: zod_1.z.array(zod_1.z.object({
        key: zod_1.z.string(),
        value: zod_1.z.string()
    })).optional()
});
//# sourceMappingURL=RecordAuditDto.js.map