"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsService_1 = require("../../../../../settings/application/services/SettingsService");
const Settings_1 = require("../../../../../settings/domain/entities/Settings");
const ThemeSettings_1 = require("../../../../../settings/domain/entities/ThemeSettings");
const SettingsValueObjects_1 = require("../../../../../settings/domain/value-objects/SettingsValueObjects");
const NotificationSettings_1 = require("../../../../../settings/domain/entities/NotificationSettings");
const PrivacySettings_1 = require("../../../../../settings/domain/entities/PrivacySettings");
const LanguageSettings_1 = require("../../../../../settings/domain/entities/LanguageSettings");
const SecuritySettings_1 = require("../../../../../settings/domain/entities/SecuritySettings");
describe('SettingsService', () => {
    let settingsRepository;
    let settingsService;
    beforeEach(() => {
        settingsRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        settingsService = new SettingsService_1.SettingsService(settingsRepository);
    });
    it('should validate settings', async () => {
        const userId = 'user123';
        settingsRepository.findById.mockResolvedValue(Settings_1.Settings.create({
            userId,
            themeSettings: ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme('light') }),
            notificationSettings: NotificationSettings_1.NotificationSettings.create({ enabled: true, preference: new SettingsValueObjects_1.NotificationPreference('email') }),
            privacySettings: PrivacySettings_1.PrivacySettings.create({ level: new SettingsValueObjects_1.PrivacyLevel('public') }),
            languageSettings: LanguageSettings_1.LanguageSettings.create({ locale: new SettingsValueObjects_1.Locale('en-US'), timezone: new SettingsValueObjects_1.Timezone('UTC') }),
            securitySettings: SecuritySettings_1.SecuritySettings.create({ mfaEnabled: false }),
            preferenceSettings: []
        }));
        const isValid = await settingsService.validateSettings(userId);
        expect(isValid).toBe(true);
    });
});
//# sourceMappingURL=SettingsService.spec.js.map