"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChangeThemeHandler_1 = require("../../../../settings/application/handlers/ChangeThemeHandler");
const ChangeThemeCommand_1 = require("../../../../settings/application/commands/ChangeThemeCommand");
const Settings_1 = require("../../../../settings/domain/entities/Settings");
const ThemeSettings_1 = require("../../../../settings/domain/entities/ThemeSettings");
const SettingsValueObjects_1 = require("../../../../settings/domain/value-objects/SettingsValueObjects");
const NotificationSettings_1 = require("../../../../settings/domain/entities/NotificationSettings");
const PrivacySettings_1 = require("../../../../settings/domain/entities/PrivacySettings");
const LanguageSettings_1 = require("../../../../settings/domain/entities/LanguageSettings");
const SecuritySettings_1 = require("../../../../settings/domain/entities/SecuritySettings");
describe('ChangeThemeHandler Integration', () => {
    let handler;
    let settingsRepository;
    let auditLogger;
    let eventBus;
    beforeEach(() => {
        settingsRepository = { findById: jest.fn(), save: jest.fn() };
        auditLogger = { log: jest.fn() };
        eventBus = { publish: jest.fn(), subscribe: jest.fn() };
        handler = new ChangeThemeHandler_1.ChangeThemeHandler(settingsRepository, auditLogger, eventBus);
    });
    it('should change theme', async () => {
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
        await handler.handle(new ChangeThemeCommand_1.ChangeThemeCommand(userId, 'dark'));
        expect(settingsRepository.save).toHaveBeenCalled();
        expect(auditLogger.log).toHaveBeenCalled();
        expect(eventBus.publish).toHaveBeenCalled();
    });
});
//# sourceMappingURL=ChangeThemeHandler.spec.js.map