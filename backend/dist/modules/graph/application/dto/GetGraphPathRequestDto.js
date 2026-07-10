"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGraphPathRequestSchema = void 0;
const zod_1 = require("zod");
exports.GetGraphPathRequestSchema = zod_1.z.object({
    start: zod_1.z.string().uuid(),
    end: zod_1.z.string().uuid(),
});
//# sourceMappingURL=GetGraphPathRequestDto.js.map