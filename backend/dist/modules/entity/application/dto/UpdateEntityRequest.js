"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntitySchema = void 0;
const zod_1 = require("zod");
exports.UpdateEntitySchema = zod_1.z.object({
    description: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=UpdateEntityRequest.js.map