"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSettingsHandler = exports.UpdateSecuritySettingsHandler = exports.UpdateNotificationSettingsHandler = exports.UpdatePrivacyHandler = exports.UpdateLanguageHandler = exports.UpdateSettingsHandler = void 0;
const public_1 = require("../../../audit/public");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
const SettingsError_1 = require("../../domain/errors/SettingsError");
const ThemeSettings_1 = require("../../domain/entities/ThemeSettings");
class UpdateSettingsHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'UPDATE_SETTINGS',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdateSettingsHandler = UpdateSettingsHandler;
class UpdateLanguageHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'UPDATE_LANGUAGE',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdateLanguageHandler = UpdateLanguageHandler;
class UpdatePrivacyHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'UPDATE_PRIVACY',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdatePrivacyHandler = UpdatePrivacyHandler;
class UpdateNotificationSettingsHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'UPDATE_NOTIFICATIONS',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdateNotificationSettingsHandler = UpdateNotificationSettingsHandler;
class UpdateSecuritySettingsHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
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
        const auditEntry = public_1.AuditEntry.create({
            action: 'UPDATE_SECURITY',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.UpdateSecuritySettingsHandler = UpdateSecuritySettingsHandler;
class ResetSettingsHandler {
    settingsRepository;
    auditRepository;
    eventBus;
    constructor(settingsRepository, auditRepository, eventBus) {
        this.settingsRepository = settingsRepository;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        // ... logic for resetting to defaults
        const auditEntry = public_1.AuditEntry.create({
            action: 'RESET_SETTINGS',
            actor: public_1.AuditActor.create({
                userId: new public_1.UserId(command.userId),
                actorType: 'USER',
                ipAddress: new public_1.IPAddress('127.0.0.1'),
                userAgent: new public_1.UserAgent('unknown')
            }),
            resource: public_1.AuditResource.create({
                id: new public_1.ResourceId('SETTINGS'),
                type: 'SETTINGS'
            }),
            metadata: [public_1.AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
            correlationId: new public_1.CorrelationId(new UniqueEntityId_1.UniqueEntityId().toString()),
            timestamp: new public_1.Timestamp(new Date())
        });
        await this.auditRepository.log(auditEntry);
    }
}
exports.ResetSettingsHandler = ResetSettingsHandler;
//# sourceMappingURL=SettingsHandlers.js.map