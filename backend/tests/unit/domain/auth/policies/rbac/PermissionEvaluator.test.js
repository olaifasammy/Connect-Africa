"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PermissionEvaluator_1 = require("@modules/auth/domain/policies/rbac/PermissionEvaluator");
const Role_1 = require("@modules/auth/domain/policies/rbac/Role");
const Permissions_1 = require("@modules/auth/domain/policies/rbac/Permissions");
const AuthErrors_1 = require("@modules/auth/domain/errors/AuthErrors");
describe('PermissionEvaluator', () => {
    it('should allow authorized role', () => {
        expect(() => PermissionEvaluator_1.PermissionEvaluator.evaluate(Role_1.Roles.USER, Permissions_1.Permission.USER_READ, 'user-id')).not.toThrow();
    });
    it('should deny unauthorized role', () => {
        expect(() => PermissionEvaluator_1.PermissionEvaluator.evaluate(Role_1.Roles.USER, Permissions_1.Permission.SESSION_MANAGE, 'user-id')).toThrow(AuthErrors_1.AuthenticationError);
    });
});
//# sourceMappingURL=PermissionEvaluator.test.js.map