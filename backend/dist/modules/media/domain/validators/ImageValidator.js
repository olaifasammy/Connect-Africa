"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidator = void 0;
class ImageValidator {
    static isValid(mimeType) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return validImageTypes.includes(mimeType.value);
    }
}
exports.ImageValidator = ImageValidator;
//# sourceMappingURL=ImageValidator.js.map