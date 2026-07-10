"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationshipSchema = void 0;
const zod_1 = require("zod");
exports.CreateRelationshipSchema = zod_1.z.object({
    sourceEntityId: zod_1.z.string().uuid(),
    targetEntityId: zod_1.z.string().uuid(),
    relationshipTypeId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=RelationshipSchemas.js.map