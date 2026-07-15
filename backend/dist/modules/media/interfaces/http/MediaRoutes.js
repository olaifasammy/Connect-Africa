"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMediaRoutes = createMediaRoutes;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const MediaMiddleware_1 = require("./middleware/MediaMiddleware");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
function createMediaRoutes(controller, authMiddleware) {
    const router = (0, express_1.Router)();
    router.post('/', authMiddleware.authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_CREATE), MediaMiddleware_1.uploadRateLimiter, upload.single('file'), MediaMiddleware_1.validateFile, MediaMiddleware_1.virusScanHook, controller.upload.bind(controller));
    router.post('/:mediaId/attach', authMiddleware.authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_UPDATE), controller.attach.bind(controller));
    return router;
}
//# sourceMappingURL=MediaRoutes.js.map