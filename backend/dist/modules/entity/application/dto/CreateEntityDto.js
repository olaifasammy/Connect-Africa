"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntitySchema = void 0;
const zod_1 = require("zod");
exports.CreateEntitySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(255),
    type: zod_1.z.string().min(1, 'Type is required'),
    description: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=CreateEntityDto.js.map