"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoValidator = void 0;
class VideoValidator {
    static isValid(mimeType) {
        const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/webm', 'video/ogg'];
        return validVideoTypes.includes(mimeType.value);
    }
}
exports.VideoValidator = VideoValidator;
//# sourceMappingURL=VideoValidator.js.map