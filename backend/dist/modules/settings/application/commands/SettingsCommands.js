"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSettingsCommand = exports.UpdateSecuritySettingsCommand = exports.UpdateNotificationSettingsCommand = exports.UpdatePrivacyCommand = exports.UpdateLanguageCommand = exports.UpdateSettingsCommand = exports.CreateSettingsCommand = void 0;
class CreateSettingsCommand {
    userId;
    theme;
    timezone;
    locale;
    constructor(userId, theme, timezone, locale) {
        this.userId = userId;
        this.theme = theme;
        this.timezone = timezone;
        this.locale = locale;
    }
}
exports.CreateSettingsCommand = CreateSettingsCommand;
class UpdateSettingsCommand {
    userId;
    theme;
    timezone;
    locale;
    constructor(userId, theme, timezone, locale) {
        this.userId = userId;
        this.theme = theme;
        this.timezone = timezone;
        this.locale = locale;
    }
}
exports.UpdateSettingsCommand = UpdateSettingsCommand;
class UpdateLanguageCommand {
    userId;
    locale;
    constructor(userId, locale) {
        this.userId = userId;
        this.locale = locale;
    }
}
exports.UpdateLanguageCommand = UpdateLanguageCommand;
class UpdatePrivacyCommand {
    userId;
    level;
    constructor(userId, level) {
        this.userId = userId;
        this.level = level;
    }
}
exports.UpdatePrivacyCommand = UpdatePrivacyCommand;
class UpdateNotificationSettingsCommand {
    userId;
    enabled;
    constructor(userId, enabled) {
        this.userId = userId;
        this.enabled = enabled;
    }
}
exports.UpdateNotificationSettingsCommand = UpdateNotificationSettingsCommand;
class UpdateSecuritySettingsCommand {
    userId;
    mfaEnabled;
    constructor(userId, mfaEnabled) {
        this.userId = userId;
        this.mfaEnabled = mfaEnabled;
    }
}
exports.UpdateSecuritySettingsCommand = UpdateSecuritySettingsCommand;
class ResetSettingsCommand {
    userId;
    constructor(userId) {
        this.userId = userId;
    }
}
exports.ResetSettingsCommand = ResetSettingsCommand;
//# sourceMappingURL=SettingsCommands.js.map