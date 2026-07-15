"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsOwnershipPolicy = void 0;
class SettingsOwnershipPolicy {
    static isOwner(settings, userId) {
        return settings.userId === userId;
    }
}
exports.SettingsOwnershipPolicy = SettingsOwnershipPolicy;
//# sourceMappingURL=SettingsOwnershipPolicy.js.map