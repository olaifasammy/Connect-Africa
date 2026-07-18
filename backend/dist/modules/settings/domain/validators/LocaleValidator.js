"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleValidator = void 0;
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class LocaleValidator {
    static validate(locale) {
        new SettingsValueObjects_1.Locale(locale);
    }
}
exports.LocaleValidator = LocaleValidator;
//# sourceMappingURL=LocaleValidator.js.map