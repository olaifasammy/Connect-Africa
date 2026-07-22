"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSettingsHandler = exports.UpdateSecuritySettingsHandler = exports.UpdateNotificationSettingsHandler = exports.UpdatePrivacyHandler = exports.UpdateLanguageHandler = exports.UpdateSettingsHandler = void 0;
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
const SettingsError_1 = require("../../domain/errors/SettingsError");
const ThemeSettings_1 = require("../../domain/entities/ThemeSettings");
class UpdateSettingsHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new SettingsError_1.SettingsNotFoundError(command.userId);
        if (command.theme)
            settings.updateTheme(ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme(command.theme) }));
        if (command.locale)
            settings.updateLanguage(new SettingsValueObjects_1.Locale(command.locale));
        if (command.timezone)
            settings.updateTimezone(new SettingsValueObjects_1.Timezone(command.timezone));
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_SETTINGS',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.UpdateSettingsHandler = UpdateSettingsHandler;
class UpdateLanguageHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new SettingsError_1.SettingsNotFoundError(command.userId);
        settings.updateLanguage(new SettingsValueObjects_1.Locale(command.locale));
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_LANGUAGE',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.UpdateLanguageHandler = UpdateLanguageHandler;
class UpdatePrivacyHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new SettingsError_1.SettingsNotFoundError(command.userId);
        settings.privacySettings.updateLevel(new SettingsValueObjects_1.PrivacyLevel(command.level));
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_PRIVACY',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.UpdatePrivacyHandler = UpdatePrivacyHandler;
class UpdateNotificationSettingsHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new SettingsError_1.SettingsNotFoundError(command.userId);
        if (command.enabled)
            settings.notificationSettings.enable();
        else
            settings.notificationSettings.disable();
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_NOTIFICATIONS',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.UpdateNotificationSettingsHandler = UpdateNotificationSettingsHandler;
class UpdateSecuritySettingsHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const settings = await this.settingsRepository.findById(command.userId);
        if (!settings)
            throw new SettingsError_1.SettingsNotFoundError(command.userId);
        if (command.mfaEnabled)
            settings.securitySettings.enableMfa();
        else
            settings.securitySettings.disableMfa();
        await this.settingsRepository.save(settings);
        for (const event of settings.domainEvents) {
            await this.eventBus.publish(event);
        }
        settings.clearDomainEvents();
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'UPDATE_SECURITY',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.UpdateSecuritySettingsHandler = UpdateSecuritySettingsHandler;
class ResetSettingsHandler {
    settingsRepository;
    eventBus;
    constructor(settingsRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        // ... logic for resetting to defaults
        await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
            action: 'RESET_SETTINGS',
            actorId: command.userId,
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: 'SETTINGS',
            resourceType: 'SETTINGS',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
    }
}
exports.ResetSettingsHandler = ResetSettingsHandler;
//# sourceMappingURL=SettingsHandlers.js.map