"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Role = void 0;
const Permissions_1 = require("./Permissions");
class Role {
    name;
    permissions;
    constructor(name, permissions) {
        this.name = name;
        this.permissions = permissions;
    }
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
}
exports.Role = Role;
exports.Roles = {
    USER: new Role('USER', [Permissions_1.Permission.USER_READ, Permissions_1.Permission.MFA_MANAGE]),
    ADMIN: new Role('ADMIN', Object.values(Permissions_1.Permission)),
};
//# sourceMappingURL=Role.js.map