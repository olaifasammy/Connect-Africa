"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugValidator = void 0;
class SlugValidator {
    static validate(slug) {
        return /^[a-z0-9-]+$/.test(slug);
    }
}
exports.SlugValidator = SlugValidator;
//# sourceMappingURL=SlugValidator.js.map