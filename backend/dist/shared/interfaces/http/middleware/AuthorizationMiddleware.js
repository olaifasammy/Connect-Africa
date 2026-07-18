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
        // For test scenarios, we allow bypassing via a special header or test environment check
        if (process.env.NODE_ENV === 'test' && req.headers['x-test-role']) {
            const role = Role_1.Roles[req.headers['x-test-role']] || Role_1.Roles.USER;
            PermissionEvaluator_1.PermissionEvaluator.evaluate(role, permission, user.id.toString());
            next();
            return;
        }
        const userRole = user.role || Role_1.Roles.USER.name;
        PermissionEvaluator_1.PermissionEvaluator.evaluate(userRole, permission, user.id.toString());
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
    const userRole = user.role || Role_1.Roles.USER.name;
    if (userRole !== role) {
        return res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: 'Insufficient role' }] });
    }
    next();
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=AuthorizationMiddleware.js.map