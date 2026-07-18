"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingsHandler = void 0;
const Settings_1 = require("../../domain/entities/Settings");
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
const ThemeSettings_1 = require("../../domain/entities/ThemeSettings");
const NotificationSettings_1 = require("../../domain/entities/NotificationSettings");
const PrivacySettings_1 = require("../../domain/entities/PrivacySettings");
const LanguageSettings_1 = require("../../domain/entities/LanguageSettings");
const SecuritySettings_1 = require("../../domain/entities/SecuritySettings");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CreateSettingsHandler {
    settingsRepository;
    auditLogger;
    eventBus;
    constructor(settingsRepository, auditLogger, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditLogger = auditLogger;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = Settings_1.Settings.create({
            userId: command.userId,
            themeSettings: ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme(command.theme) }),
            notificationSettings: NotificationSettings_1.NotificationSettings.create({ enabled: true, preference: new SettingsValueObjects_1.NotificationPreference('default') }),
            privacySettings: PrivacySettings_1.PrivacySettings.create({ level: new SettingsValueObjects_1.PrivacyLevel('public') }),
            languageSettings: LanguageSettings_1.LanguageSettings.create({ locale: new SettingsValueObjects_1.Locale(command.locale), timezone: new SettingsValueObjects_1.Timezone(command.timezone) }),
            securitySettings: SecuritySettings_1.SecuritySettings.create({ mfaEnabled: false }),
            preferenceSettings: []
        }, new UniqueEntityId_1.UniqueEntityId(command.userId));
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.auditLogger.log({ user: command.userId, action: 'CREATE_SETTINGS', resource: 'SETTINGS', status: 'SUCCESS' });
    }
}
exports.CreateSettingsHandler = CreateSettingsHandler;
//# sourceMappingURL=CreateSettingsHandler.js.map