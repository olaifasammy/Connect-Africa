"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSettingsPolicy = void 0;
const public_1 = require("../../../auth/public");
class AdminSettingsPolicy {
    static isAuthorized(role, userId) {
        try {
            public_1.AdminPolicy.isAdmin(role, userId);
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.AdminSettingsPolicy = AdminSettingsPolicy;
//# sourceMappingURL=AdminSettingsPolicy.js.map