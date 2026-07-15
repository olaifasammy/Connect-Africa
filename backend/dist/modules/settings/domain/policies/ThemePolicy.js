"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemePolicy = void 0;
class ThemePolicy {
    static canChangeTheme(theme) {
        return ['light', 'dark'].includes(theme);
    }
}
exports.ThemePolicy = ThemePolicy;
//# sourceMappingURL=ThemePolicy.js.map