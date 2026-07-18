"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneValidator = void 0;
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class TimezoneValidator {
    static validate(timezone) {
        new SettingsValueObjects_1.Timezone(timezone);
    }
}
exports.TimezoneValidator = TimezoneValidator;
//# sourceMappingURL=TimezoneValidator.js.map