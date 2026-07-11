"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSourceSchema = void 0;
const zod_1 = require("zod");
const SourceValueObjects_1 = require("../../domain/value-objects/SourceValueObjects");
exports.CreateSourceSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    type: zod_1.z.nativeEnum(SourceValueObjects_1.SourceType),
    author: zod_1.z.string().min(1),
    publishedAt: zod_1.z.string().datetime(),
    url: zod_1.z.string().url().optional(),
    publisher: zod_1.z.string().optional(),
});
//# sourceMappingURL=SourceValidators.js.map