"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeThemeHandler = void 0;
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
const ThemeSettings_1 = require("../../domain/entities/ThemeSettings");
class ChangeThemeHandler {
    settingsRepository;
    auditLogger;
    eventBus;
    constructor(settingsRepository, auditLogger, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditLogger = auditLogger;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new Error('Settings not found');
        settings.updateTheme(ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme(command.theme) }));
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.auditLogger.log({ user: command.userId, action: 'CHANGE_THEME', resource: 'SETTINGS', status: 'SUCCESS' });
    }
}
exports.ChangeThemeHandler = ChangeThemeHandler;
//# sourceMappingURL=ChangeThemeHandler.js.map