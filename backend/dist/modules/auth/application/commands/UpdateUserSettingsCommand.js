"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSettingsCommand = void 0;
class UpdateUserSettingsCommand {
    userId;
    theme;
    language;
    timeZone;
    notificationPreferences;
    privacySettings;
    accessibilitySettings;
    ipAddress;
    constructor(userId, theme, language, timeZone, notificationPreferences, privacySettings, accessibilitySettings, ipAddress) {
        this.userId = userId;
        this.theme = theme;
        this.language = language;
        this.timeZone = timeZone;
        this.notificationPreferences = notificationPreferences;
        this.privacySettings = privacySettings;
        this.accessibilitySettings = accessibilitySettings;
        this.ipAddress = ipAddress;
    }
}
exports.UpdateUserSettingsCommand = UpdateUserSettingsCommand;
//# sourceMappingURL=UpdateUserSettingsCommand.js.map