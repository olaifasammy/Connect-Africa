"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationValidator = void 0;
const SettingsValueObjects_1 = require("../value-objects/SettingsValueObjects");
class NotificationValidator {
    static validate(preference) {
        new SettingsValueObjects_1.NotificationPreference(preference);
    }
}
exports.NotificationValidator = NotificationValidator;
//# sourceMappingURL=NotificationValidator.js.map