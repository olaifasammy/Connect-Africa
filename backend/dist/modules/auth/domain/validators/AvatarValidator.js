"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarValidator = void 0;
class AvatarValidator {
    static validate(url) {
        const avatarRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
        if (!avatarRegex.test(url)) {
            throw new Error('Invalid avatar URL format');
        }
    }
}
exports.AvatarValidator = AvatarValidator;
//# sourceMappingURL=AvatarValidator.js.map