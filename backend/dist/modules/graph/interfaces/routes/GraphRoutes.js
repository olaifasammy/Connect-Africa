"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphRoutes = void 0;
const express_1 = require("express");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const graphRoutes = (graphController, authMiddleware) => {
    const router = (0, express_1.Router)();
    router.use(authMiddleware.authenticate);
    router.post('/nodes', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_WRITE), (req, res) => graphController.createNode(req, res));
    router.post('/edges', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_WRITE), (req, res) => graphController.createEdge(req, res));
    router.get('/nodes/:id', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_READ), (req, res) => graphController.getNode(req, res));
    router.get('/search', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_READ), (req, res) => graphController.search(req, res));
    router.get('/path', (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.GRAPH_READ), (req, res) => graphController.shortestPath(req, res));
    return router;
};
exports.graphRoutes = graphRoutes;
//# sourceMappingURL=GraphRoutes.js.map