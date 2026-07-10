"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphRoutes = void 0;
const express_1 = require("express");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const graphRoutes = (graphController) => {
    const router = (0, express_1.Router)();
    router.get('/path', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_READ), (req, res) => graphController.getPath(req, res));
    return router;
};
exports.graphRoutes = graphRoutes;
//# sourceMappingURL=GraphRoutes.js.map