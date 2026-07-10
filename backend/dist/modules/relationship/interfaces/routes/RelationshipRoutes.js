"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationshipRoutes = void 0;
const express_1 = require("express");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const ZodValidationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/ZodValidationMiddleware");
const RelationshipValidators_1 = require("../../application/validators/RelationshipValidators");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const relationshipRoutes = (controller, authMiddleware) => {
    const router = (0, express_1.Router)();
    // Apply security and validation middleware
    router.post('/', authMiddleware.authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.RELATIONSHIP_WRITE), (0, ZodValidationMiddleware_1.validate)(RelationshipValidators_1.CreateRelationshipSchema), controller.create.bind(controller));
    return router;
};
exports.relationshipRoutes = relationshipRoutes;
//# sourceMappingURL=RelationshipRoutes.js.map