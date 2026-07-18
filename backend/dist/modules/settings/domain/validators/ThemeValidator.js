"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeValidator = void 0;
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class ThemeValidator {
    static validate(theme) {
        new SettingsValueObjects_1.Theme(theme); // Will throw if invalid
    }
}
exports.ThemeValidator = ThemeValidator;
//# sourceMappingURL=ThemeValidator.js.map