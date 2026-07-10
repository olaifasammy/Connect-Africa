"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSettingsCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UserId_1 = require("../../../auth/domain/value-objects/UserId");
class UpdateUserSettingsCommandHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const settings = await this.settingsRepository.findByUserId(UserId_1.UserId.create(command.userId));
            if (!settings) {
                throw new AuthErrors_1.AuthenticationError('Settings not found');
            }
            settings.updateSettings({
                theme: command.theme,
                language: command.language,
                timeZone: command.timeZone,
                notificationPreferences: command.notificationPreferences,
                privacySettings: command.privacySettings,
                accessibilitySettings: command.accessibilitySettings
            });
            await this.settingsRepository.save(settings);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_SETTINGS',
                resource: 'SETTINGS',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            // Potential event emission here
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_SETTINGS',
                resource: 'SETTINGS',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to update settings');
        }
    }
}
exports.UpdateUserSettingsCommandHandler = UpdateUserSettingsCommandHandler;
//# sourceMappingURL=UpdateUserSettingsCommandHandler.js.map