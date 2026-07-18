"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAuthorizationMiddleware = void 0;
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const public_1 = require("../../../auth/public");
// Reusing existing infrastructure
exports.AiAuthorizationMiddleware = (0, AuthorizationMiddleware_1.authorizeRole)(public_1.Roles.ADMIN);
//# sourceMappingURL=AiAuthorizationMiddleware.js.map