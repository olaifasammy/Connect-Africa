"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaOwnershipPolicy = void 0;
class MediaOwnershipPolicy {
    static isOwner(media, userId) {
        return media.ownerId.equals(userId);
    }
}
exports.MediaOwnershipPolicy = MediaOwnershipPolicy;
//# sourceMappingURL=MediaOwnershipPolicy.js.map