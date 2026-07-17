import { UpdateSettingsCommand, UpdateLanguageCommand, UpdatePrivacyCommand, UpdateNotificationSettingsCommand, UpdateSecuritySettingsCommand, ResetSettingsCommand } from '../commands/SettingsCommands';
import { ISettingsRepository } from '../../domain/repositories/ISettingsRepository';
import { IAuditLogger } from '@modules/auth/public';
import { Locale, Timezone, Theme, NotificationPreference, PrivacyLevel } from '../../domain/value-objects/SettingsValueObjects';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SettingsNotFoundError } from '../../domain/errors/SettingsError';
import { ThemeSettings } from '../../domain/entities/ThemeSettings';

export class UpdateSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateSettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.theme) settings.updateTheme(ThemeSettings.create({ theme: new Theme(command.theme) }));
    if (command.locale) settings.updateLanguage(new Locale(command.locale));
    if (command.timezone) settings.updateTimezone(new Timezone(command.timezone));

    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'UPDATE_SETTINGS', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}

export class UpdateLanguageHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateLanguageCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    settings.updateLanguage(new Locale(command.locale));
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'UPDATE_LANGUAGE', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}

export class UpdatePrivacyHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdatePrivacyCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    settings.privacySettings.updateLevel(new PrivacyLevel(command.level));
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'UPDATE_PRIVACY', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}

export class UpdateNotificationSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateNotificationSettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.enabled) settings.notificationSettings.enable();
    else settings.notificationSettings.disable();
    
    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'UPDATE_NOTIFICATIONS', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}

export class UpdateSecuritySettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: UpdateSecuritySettingsCommand): Promise<void> {
    const settings = await this.settingsRepository.findById(command.userId);
    if (!settings) throw new SettingsNotFoundError(command.userId);
    
    if (command.mfaEnabled) settings.securitySettings.enableMfa();
    else settings.securitySettings.disableMfa();

    await this.settingsRepository.save(settings);
    
    for (const event of settings.domainEvents) {
      await this.eventBus.publish(event);
    }
    settings.clearDomainEvents();
    
    await this.auditLogger.log({ user: command.userId, action: 'UPDATE_SECURITY', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}

export class ResetSettingsHandler {
  constructor(
    private readonly settingsRepository: ISettingsRepository,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: EventBus
  ) {}
  async handle(command: ResetSettingsCommand): Promise<void> {
    // ... logic for resetting to defaults
    await this.auditLogger.log({ user: command.userId, action: 'RESET_SETTINGS', resource: 'SETTINGS', status: 'SUCCESS' });
  }
}
