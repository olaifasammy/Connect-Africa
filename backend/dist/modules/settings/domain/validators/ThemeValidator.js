"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeValidator = void 0;
class ThemeValidator {
    static validate(theme) {
        return ['light', 'dark'].includes(theme);
    }
}
exports.ThemeValidator = ThemeValidator;
//# sourceMappingURL=ThemeValidator.js.map