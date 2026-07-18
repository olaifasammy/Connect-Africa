"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = require("../../../../settings/domain/entities/Settings");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
const ThemeSettings_1 = require("../../../../settings/domain/entities/ThemeSettings");
const SettingsValueObjects_1 = require("../../../../settings/domain/value-objects/SettingsValueObjects");
const NotificationSettings_1 = require("../../../../settings/domain/entities/NotificationSettings");
const PrivacySettings_1 = require("../../../../settings/domain/entities/PrivacySettings");
const LanguageSettings_1 = require("../../../../settings/domain/entities/LanguageSettings");
const SecuritySettings_1 = require("../../../../settings/domain/entities/SecuritySettings");
describe('Settings Aggregate', () => {
    it('should create valid settings', () => {
        const userId = new UniqueEntityId_1.UniqueEntityId().toString();
        const settings = Settings_1.Settings.create({
            userId,
            themeSettings: ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme('light') }),
            notificationSettings: NotificationSettings_1.NotificationSettings.create({ enabled: true, preference: new SettingsValueObjects_1.NotificationPreference('email') }),
            privacySettings: PrivacySettings_1.PrivacySettings.create({ level: new SettingsValueObjects_1.PrivacyLevel('public') }),
            languageSettings: LanguageSettings_1.LanguageSettings.create({ locale: new SettingsValueObjects_1.Locale('en-US'), timezone: new SettingsValueObjects_1.Timezone('UTC') }),
            securitySettings: SecuritySettings_1.SecuritySettings.create({ mfaEnabled: false }),
            preferenceSettings: []
        });
        expect(settings.userId).toBe(userId);
        expect(settings.themeSettings.theme.toString()).toBe('light');
    });
});
//# sourceMappingURL=Settings.spec.js.map