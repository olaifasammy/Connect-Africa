"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOntologySchema = void 0;
const zod_1 = require("zod");
exports.CreateOntologySchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    version: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=OntologyValidationDto.js.map