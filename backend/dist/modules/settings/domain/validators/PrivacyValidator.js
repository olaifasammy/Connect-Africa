"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyValidator = void 0;
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class PrivacyValidator {
    static validate(level) {
        new SettingsValueObjects_1.PrivacyLevel(level);
    }
}
exports.PrivacyValidator = PrivacyValidator;
//# sourceMappingURL=PrivacyValidator.js.map