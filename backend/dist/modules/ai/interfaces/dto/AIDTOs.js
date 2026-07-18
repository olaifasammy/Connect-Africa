"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIResponseDTOSchema = exports.AIRequestDTOSchema = void 0;
const zod_1 = require("zod");
exports.AIRequestDTOSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1),
    provider: zod_1.z.string().optional(),
    context: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
exports.AIResponseDTOSchema = zod_1.z.object({
    content: zod_1.z.string(),
    tokensUsed: zod_1.z.number(),
    cost: zod_1.z.number().optional(),
    provider: zod_1.z.string(),
});
//# sourceMappingURL=AIDTOs.js.map