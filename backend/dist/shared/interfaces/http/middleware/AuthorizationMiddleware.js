"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authorize = void 0;
const PermissionEvaluator_1 = require("../../../../modules/auth/domain/policies/rbac/PermissionEvaluator");
const Role_1 = require("../../../../modules/auth/domain/policies/rbac/Role");
const authorize = (permission) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
    }
    try {
        const userRoleIdentifier = user.role || Role_1.Roles.USER.name;
        const role = Role_1.Roles[userRoleIdentifier] || Role_1.Roles.USER;
        PermissionEvaluator_1.PermissionEvaluator.evaluate(role, permission, user.id.toString());
        next();
    }
    catch (err) {
        res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: err.message }] });
    }
};
exports.authorize = authorize;
const authorizeRole = (role) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
    }
    const userRoleIdentifier = user.role || Role_1.Roles.USER.name;
    const userRole = Role_1.Roles[userRoleIdentifier] || Role_1.Roles.USER;
    if (userRole !== role) {
        return res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: 'Insufficient role' }] });
    }
    next();
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=AuthorizationMiddleware.js.map