"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedFileTypePolicy = void 0;
class AllowedFileTypePolicy {
    static isAllowed(mimeType) {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'video/mp4',
            'audio/mpeg',
            'application/pdf',
            'application/json'
        ];
        return allowedTypes.includes(mimeType);
    }
}
exports.AllowedFileTypePolicy = AllowedFileTypePolicy;
//# sourceMappingURL=AllowedFileTypePolicy.js.map