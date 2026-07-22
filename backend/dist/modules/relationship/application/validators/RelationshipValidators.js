"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRangeSchema = exports.MetadataSchema = exports.ConfidenceSchema = exports.CardinalitySchema = exports.UpdateRelationshipSchema = exports.CreateRelationshipSchema = void 0;
const zod_1 = require("zod");
exports.CreateRelationshipSchema = zod_1.z.object({
    sourceEntityId: zod_1.z.string().uuid(),
    sourceEntityTypeId: zod_1.z.string().uuid(),
    targetEntityId: zod_1.z.string().uuid(),
    targetEntityTypeId: zod_1.z.string().uuid(),
    relationshipTypeId: zod_1.z.string().uuid(),
});
exports.UpdateRelationshipSchema = zod_1.z.object({
    relationshipTypeId: zod_1.z.string().uuid(),
});
exports.CardinalitySchema = zod_1.z.object({
    maxCount: zod_1.z.number().int().positive(),
});
exports.ConfidenceSchema = zod_1.z.object({
    score: zod_1.z.number().min(0).max(1),
});
exports.MetadataSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.any());
exports.TimeRangeSchema = zod_1.z.object({
    start: zod_1.z.date(),
    end: zod_1.z.date().optional(),
}).refine(data => !data.end || data.start <= data.end, {
    message: "Start date must be before end date",
    path: ["end"],
});
//# sourceMappingURL=RelationshipValidators.js.map