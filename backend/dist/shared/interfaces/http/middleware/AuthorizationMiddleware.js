"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const PermissionEvaluator_1 = require("../../../../modules/auth/domain/policies/rbac/PermissionEvaluator");
const authorize = (permission) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
    }
    try {
        // Assuming user has roles available, need to ensure User aggregate has roles
        // For now, this is a placeholder for the real role extraction
        const userRole = user.role || 'USER';
        PermissionEvaluator_1.PermissionEvaluator.evaluate(userRole, permission, user.id.toString());
        next();
    }
    catch (err) {
        res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: err.message }] });
    }
};
exports.authorize = authorize;
//# sourceMappingURL=AuthorizationMiddleware.js.map