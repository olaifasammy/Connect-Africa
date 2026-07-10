"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipPolicy = void 0;
class OwnershipPolicy {
    static isOwner(user, resourceOwnerId) {
        return user.id.toString() === resourceOwnerId;
    }
}
exports.OwnershipPolicy = OwnershipPolicy;
//# sourceMappingURL=OwnershipPolicy.js.map