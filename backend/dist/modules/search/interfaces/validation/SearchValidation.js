"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRequestSchema = void 0;
const zod_1 = require("zod");
exports.SearchRequestSchema = zod_1.z.object({
    query: zod_1.z.string().min(1),
    page: zod_1.z.number().int().positive().optional(),
    limit: zod_1.z.number().int().positive().optional(),
    filters: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    sortBy: zod_1.z.union([
        zod_1.z.literal('relevance'),
        zod_1.z.literal('alphabetical'),
        zod_1.z.literal('dateCreated'),
        zod_1.z.literal('dateUpdated'),
        zod_1.z.literal('popularity')
    ]).optional(),
    sortOrder: zod_1.z.union([
        zod_1.z.literal('asc'),
        zod_1.z.literal('desc')
    ]).optional(),
    includeFacets: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=SearchValidation.js.map