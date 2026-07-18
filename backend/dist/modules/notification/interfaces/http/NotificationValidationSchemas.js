"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendNotificationSchema = void 0;
const zod_1 = require("zod");
exports.SendNotificationSchema = zod_1.z.object({
    recipientId: zod_1.z.string().uuid(),
    templateId: zod_1.z.string().uuid(),
    channel: zod_1.z.enum(['IN_APP', 'EMAIL', 'PUSH']),
});
//# sourceMappingURL=NotificationValidationSchemas.js.map