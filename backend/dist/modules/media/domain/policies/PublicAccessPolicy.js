"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicAccessPolicy = void 0;
class PublicAccessPolicy {
    static canAccess(media, permissions) {
        // Assuming if no specific permissions are set, it might be public?
        // Or maybe we need a 'PUBLIC' permission?
        // Let's assume there's a way to determine public access.
        // Based on MediaPermission props: 'READ' | 'WRITE' | 'ADMIN'
        // I don't see public access here.
        // I will assume for now it's false unless otherwise specified.
        return false;
    }
}
exports.PublicAccessPolicy = PublicAccessPolicy;
//# sourceMappingURL=PublicAccessPolicy.js.map