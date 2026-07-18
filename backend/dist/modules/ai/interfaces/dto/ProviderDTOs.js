"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderHealthResponseSchema = void 0;
const zod_1 = require("zod");
exports.ProviderHealthResponseSchema = zod_1.z.object({
    providerId: zod_1.z.string(),
    name: zod_1.z.string(),
    status: zod_1.z.enum(['HEALTHY', 'UNHEALTHY']),
});
//# sourceMappingURL=ProviderDTOs.js.map